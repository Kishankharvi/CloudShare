# CloudShare Pro - File Sharing Application

CloudShare Pro is a secure, fast, and user-friendly file-sharing platform designed for individuals and teams. It allows users to upload files, which are then stored securely in an AWS S3 bucket. The application generates a unique, shareable link for each file that automatically expires after a set period, ensuring your data remains secure. The backend is built with Node.js and Express, running on AWS EC2 instances, while the frontend is a modern React application.

## Key Features

- **Seamless File Upload**: Easily upload files through a clean, drag-and-drop interface or by direct selection
- **Secure & Quick Downloads**: Files are accessed through secure, time-limited URLs
- **Link Expiry**: Shared links automatically expire after 3 hours to enhance security
- **Secure by Design**: Files are stored in a private AWS S3 bucket with restricted access policies, and the application uses CORS for safe cross-origin requests
- **Fast Performance**: The application is designed for low-latency file access via S3 and an optimized backend
- **Real-time Notifications**: Receive notifications for key events, such as successful file uploads
- **Dashboard**: A comprehensive dashboard to view, manage, and search for your uploaded files

## Architecture

The application is built on a scalable and resilient cloud architecture using Amazon Web Services (AWS).

### Architectural Diagram

```
                               +-------------------------+
                               |      End User           |
                               +-----------+-------------+
                                           |
                                           | HTTPS Request
                                           v
+---------------------------------------------------------------------------------+
|                                 AWS Cloud                                       |
|                                                                                 |
|       +-------------------------+      +-------------------------+              |
|       |   Elastic Load Balancer |----->|     Target Group        |              |
|       +-------------------------+      +-----------+-------------+              |
|                                                    |                            |
|                       +----------------------------+--------------------------+ |
|                       |                            |                          | |
|                       v                            v                          | |
|       +-------------------------+      +-------------------------+            | |
|       |   EC2 Instance 1        |      |   EC2 Instance 2        |            | |
|       |  (Node.js Backend)      |      |  (Node.js Backend)      |            | |
|       +-----------+-------------+      +-----------+-------------+            | |
|                   |                                |                          | |
|                   +------------------+-------------+                          | |
|                                      |                                        | |
|                                      | S3 API Calls (Upload, Delete)          | |
|                                      v                                        | |
|                             +------------------+                              | |
|                             |   Amazon S3      |                              | |
|                             |  (File Storage)  |                              | |
|                             +------------------+                              | |
|                                                                                 |
+---------------------------------------------------------------------------------+
```

## How It Works

1. **User Interaction**: The user accesses the React frontend application, which runs locally or can be hosted as a static site

2. **Load Balancing**: When the user uploads or requests a file list, the frontend sends API requests to an AWS Elastic Load Balancer (ELB). The ELB's DNS is stored in the frontend's environment variables (`VITE_API_URL`)

3. **Backend Processing**: The Load Balancer distributes the incoming traffic across a target group consisting of two EC2 instances. This setup ensures high availability and fault tolerance

4. **EC2 Instances**: Each EC2 instance runs the same Node.js backend application. The backend listens for requests on port 5000 and is configured to be accessible from any IP address (0.0.0.0) to work with the load balancer

5. **File Storage (S3)**:
   - When a user uploads a file, the backend API receives it, generates a unique ID, and securely uploads it to a private AWS S3 bucket using the aws-sdk
   - File metadata, including the filename, S3 key, size, and expiry time, is stored in a `file_metadata.json` file on the EC2 instance. For a production environment, this would be replaced by a more robust database like DynamoDB or RDS

6. **Security**: An IAM (Identity and Access Management) user with programmatic access and full S3 permissions is configured on the backend, allowing the EC2 instances to interact with the S3 service securely

## Backend (Node.js API)

The backend is a RESTful API built with Express.js. It handles file operations, metadata management, and server status checks.

### Key Dependencies

