"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Image,
  FileText,
  Video,
  Filter,
  Download,
  Calendar,
  File,
  Eye,
  Loader2,
} from "lucide-react";
import React from "react";

interface FileType {
  id: string;
  filename: string;
  filepath: string;
  filetype: string;
  mimetype: string;
  createdAt: string;
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count: number;
}

function FilterButton({
  active,
  onClick,
  icon: Icon,
  label,
  count,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 active:scale-95 ${
        active
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
          : "bg-white text-gray-700 hover:bg-gray-50 shadow border border-gray-200"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          active ? "bg-white/20" : "bg-gray-200"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function FileCard({ file }: { file: FileType }) {
  const [isHovered, setIsHovered] = useState(false);

  const getFileIcon = () => {
    switch (file.filetype) {
      case "images":
        return <Image  className="w-6 h-6 text-blue-500" />;
      case "pdfs":
        return <FileText className="w-6 h-6 text-red-500" />;
      case "videos":
        return <Video className="w-6 h-6 text-purple-500" />;
      default:
        return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  const getFileColor = () => {
    switch (file.filetype) {
      case "images":
        return "from-blue-500 to-cyan-500";
      case "pdfs":
        return "from-red-500 to-pink-500";
      case "videos":
        return "from-purple-500 to-indigo-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* File Preview */}
      <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {file.filetype === "images" && (
          <img
            src={file.filepath}
            alt={file.filename}
            className="w-full h-full object-cover"
          />
        )}

        {file.filetype === "pdfs" && (
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`p-8 rounded-full bg-gradient-to-br ${getFileColor()}`}
            >
              <FileText className="w-20 h-20 text-white" />
            </div>
          </div>
        )}

        {file.filetype === "videos" && (
          <video
            src={file.filepath}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
          />
        )}

        {/* Overlay on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-opacity">
            <a
              href={file.filepath}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="w-5 h-5 text-gray-700" />
            </a>
            <a
              href={file.filepath}
              download={file.filename}
              className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-5 h-5 text-gray-700" />
            </a>
          </div>
        )}

        {/* File type badge */}
        <div
          className={`absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r ${getFileColor()} rounded-full shadow-lg`}
        >
          <span className="text-white text-xs font-semibold uppercase">
            {file.filetype}
          </span>
        </div>
      </div>

      {/* File Info */}
      <div className="p-5 space-y-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">{getFileIcon()}</div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-gray-800 truncate"
              title={file.filename}
            >
              {file.filename}
            </h3>
            <p className="text-sm text-gray-500 truncate">{file.mimetype}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date(file.createdAt).toLocaleDateString()}</span>
          <span className="text-gray-300">•</span>
          <span>{new Date(file.createdAt).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [files, setFiles] = useState<FileType[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get<FileType[]>("/api/files");
        setFiles(res.data);
        setFilteredFiles(res.data);
      } catch (err) {
        const error = err as Error;
        console.error(error);
        setError("Failed to fetch files");
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredFiles(files);
    } else {
      setFilteredFiles(files.filter((f) => f.filetype === filter));
    }
  }, [filter, files]);

  const getCounts = () => ({
    all: files.length,
    images: files.filter((f) => f.filetype === "images").length,
    pdfs: files.filter((f) => f.filetype === "pdfs").length,
    videos: files.filter((f) => f.filetype === "videos").length,
  });

  const counts = getCounts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
          <p className="text-gray-600 text-lg font-medium">
            Loading your files...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <File className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-600 text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <Image className="w-10 h-10 text-white" />
            </div>
            File Gallery
          </h1>
          <p className="text-gray-600 text-lg">
            Browse and manage your uploaded files
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <FilterButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
            icon={Filter}
            label="All Files"
            count={counts.all}
          />
          <FilterButton
            active={filter === "images"}
            onClick={() => setFilter("images")}
            icon={Image}
            label="Images"
            count={counts.images}
          />
          <FilterButton
            active={filter === "pdfs"}
            onClick={() => setFilter("pdfs")}
            icon={FileText}
            label="PDFs"
            count={counts.pdfs}
          />
          <FilterButton
            active={filter === "videos"}
            onClick={() => setFilter("videos")}
            icon={Video}
            label="Videos"
            count={counts.videos}
          />
        </div>

        {/* Empty State */}
        {filteredFiles.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <File className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No files found
            </h3>
            <p className="text-gray-500">
              {filter === "all"
                ? "Upload some files to get started"
                : `No ${filter} available`}
            </p>
          </div>
        )}

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
}
