"use client";
import { useState } from "react";
import { Upload, Image, FileText, Video, X, CheckCircle, AlertCircle } from "lucide-react";
import React from "react";
import axios from "axios";

interface FileWithPreview {
  file: File;
  preview?: string;
  type: 'image' | 'pdf' | 'video' | 'other';
}

interface FileStatus {
  loading: boolean;
  message: string;
  success: boolean;
}

interface FileUploadCardProps {
  type: 'image' | 'pdf' | 'video';
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  accept: string;
  color: string;
  onFileSelect: (file: File) => void;
  selectedFile: FileWithPreview | null;
  onRemove: () => void;
  onUpload: () => void;
  status: FileStatus;
}

function FileUploadCard({ 
  type, 
  icon: Icon, 
  title, 
  accept, 
  color,
  onFileSelect,
  selectedFile,
  onRemove,
  onUpload,
  status
}: FileUploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-gray-200 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${selectedFile ? 'bg-gray-50' : 'bg-white'}`}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {!selectedFile ? (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-10 h-10 text-gray-400" />
            <p className="text-sm text-gray-600 font-medium">Drop your file here or click to browse</p>
            <p className="text-xs text-gray-400">Supports {accept.split(',').join(', ')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedFile.preview && type === 'image' && (
              <img 
                src={selectedFile.preview} 
                alt="Preview" 
                className="mx-auto max-h-32 rounded-lg object-cover"
              />
            )}
            {selectedFile.preview && type === 'video' && (
              <video 
                src={selectedFile.preview} 
                className="mx-auto max-h-32 rounded-lg"
                controls
              />
            )}
            <div className="flex items-center justify-center gap-2">
              <Icon className="w-5 h-5 text-gray-500" />
              <p className="text-sm text-gray-700 font-medium truncate max-w-xs">
                {selectedFile.file.name}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-xs text-gray-500">
              {(selectedFile.file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}
      </div>

      {selectedFile && (
        <button
          onClick={onUpload}
          className={`mt-4 w-full ${color} text-white py-3 px-4 rounded-lg font-medium
            hover:opacity-90 transition-all transform hover:scale-105 active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          disabled={status.loading}
        >
          {status.loading ? 'Uploading...' : `Upload ${title}`}
        </button>
      )}

      {status.message && (
        <div className={`mt-3 p-3 rounded-lg flex items-start gap-2 ${
          status.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {status.success ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          )}
          <p className="text-sm">{status.message}</p>
        </div>
      )}
    </div>
  );
}

export default function UploadPage() {
  const [files, setFiles] = useState<{
    image: FileWithPreview | null;
    pdf: FileWithPreview | null;
    video: FileWithPreview | null;
  }>({
    image: null,
    pdf: null,
    video: null
  });

  const [statuses, setStatuses] = useState<{
    image: FileStatus;
    pdf: FileStatus;
    video: FileStatus;
  }>({
    image: { loading: false, message: '', success: false },
    pdf: { loading: false, message: '', success: false },
    video: { loading: false, message: '', success: false }
  });

  const handleFileSelect = (type: 'image' | 'pdf' | 'video', file: File) => {
    let preview: string | undefined;
    
    if (type === 'image' || type === 'video') {
      preview = URL.createObjectURL(file);
    }

    setFiles(prev => ({
      ...prev,
      [type]: { file, preview, type }
    }));

    setStatuses(prev => ({
      ...prev,
      [type]: { loading: false, message: '', success: false }
    }));
  };

  const handleRemove = (type: 'image' | 'pdf' | 'video') => {
    if (files[type]?.preview) {
      URL.revokeObjectURL(files[type]!.preview!);
    }
    setFiles(prev => ({ ...prev, [type]: null }));
    setStatuses(prev => ({
      ...prev,
      [type]: { loading: false, message: '', success: false }
    }));
  };

  const handleUpload = async (type: 'image' | 'pdf' | 'video') => {
    const fileData = files[type];
    if (!fileData) return;

    setStatuses(prev => ({
      ...prev,
      [type]: { loading: true, message: '', success: false }
    }));

    try {
      const formData = new FormData();
      formData.append("file", fileData.file);

      const res = await axios.post<{ file?: { filepath?: string }; error?: string }>("/api/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const data = res.data;

      if (res.status !== 200) {
        setStatuses(prev => ({
          ...prev,
          [type]: { 
            loading: false, 
            message: data?.error || "Upload failed", 
            success: false 
          }
        }));
      } else {
        setStatuses(prev => ({
          ...prev,
          [type]: { 
            loading: false, 
            message: `Successfully uploaded to ${data?.file?.filepath}`, 
            success: true 
          }
        }));
        
        setTimeout(() => handleRemove(type), 3000);
      }
    } catch (err) {
      const error = err as Error;
      setStatuses(prev => ({
        ...prev,
        [type]: { 
          loading: false, 
          message: "Upload failed: " + (error.message || String(err)), 
          success: false 
        }
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            File Upload Center
          </h1>
          <p className="text-gray-600 text-lg">
            Upload your images, PDFs, and videos with ease
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FileUploadCard
            type="image"
            icon={Image}
            title="Image"
            accept="image/*"
            color="bg-blue-500"
            onFileSelect={(file: File) => handleFileSelect('image', file)}
            selectedFile={files.image}
            onRemove={() => handleRemove('image')}
            onUpload={() => handleUpload('image')}
            status={statuses.image}
          />

          <FileUploadCard
            type="pdf"
            icon={FileText}
            title="PDF"
            accept="application/pdf"
            color="bg-green-500"
            onFileSelect={(file: File) => handleFileSelect('pdf', file)}
            selectedFile={files.pdf}
            onRemove={() => handleRemove('pdf')}
            onUpload={() => handleUpload('pdf')}
            status={statuses.pdf}
          />

          <FileUploadCard
            type="video"
            icon={Video}
            title="Video"
            accept="video/*"
            color="bg-purple-500"
            onFileSelect={(file: File) => handleFileSelect('video', file)}
            selectedFile={files.video}
            onRemove={() => handleRemove('video')}
            onUpload={() => handleUpload('video')}
            status={statuses.video}
          />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Files are stored securely and organized by type</p>
        </div>
      </div>
    </div>
  );
}