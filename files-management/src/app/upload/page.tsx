// app/upload/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);

    if (selected && selected.type.startsWith("image")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResponse(data.filePath);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-semibold mb-4">📤 Upload File</h1>

      <input type="file" onChange={handleFileChange} className="mb-3" />
      {preview && (
        <Image src={preview} alt="Preview" className="w-64 h-auto rounded mb-4" />
      )}

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      {response && (
        <p className="mt-4 text-green-600">
          ✅ Uploaded: <a href={response}>{response}</a>
        </p>
      )}

      <h2 className="text-xl mt-8">🎬 Stream Video Example</h2>
      <video
        controls
        width="480"
        className="mt-3 border rounded"
        src="/api/video"
      />
    </div>
  );
}
