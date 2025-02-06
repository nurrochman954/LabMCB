import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

interface FileDownloadAdminProps {
  id: number;  // Mengubah dari testId ke id
  buttonText: string;
  fileType: 'paymentProof' | 'invoice' | 'result';
  formType: 'sample-test' | 'equipment-rental';  // Menambah prop formType
}

const FileDownloadAdmin: React.FC<FileDownloadAdminProps> = ({
  id,
  buttonText,
  fileType,
  formType
}) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  // Helper function untuk mendapatkan endpoint
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
          let url = null;
          switch (fileType) {
            case 'paymentProof':
              url = data.paymentProof;
              break;
            case 'invoice':
              url = data.invoiceFile;
              break;
            case 'result':
              url = data.resultFile;
              break;
          }
          
          if (url) {
            setFileUrl(url);
            // Mendapatkan nama file dari URL atau menggunakan default
            const defaultName = `${formType}-${fileType}-${id}.pdf`;
            setFileName(url.split('/').pop() || defaultName);
          }
        }
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchFile();
  }, [id, fileType, formType]);

  const handleDownload = async () => {
    if (!fileUrl) return;
  
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Gagal mengunduh file. Silakan coba lagi.');
    }
  };  

  if (!fileUrl) return null;

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 bg-[#00AFB9] text-white px-4 py-2 rounded-lg hover:bg-[#009BA4] transition-colors"
    >
      <Download className="w-4 h-4" />
      {buttonText}
    </button>
  );
};

export default FileDownloadAdmin;