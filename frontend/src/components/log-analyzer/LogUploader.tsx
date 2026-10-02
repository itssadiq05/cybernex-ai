import React, { useRef, useState } from 'react';
import { GlassPanel } from '../common/GlassPanel';
import {
  UploadCloud,
  FileCode,
  CheckCircle,
} from 'lucide-react';

interface LogUploaderProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
}

export const LogUploader: React.FC<LogUploaderProps> = ({
  onFileUpload,
  isProcessing,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileUpload(file);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileUpload(file);
    }
  };

  return (
    <GlassPanel variant="card" className="p-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[#CCFF00] bg-[#CCFF00]/5'
            : 'border-white/10 hover:border-white/25 bg-white/[0.01]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,.csv,.log,.txt"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-3 bg-white/5 border border-white/10 rounded-full text-[#CCFF00]">
            <UploadCloud className="w-8 h-8" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white font-mono">
              Drag & Drop security log files or{' '}
              <span className="text-[#CCFF00]">browse</span>
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Supports JSON, CSV, AWS CloudTrail, Nginx, and Syslog log
              formats
            </p>
          </div>

          {isProcessing && (
            <p className="text-xs text-[#CCFF00] font-mono animate-pulse">
              Processing security logs...
            </p>
          )}

          {selectedFile && !isProcessing && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-[#00F0FF] mt-2">
              <FileCode className="w-4 h-4" />

              <span>
                {selectedFile.name} (
                {Math.round(selectedFile.size / 1024)} KB)
              </span>

              <CheckCircle className="w-4 h-4 text-emerald-400 ml-1" />
            </div>
          )}
        </div>
      </div>
    </GlassPanel>
  );
};