- **express**: Web framework for Node.js
- **aws-sdk**: For programmatic interaction with AWS services, primarily S3
- **multer**: Middleware for handling multipart/form-data, used for file uploads
- **node-cron**: A scheduler to run tasks, used here to clean up expired files
- **cors**: To enable Cross-Origin Resource Sharing for the frontend
- **dotenv**: To manage environment variables

### API Routes

The following are the core API routes defined in `backs/server.js`:

#### `POST /api/upload`
- Handles file uploads. It accepts a single file under the field name 'file'
- Uses multer to process the file in memory
- Generates a unique fileId and constructs a unique filename
- Uploads the file to the S3 bucket specified by `S3_BUCKET_NAME`
- Sets an expiry time of 3 hours for the file
- Saves the file's metadata (original name, S3 key, size, expiry time, public URL) to `file_metadata.json`
- Returns a JSON object with the fileId, publicUrl, fileName, fileSize, and expiryTime

#### `GET /api/files`
- Fetches a list of all currently active (non-expired) files
- Reads the `file_metadata.json` file and filters out any files whose expiryTime has passed
- Returns a JSON object containing an array of file objects

#### `GET /api/file/:fileId`
- Retrieves metadata for a single file based on its fileId
- Checks if the file has expired. If it has, it returns a 410 Gone error
- If the file is valid, it returns its details, including the time remaining until expiry

#### `DELETE /api/files/:fileId`
- Deletes a specific file
- Removes the file from the S3 bucket using its s3Key
- Deletes the corresponding metadata entry from `file_metadata.json`
- Returns a success message upon completion

#### `GET /api/server`
- A simple health-check route that returns basic information about the server instance, such as its ID, region, and status

### Scheduled Tasks

**Expired File Cleanup**: A cron job is scheduled to run every hour (`0 * * * *`). It scans the `file_metadata.json` file, identifies expired files, deletes them from the S3 bucket, and removes their metadata entries.

## Frontend (React UI)

The frontend is a single-page application (SPA) built with React and Vite. It provides a user-friendly interface for interacting with the backend API.

### Key Dependencies

- **react & react-dom**: Core libraries for building the user interface
- **react-router-dom**: For client-side routing between different pages
- **axios**: For making HTTP requests to the backend API
- **lucide-react**: For beautiful and consistent icons
- **tailwindcss**: A utility-first CSS framework for styling

### Component Breakdown

The UI is structured into pages and reusable components:

#### Core Components

- **App.jsx**: The root component that sets up the application's structure, including routing and the main layout. It wraps the application in an AppProvider to manage global state
- **AppContext.jsx**: A React Context provider that manages the application's global state, such as the file list, upload progress, and notifications. It also contains the core logic for fetching, uploading, and deleting files

#### Pages

- **Homepage.jsx**: The landing page of the application, providing an overview and a call-to-action to get started
- **Dashboardpage.jsx**: The main user dashboard where users can upload files and view their existing files in a list or grid format. It includes features for searching and refreshing the file list
- **Serverpage.jsx**: A page to display the status of the backend server by fetching data from the `/api/server` endpoint
- **Aboutpage.jsx**: Provides information about the project, its creators, and the technology stack used
- **Featurespage.jsx**: Describes the key features of the application

#### Components

- **Fileupload.jsx**: A reusable component for the file upload area, supporting drag-and-drop and displaying upload progress
- **Fileitem.jsx**: Renders a single file in either a list or grid view. It includes buttons for downloading, copying the link, and deleting the file
- **Navigation.jsx**: The top navigation bar with links to all pages
- **Footer.jsx**: The application's footer
- **Toast.jsx**: Displays success or error notifications to the user
- **NotificationBell.jsx**: Shows real-time notifications, such as when a file upload is complete

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- AWS Account with S3 and EC2 access
- IAM user with S3 permissions

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
4. Configure environment variables for AWS credentials and S3 bucket
5. Start the backend server
6. Start the frontend development server

### Environment Variables

Create a `.env` file in the backend directory with:
```
S3_BUCKET_NAME=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=your-region
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.