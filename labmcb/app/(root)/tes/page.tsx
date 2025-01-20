"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { motion } from "framer-motion";

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
  type: "image" | "pdf";
  filename?: string;
}

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleSuccess = (result: any) => {
    try {
      const info = (result as CloudinaryResult).info;
      const isImage = info.resource_type === "image" && info.format !== "pdf";
      const isPDF = info.format === "pdf";

      if (isImage || isPDF) {
        // Single optimized URL for both images and PDFs
        const fileUrl = `https://res.cloudinary.com/labmcb/image/upload/f_auto,q_auto/${info.public_id}.${info.format}`;

        setUploadedFiles((prev) => [
          ...prev,
          {
            url: fileUrl,
            type: isPDF ? "pdf" : "image",
            filename: info.original_filename
          },
        ]);

        // Log URL untuk disimpan ke database
        console.log("URL untuk database:", fileUrl);
      }
    } catch (error) {
      console.error("Error handling upload:", error);
    }
  };

  const renderFile = (file: UploadedFile, idx: number) => {
    if (file.type === "pdf") {
      return (
        <div key={idx} className="w-full max-w-2xl mb-4 p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
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
            <span className="font-medium">{file.filename || 'PDF Document'}</span>
          </div>
          <div className="flex gap-2">
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              View File
            </a>
          </div>
        </div>
      );
    }

    return (
      <div key={idx} className="mb-4">
        <Image
          src={file.url}
          height={200}
          width={250}
          alt={file.filename || "uploaded file"}
          className="rounded-lg shadow-md"
        />
      </div>
    );
  };

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
            alt: "User uploaded file"
          },
        }}
      >
        {({ open, isLoading }) => {
          return (
            <>
              {isLoading ? (
                <motion.div className="bg-blue-500 p-2 rounded-md text-white">
                  loading, please wait...
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
          );
        }}
      </CldUploadWidget>
    </main>
  );
}