import React, { useState } from 'react';    
import { Upload, Cloud } from 'lucide-react';
const FileUpload = ({ onUploadSuccess, isUploading, uploadProgress }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onUploadSuccess(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onUploadSuccess(files[0]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${
          isDragging
            ? 'border-blue-500 bg-blue-50/50 scale-105'
            : 'border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50/50'
        } shadow-lg hover:shadow-xl`}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="space-y-6">
            <div className="relative">
              {/* <div className="animate-spin mx-auto">
                <Upload size={64} className="text-blue-500" />
              </div> */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 animate-ping"></div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xl font-semibold text-slate-700">Uploading your file...</p>
              <div className="w-full max-w-md mx-auto bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-slate-600 font-medium">{uploadProgress}% complete</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <Upload size={64} className="mx-auto text-slate-400" />
              <div className="absolute -top-2 -right-2">
                <Cloud size={24} className="text-blue-500" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-slate-800">
                Drop your files here
              </h3>
              <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
                Drag and drop files or click to browse from your device. 
                <span className="block mt-1 text-sm">Maximum file size: 100MB • All file types supported</span>
              </p>
            </div>
            <input
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              id="file-input"
              disabled={isUploading}
            />
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <label
                htmlFor="file-input"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl cursor-pointer transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Upload size={20} />
                Choose Files
              </label>
              {/* <button className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-4 rounded-xl transition-all duration-200 font-semibold">
                <Zap size={20} />
                Quick Upload
              </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default FileUpload;