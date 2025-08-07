import { useState, useEffect } from 'react';
import { List, Grid, Search, RefreshCw, Cloud, File } from 'lucide-react';
import { useApp } from '../context/AppContext';
import FileUpload from '../components/Fileupload';
import FileItem from '../components/Fileitem';
import Toast from '../components/Toast';  

const DashboardPage = () => {
  const {
    files,
    isUploading,
    uploadProgress,
    deletingFileId,
    handleFileUpload,
    handleFileDelete,
    fetchFiles,
    isLoading
  } = useApp();

  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch files when component mounts
  useEffect(() => {
    fetchFiles();
  }, []);

  const filteredFiles = files.filter(file =>
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-16">
      {/* Dashboard Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">File Dashboard</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Upload, manage, and share your files securely
        </p>
      </div>

      {/* Upload Section */}
      <div>
        <FileUpload
          onUploadSuccess={handleFileUpload}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
        />
      </div>

      {/* Files List */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Your Files
            </h2>
            <p className="text-slate-600">
              {files.length > 0 ? `${files.length} files uploaded` : 'No files yet'}
            </p>
          </div>
          
          {files.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <List size={20} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Grid size={20} />
                </button>
              </div>
              
              <button
                onClick={fetchFiles}
                className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-xl transition-colors font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 animate-ping-slow rounded-full bg-slate-300 opacity-20"></div>
              <Cloud size={64} className="text-slate-400 animate-bounce-slow" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600">Getting things ready...</h3>
            <p className="text-slate-500 text-sm">Hang tight — your files are loading faster than you think.</p>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-lg">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <File size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              {searchTerm ? 'No matching files found' : 'No files uploaded yet'}
            </h3>
            <p className="text-slate-500 max-w-md mx-auto">
              {searchTerm 
                ? 'Try adjusting your search terms or upload new files'
                : 'Upload your first file to get started with secure cloud storage and sharing'
              }
            </p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredFiles.map((file) => (
              <FileItem
                key={file.id || file.fileId || file.fileName}
                file={file}
                onDelete={handleFileDelete}
                isDeleting={deletingFileId === (file.id || file.fileId)}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
