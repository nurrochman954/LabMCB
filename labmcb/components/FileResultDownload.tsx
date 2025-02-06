import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

interface FileResultDownloadProps {
  testId: number;
}

const FileResultDownload: React.FC<FileResultDownloadProps> = ({ testId }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`/api/sample-test/${testId}`);
        const data = await response.json();
        
        if (data && data.resultFile) {
          setFileUrl(data.resultFile);
          setFileName(data.resultFile.split('/').pop() || 'hasil-uji.pdf');
        }
      } catch (error) {
        console.error('Error fetching result file:', error);
      }
    };

    fetchFile();
  }, [testId]);

  const handleDownload = async () => {
    if (!fileUrl) return;
  
    try {
      const response = await fetch(fileUrl);
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
    }
  };  

  if (!fileUrl) return null;

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 bg-[#00AFB9] text-white px-4 py-2 rounded-lg hover:bg-[#009BA4] transition-colors ml-6 mt-2"
    >
      <Download className="w-4 h-4" />
      Unduh Hasil Uji
    </button>
  );
};

export default FileResultDownload;