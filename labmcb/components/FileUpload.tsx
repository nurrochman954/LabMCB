"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Download, Eye, X } from "lucide-react";

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

interface FileUploadProps {
    onFileUpload?: (fileInfo: {
        url: string;
        filename?: string;
        public_id: string;
        format: string;
    } | null) => void;
    uploadPreset: string;
    folder?: string;
    acceptedFileTypes?: string[];
    maxFileSize?: number;
    initialFile?: string | null; // Tambahkan ini untuk initial value
}

export const FileUpload: React.FC<FileUploadProps> = ({
    onFileUpload,
    uploadPreset,
    folder = "samples",
    acceptedFileTypes = ["jpg", "jpeg", "png", "webp", "pdf"],
    maxFileSize = 10485760,
    initialFile = null
}) => {
    const [currentFile, setCurrentFile] = useState<UploadedFile | null>(
        initialFile ? {
            url: initialFile,
            downloadUrl: initialFile,
            type: initialFile.endsWith('.pdf') ? 'pdf' : 'image',
            format: initialFile.split('.').pop() || 'pdf',
            public_id: initialFile,
            filename: initialFile.split('/').pop()
        } : null
    );

    const handleSuccess = (result: any) => {
        try {
            const info = (result as CloudinaryResult).info;
            const isImage =
                info.resource_type === "image" &&
                ["jpg", "jpeg", "png", "webp"].includes(info.format);
            const isPDF = info.format === "pdf";

            if (isImage || isPDF) {
                const fileUrl = `https://res.cloudinary.com/labmcb/image/upload/${info.public_id}.${info.format}`;

                const newFile: UploadedFile = {
                    url: fileUrl,
                    downloadUrl: fileUrl,
                    type: isPDF ? "pdf" : "image",
                    filename: info.original_filename,
                    format: info.format,
                    public_id: info.public_id,
                };

                setCurrentFile(newFile);

                onFileUpload?.({
                    url: fileUrl,
                    filename: info.original_filename,
                    public_id: info.public_id,
                    format: info.format
                });
            } else {
                alert(`Only ${acceptedFileTypes.join(", ")} files are allowed.`);
            }
        } catch (error) {
            console.error("Error handling upload:", error);
        }
    };


    const handleCancel = () => {
        setCurrentFile(null);
        onFileUpload?.(null);
    };

    const renderFile = (file: UploadedFile) => (
        <div className="w-full max-w-2xl mb-4 p-4 border rounded-lg shadow-md">
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
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                    <X size={16} />
                    Batal
                </button>
            </div>
        </div>
    );

    return (
        <div>
            {currentFile ? (
                renderFile(currentFile)
            ) : (
                <CldUploadWidget
                    uploadPreset={uploadPreset}
                    onSuccess={handleSuccess}
                    options={{
                        sources: ["local"],
                        multiple: false,
                        maxFiles: 1,
                        resourceType: "auto",
                        showAdvancedOptions: false,
                        singleUploadAutoClose: false,
                        folder: folder,
                        maxFileSize: maxFileSize,
                        clientAllowedFormats: acceptedFileTypes
                    }}
                >
                    {({ open, isLoading }) => (
                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    open();
                                }}
                                disabled={isLoading}
                                style={{
                                    backgroundColor: isLoading 
                                        ? '#cccccc' 
                                        : '#50BCB8',
                                    color: 'white',
                                    padding: '5px 20px',
                                    border: 'none',
                                    borderRadius: '10px',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    fontSize: '20px',
                                    width: '150px',
                                    height: '50px',
                                    textAlign: 'center',
                                    lineHeight: '30px',
                                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
                                    opacity: isLoading ? 0.7 : 1,
                                }}
                            >
                                {isLoading ? 'Loading...' : 'Upload File'}
                            </button>
                        </div>
                    )}
                </CldUploadWidget>
            )}
        </div>
    );
};