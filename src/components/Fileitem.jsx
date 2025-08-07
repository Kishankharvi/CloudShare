import { Download, Copy, Trash2 } from 'lucide-react';
import FileIcon from './Fileicon';

const FileItem = ({ file, onDelete, isDeleting, viewMode = 'list' }) => {
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileType = (fileName) => {
    if (!fileName) return 'Unknown';
    const ext = fileName.split('.').pop()?.toLowerCase();
    return ext ? ext.toUpperCase() : 'Unknown';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <FileIcon fileName={file.fileName} size={48} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 truncate">{file.fileName}</h3>
            <div className="text-sm text-slate-500 mt-1">
              <span className="bg-slate-100 px-2 py-1 rounded-full text-xs font-medium">{getFileType(file.fileName)}</span>
              <span className="block mt-1">{formatFileSize(file.fileSize)}</span>
            </div>
          </div>
          <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => window.open(file.publicUrl || file.downloadUrl, '_blank')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg transition-colors"
            >
              <Download size={16} />
            </button>
            <button
              onClick={() => copyToClipboard(file.publicUrl || file.downloadUrl)}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
            >
              <Copy size={16} />
            </button>
            <button
              onClick={() => onDelete(file.id || file.fileId)}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white p-2 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 hover:border-slate-300 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <FileIcon fileName={file.fileName} size={40} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
              {file.fileName}
            </h3>
            <div className="flex items-center gap-4 mt-2">
              <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-600">
                {getFileType(file.fileName)}
              </span>
              <span className="text-sm text-slate-500">{formatFileSize(file.fileSize)}</span>
              {file.uploadDate && (
                <span className="text-sm text-slate-500">{formatDate(file.uploadDate)}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={() => window.open(file.publicUrl || file.downloadUrl, '_blank')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Download size={16} />
            Download
          </button>
          
          <button
            onClick={() => copyToClipboard(file.publicUrl || file.downloadUrl)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Copy size={16} />
            Copy Link
          </button>
          
          <button
            onClick={() => onDelete(file.id || file.fileId)}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
          >
            <Trash2 size={16} />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileItem;
