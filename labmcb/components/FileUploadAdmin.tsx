import React, { useState, useEffect } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Eye, X } from 'lucide-react';
import type { UploadedFile } from '../types';

interface FileUploadAdminProps {
  testId: number;
  onFileUpload?: (fileInfo: {
    url: string;
    filename?: string;
    public_id: string;
    format: string;
  } | null) => void;
  buttonText: string;
  uploadPreset: string;
  folder?: string;
  fileType: 'invoice' | 'result';
}

const FileUploadAdmin: React.FC<FileUploadAdminProps> = ({
  testId,
  onFileUpload,
  buttonText,
  uploadPreset,
  folder = 'samples',
  fileType,
}) => {
  const [currentFile, setCurrentFile] = useState<UploadedFile | null>(null);

  // Ambil file dari database saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`/api/sample-test/${testId}`);
        const data = await response.json();
        
        if (data) {
          const fileUrl = fileType === 'invoice' ? data.invoiceFile : data.resultFile;
          
          if (fileUrl) {
            setCurrentFile({
              url: fileUrl,
              downloadUrl: fileUrl,
              type: fileUrl.endsWith('.pdf') ? 'pdf' : 'image',
              filename: fileUrl.split('/').pop() || '',
              format: fileUrl.split('.').pop() || '',
              public_id: '', // Tidak ada public_id di DB, hanya untuk upload baru
            });
          }
        }
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchFile();
  }, [testId, fileType]);

  const handleSuccess = async (result: any) => {
    try {
      if (!result.info) return;
  
      const info = result.info;
      const fileUrl = info.secure_url;
  
      // Add debug logs
      console.log('FileType:', fileType);
      console.log('Update Data:', fileType === 'invoice' 
        ? { invoiceFile: fileUrl }
        : { resultFile: fileUrl });
  
      const updateData = fileType === 'invoice'
        ? { invoiceFile: fileUrl }
        : { resultFile: fileUrl };
  
      // Log the actual request
      console.log('Sending update with:', updateData);
  
      await fetch(`/api/sample-test/${testId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      // ...

      const newFile: UploadedFile = {
        url: fileUrl,
        downloadUrl: fileUrl,
        type: info.format === 'pdf' ? 'pdf' : 'image',
        filename: info.original_filename,
        format: info.format,
        public_id: info.public_id,
      };

      setCurrentFile(newFile);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = async () => {
    try {
      // Hapus dari database
      const updateData = fileType === 'invoice'
        ? { invoiceFile: null }
        : { resultFile: null };

      await fetch(`/api/sample-test/${testId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      setCurrentFile(null);
      onFileUpload?.(null);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div className="inline-block">
      {currentFile ? (
        <div className="flex gap-2">
          <a
            href={currentFile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Eye className="w-4 h-4" />
            View
          </a>
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
            Batal
          </button>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset={uploadPreset}
          onSuccess={handleSuccess}
          options={{
            sources: ['local'],
            multiple: false,
            maxFiles: 1,
            resourceType: 'auto',
            folder: folder,
            clientAllowedFormats: ['pdf', 'png', 'jpg', 'jpeg'],
          }}
        >
          {({ open, isLoading }) => (
            <button
              type="button"
              onClick={() => open?.()}
              disabled={!!isLoading}
              className="bg-[#50BCB8] text-white px-6 py-2 rounded-lg text-lg hover:bg-[#45a6a3] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : buttonText}
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
};

export default FileUploadAdmin;
