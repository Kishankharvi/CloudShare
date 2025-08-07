import { File, Image, Video, Music, FileText, Archive, Code } from 'lucide-react';

const FileIcon = ({ fileName, size = 24 }) => {
  const getFileIcon = (fileName) => {
    if (!fileName) return File;
    
    const ext = fileName.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return Image;
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(ext)) return Video;
    if (['mp3', 'wav', 'flac', 'aac', 'ogg'].includes(ext)) return Music;
    if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(ext)) return FileText;
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return Archive;
    if (['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'py', 'java', 'cpp', 'c'].includes(ext)) return Code;
    
    return File;
  };

  const getIconColor = (fileName) => {
    if (!fileName) return 'text-slate-500';
    
    const ext = fileName.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'text-emerald-500';
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(ext)) return 'text-purple-500';
    if (['mp3', 'wav', 'flac', 'aac', 'ogg'].includes(ext)) return 'text-pink-500';
    if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(ext)) return 'text-red-500';
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'text-orange-500';
    if (['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'py', 'java', 'cpp', 'c'].includes(ext)) return 'text-blue-500';
    
    return 'text-slate-500';
  };

  const IconComponent = getFileIcon(fileName);
  return <IconComponent size={size} className={getIconColor(fileName)} />;
};

export default FileIcon;
