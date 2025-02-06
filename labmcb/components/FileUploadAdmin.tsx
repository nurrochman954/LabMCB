import React, { useState, useEffect } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Eye, X } from 'lucide-react';
import type { UploadedFile } from '../types';

// Update interface props
interface FileUploadAdminProps {
  id: number;  // Ubah dari testId ke id
  onFileUpload?: (fileInfo: {
    url: string;
    filename?: string;
    public_id: string;
    format: string;
  } | null) => void;
  buttonText: string;
  uploadPreset: string;
  folder?: string;
  fileType: 'invoice' | 'result' | 'paymentProof';
  formType: 'sample-test' | 'equipment-rental';  // Tambahkan prop formType
  onUploadSuccess?: () => Promise<void>;
}

// Update penggunaan props di component
const FileUploadAdmin: React.FC<FileUploadAdminProps> = ({
  id,  // Ubah dari testId ke id
  onFileUpload,
  buttonText,
  uploadPreset,
  folder = 'samples',
  fileType,
  formType,  // Tambahkan formType
  onUploadSuccess
}) => {
  const [currentFile, setCurrentFile] = useState<UploadedFile | null>(null);

  // Mendapatkan endpoint yang sesuai berdasarkan formType
  const getEndpoint = () => {
    return formType === 'sample-test' 
      ? `/api/sample-test/${id}`
      : `/api/equipment-rental/${id}`;
  };
  
  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(getEndpoint());
        const data = await response.json();
        
        if (data) {
          let fileUrl;
          switch (fileType) {
            case 'invoice':
              fileUrl = data.invoiceFile;
              break;
            case 'result':
              fileUrl = data.resultFile;
              break;
            case 'paymentProof':
              fileUrl = data.paymentProof;
              break;
            default:
              fileUrl = null;
          }
          
          if (fileUrl) {
            setCurrentFile({
              url: fileUrl,
              downloadUrl: fileUrl,
              type: fileUrl.endsWith('.pdf') ? 'pdf' : 'image',
              filename: fileUrl.split('/').pop() || '',
              format: fileUrl.split('.').pop() || '',
              public_id: '',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchFile();
  }, [id, fileType, formType]);

  const handleSuccess = async (result: any) => {
    try {
      if (!result.info) return;
  
      const info = result.info;
      const fileUrl = info.secure_url;
  
      let updateData = {};
      switch (fileType) {
        case 'invoice':
          updateData = { invoiceFile: fileUrl };
          break;
        case 'result':
          updateData = { resultFile: fileUrl };
          break;
        case 'paymentProof':
          updateData = { paymentProof: fileUrl };
          break;
      }
  
      console.log('Sending update with:', updateData);
  
      const response = await fetch(getEndpoint(), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to update file in database');
      }

      const newFile: UploadedFile = {
        url: fileUrl,
        downloadUrl: fileUrl,
        type: info.format === 'pdf' ? 'pdf' : 'image',
        filename: info.original_filename,
        format: info.format,
        public_id: info.public_id,
      };

      setCurrentFile(newFile);
      
      if (onUploadSuccess) {
        await onUploadSuccess();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menyimpan file ke database. Silakan coba lagi.');
    }
  };

  const handleCancel = async () => {
    try {
      let updateData = {};
      switch (fileType) {
        case 'invoice':
          updateData = { invoiceFile: null };
          break;
        case 'result':
          updateData = { resultFile: null };
          break;
        case 'paymentProof':
          updateData = { paymentProof: null };
          break;
      }

      const response = await fetch(getEndpoint(), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to delete file from database');
      }

      setCurrentFile(null);
      onFileUpload?.(null);
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Gagal menghapus file dari database. Silakan coba lagi.');
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
            Lihat
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