import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deletingFileId, setDeletingFileId] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultsnoti, setResultsnoti] = useState();

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/files`);
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      const data = await response.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error('Error fetching files:', error);
      showToast('Failed to load files', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const validateFile = (file) => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    
    if (file.size > maxSize) {
      throw new Error('File size exceeds 100MB limit');
    }
    
    return true;
  };

  const handleFileUpload = async (file) => {
    try {
      validateFile(file);
      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('file', file);

      // Simulate progress tracking
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      setResultsnoti(data);

      // Add the new file to the list
      const newFile = {
        ...data,
        uploadDate: new Date().toISOString()
      };
      setFiles(prev => [newFile, ...prev]);
      showToast('File uploaded successfully!', 'success');
      
    } catch (error) {
      const errorMessage = error.message || 'Upload failed';
      showToast(errorMessage, 'error');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileDelete = async (fileId) => {
    try {
      setDeletingFileId(fileId);
      const response = await fetch(`${API_BASE_URL}/api/files/${fileId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Delete failed');
      }
      
      // Remove the file from the list
      setFiles(prev => prev.filter(file => (file.id || file.fileId) !== fileId));
      showToast('File deleted successfully!', 'success');
      
    } catch (error) {
      const errorMessage = error.message || 'Delete failed';
      showToast(errorMessage, 'error');
    } finally {
      setDeletingFileId(null);
    }
  };

  const value = {
    files,
    isUploading,
    uploadProgress,
    deletingFileId,
    toast,
    setToast,
    isLoading,
    resultsnoti,
    showToast,
    fetchFiles,
    handleFileUpload,
    handleFileDelete,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
