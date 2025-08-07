
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// AWS Configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'ap-south-1'
});

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'file-sharing-temp-bucket';

// File metadata storage (using JSON file - can be replaced with DB)
const METADATA_FILE = './file_metadata.json';

// Initialize metadata file if it doesn't exist
if (!fs.existsSync(METADATA_FILE)) {
  fs.writeFileSync(METADATA_FILE, JSON.stringify({}));
}

// Helper functions
const getMetadata = () => {
  return JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
};

const saveMetadata = (data) => {
  fs.writeFileSync(METADATA_FILE, JSON.stringify(data, null, 2));
};

const generateFileId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Create S3 bucket if it doesn't exist
// const createBucketIfNotExists = async () => {
//   try {
//     await s3.headBucket({ Bucket: BUCKET_NAME }).promise();
//     console.log(`Bucket ${BUCKET_NAME} already exists`);
//   } catch (error) {
//     if (error.statusCode === 404) {
//       try {
//         await s3.createBucket({ Bucket: BUCKET_NAME }).promise();
        
//         // Set bucket policy for public read access
//         const bucketPolicy = {
//           Version: '2012-10-17',
//           Statement: [
//             {
//               Sid: 'PublicReadGetObject',
//               Effect: 'Allow',
//               Principal: '*',
//               Action: 's3:GetObject',
//               Resource: `arn:aws:s3:::${BUCKET_NAME}/*`
//             }
//           ]
//         };
        
//         await s3.putBucketPolicy({
//           Bucket: BUCKET_NAME,
//           Policy: JSON.stringify(bucketPolicy)
//         }).promise();
        
//         // Configure CORS
//         const corsConfiguration = {
//           CORSRules: [
//             {
//               AllowedHeaders: ['*'],
//               AllowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
//               AllowedOrigins: ['*'],
//               ExposeHeaders: []
//             }
//           ]
//         };
        
//         await s3.putBucketCors({
//           Bucket: BUCKET_NAME,
//           CORSConfiguration: corsConfiguration
//         }).promise();
        
//         console.log(`Bucket ${BUCKET_NAME} created successfully`);
//       } catch (createError) {
//         console.error('Error creating bucket:', createError);
//       }
//     } else {
//       console.error('Error checking bucket:', error);
//     }
//   }
// };

// Configure multer for file uploads
const upload = multer({
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  },
  fileFilter: (req, file, cb) => {
    // Accept all file types
    cb(null, true);
  }
});

// Routes
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileId = generateFileId();
    const fileName = `${fileId}_${req.file.originalname}`;
    const expiryTime = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 hours from now

    // Upload to S3
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      // Set object expiration (S3 doesn't support exact 3-hour lifecycle rules)
      Expires: expiryTime
    };

    const result = await s3.upload(uploadParams).promise();
    
    // Generate public URL
    const publicUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    
    // Store metadata
    const metadata = getMetadata();
    metadata[fileId] = {
      fileName: req.file.originalname,
      s3Key: fileName,
      uploadTime: new Date().toISOString(),
      expiryTime: expiryTime.toISOString(),
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      publicUrl: publicUrl
    };
    saveMetadata(metadata);

    res.json({
      fileId,
      publicUrl,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      expiryTime: expiryTime.toISOString()
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.get('/api/file/:fileId', (req, res) => {
  const { fileId } = req.params;
  const metadata = getMetadata();
  
  if (!metadata[fileId]) {
    return res.status(404).json({ error: 'File not found' });
  }

  const fileInfo = metadata[fileId];
  const now = new Date();
  const expiryTime = new Date(fileInfo.expiryTime);

  if (now > expiryTime) {
    return res.status(410).json({ error: 'File has expired' });
  }

  res.json({
    fileId,
    fileName: fileInfo.fileName,
    publicUrl: fileInfo.publicUrl,
    fileSize: fileInfo.fileSize,
    uploadTime: fileInfo.uploadTime,
    expiryTime: fileInfo.expiryTime,
    timeRemaining: Math.max(0, expiryTime.getTime() - now.getTime())
  });
});

// Cleanup expired files (runs every hour)
cron.schedule('0 * * * *', async () => {
  console.log('Running cleanup job...');
  const metadata = getMetadata();
  const now = new Date();
  let cleanedCount = 0;

  for (const [fileId, fileInfo] of Object.entries(metadata)) {
    const expiryTime = new Date(fileInfo.expiryTime);
    
    if (now > expiryTime) {
      try {
        // Delete from S3
        await s3.deleteObject({
          Bucket: BUCKET_NAME,
          Key: fileInfo.s3Key
        }).promise();
        
        // Remove from metadata
        delete metadata[fileId];
        cleanedCount++;
        
        console.log(`Cleaned up expired file: ${fileInfo.fileName}`);
      } catch (error) {
        console.error(`Error cleaning up file ${fileId}:`, error);
      }
    }
  }

  if (cleanedCount > 0) {
    saveMetadata(metadata);
    console.log(`Cleanup completed. Removed ${cleanedCount} expired files.`);
  }
});




app.get('/api/files', (req, res) => {
  try {
    const metadata = getMetadata();
    const now = new Date();

    // Filter out expired files
    const files = Object.entries(metadata)
      .filter(([_, info]) => new Date(info.expiryTime) > now)
      .map(([fileId, info]) => ({
        fileId,
        fileName: info.fileName,
        fileSize: info.fileSize,
        mimeType: info.mimeType,
        publicUrl: info.publicUrl,
        uploadTime: info.uploadTime,
        expiryTime: info.expiryTime,
        timeRemaining: Math.max(0, new Date(info.expiryTime) - now),
      }));

    res.json({ files });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed to load files' });
  }
});
app.delete('/api/files/:fileId', async (req, res) => {
  const { fileId } = req.params;
  const metadata = getMetadata();

  if (!metadata[fileId]) {
    return res.status(404).json({ error: 'File not found' });
  }

  const fileInfo = metadata[fileId];

  try {
    // Delete the file from S3
    await s3.deleteObject({
      Bucket: BUCKET_NAME,
      Key: fileInfo.s3Key,
    }).promise();

    // Remove file metadata
    delete metadata[fileId];
    saveMetadata(metadata);

    return res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(`Error deleting file ${fileId}:`, error);
    return res.status(500).json({ error: 'Failed to delete file' });
  }
});




app.get('/api/server', async (req, res) => {
  // Dummy server info, replace with AWS EC2 describeInstances if needed
  const serverInfo = {
    instanceId: 'LOCAL 1',
    region: 'ap-south-1',
    type: 't2.micro',
    status: 'running',
    uptime: '3 minutes',
  };

  res.json(serverInfo);
});









app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});