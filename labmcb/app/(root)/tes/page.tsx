"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Eye } from "lucide-react";

interface CloudinaryResult {
  info: {
    url: string;
    resource_type: string;
    format: string;
    secure_url: string;
    public_id: string;
    original_filename: string;
  };
}

interface UploadedFile {
  url: string;
  downloadUrl: string;
  type: "image" | "pdf";
  filename?: string;
  format: string;
  public_id: string;
}

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleSuccess = (result: any) => {
    try {
      const info = (result as CloudinaryResult).info;
      const isImage =
        info.resource_type === "image" &&
        ["jpg", "jpeg", "png", "webp"].includes(info.format); // Validasi format gambar
      const isPDF = info.format === "pdf"; // Validasi format PDF

      if (isImage || isPDF) {
        const viewUrl = `https://res.cloudinary.com/labmcb/image/upload/${info.public_id}.${info.format}`;
        const downloadUrl = `https://res.cloudinary.com/labmcb/image/upload/${info.public_id}.${info.format}`;

        setUploadedFiles((prev) => [
          ...prev,
          {
            url: viewUrl,
            downloadUrl: downloadUrl,
            type: isPDF ? "pdf" : "image",
            filename: info.original_filename,
            format: info.format,
            public_id: info.public_id,
          },
        ]);

        console.log("View URL:", viewUrl);
        console.log("Download URL:", downloadUrl);
      } else {
        alert("Only images (JPG, PNG, WebP) and PDFs are allowed.");
      }
    } catch (error) {
      console.error("Error handling upload:", error);
    }
  };

  const handleDownload = async (file: UploadedFile) => {
    try {
      const response = await fetch(file.downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      const extension = file.format;
      const filename = file.filename || `${file.public_id}.${extension}`;
      a.download = filename;

      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file. Please try again.");
    }
  };

  const renderFile = (file: UploadedFile, idx: number) => (
    <div key={idx} className="w-full max-w-2xl mb-4 p-4 border rounded-lg shadow-md">
      <div className="mb-4">
        {file.type === "image" ? (
          <Image
            src={file.url}
            height={200}
            width={250}
            alt={file.filename || "uploaded file"}
            className="rounded-lg"
          />
        ) : (
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium">
              {file.filename || `Document.${file.format}`}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <Eye size={16} />
          View
        </a>

        <button
          onClick={() => handleDownload(file)}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          <Download size={16} />
          Download
        </button>
      </div>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold mb-8">File Upload Demo</h1>

      <div className="w-full max-w-4xl">
        {uploadedFiles.map((file, idx) => renderFile(file, idx))}
      </div>

      <CldUploadWidget
        uploadPreset="labmcbpreset"
        onSuccess={handleSuccess}
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles: 1,
          resourceType: "auto",
          showAdvancedOptions: false,
          singleUploadAutoClose: false,
          folder: "samples/labmcb",
          tags: ["labmcb"],
          context: {
            alt: "User uploaded file",
          },
        }}
      >
        {({ open, isLoading }) => (
          <>
            {isLoading ? (
              <motion.div className="bg-blue-500 p-2 rounded-md text-white">
                Loading, please wait...
              </motion.div>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  open();
                }}
                className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-600 transition-colors"
              >
                Upload File (Images & PDF)
              </button>
            )}
          </>
        )}
      </CldUploadWidget>
    </main>
  );
}
