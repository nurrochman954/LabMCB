import React, { useState, useEffect } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Download, Eye, X } from 'lucide-react';
import type { UploadedFile } from '../types';

interface InvoiceSectionProps {
    id: number;
    formType: 'sample-test' | 'equipment-rental';
    onPaymentUploaded?: () => Promise<void>;
}

interface FormData {
    invoiceFile: string | null;
    paymentProof: string | null;
}

const InvoiceSection: React.FC<InvoiceSectionProps> = ({ id, formType, onPaymentUploaded }) => {
    const [invoiceFile, setInvoiceFile] = useState<UploadedFile | null>(null);
    const [paymentProof, setPaymentProof] = useState<UploadedFile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getEndpoint = () => `/api/${formType}/${id}`;

    useEffect(() => {
        const fetchFiles = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(getEndpoint());
                if (!response.ok) throw new Error('Failed to fetch');
                const data: FormData = await response.json();
                
                if (data.invoiceFile) {
                    setInvoiceFile({
                        url: data.invoiceFile,
                        downloadUrl: data.invoiceFile,
                        type: data.invoiceFile.endsWith('.pdf') ? 'pdf' : 'image',
                        filename: data.invoiceFile.split('/').pop() || '',
                        format: data.invoiceFile.split('.').pop() || '',
                        public_id: ''
                    });
                }

                if (data.paymentProof) {
                    setPaymentProof({
                        url: data.paymentProof,
                        downloadUrl: data.paymentProof,
                        type: data.paymentProof.endsWith('.pdf') ? 'pdf' : 'image',
                        filename: data.paymentProof.split('/').pop() || '',
                        format: data.paymentProof.split('.').pop() || '',
                        public_id: ''
                    });
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching files');
                console.error('Error fetching files:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFiles();
    }, [id, formType]);

    const handleFileUpload = async (
        result: any, 
        fileType: 'invoice' | 'payment',
        setFileState: (file: UploadedFile | null) => void
    ) => {
        if (!result.info) return;
        
        const fileUrl = result.info.secure_url;
        const updateData = fileType === 'invoice' 
            ? { invoiceFile: fileUrl }
            : { paymentProof: fileUrl };

        try {
            const response = await fetch(getEndpoint(), {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) throw new Error(`Failed to update ${fileType}`);

            const newFile: UploadedFile = {
                url: fileUrl,
                downloadUrl: fileUrl,
                type: result.info.format === 'pdf' ? 'pdf' : 'image',
                filename: result.info.original_filename || '',
                format: result.info.format || '',
                public_id: result.info.public_id
            };
            
            setFileState(newFile);

            if (fileType === 'payment' && onPaymentUploaded) {
                await onPaymentUploaded();
            }

            if (fileType === 'invoice') {
                handleDownload(fileUrl, result.info.original_filename || `${formType}-invoice.pdf`);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : `Error uploading ${fileType}`);
            console.error(`Error handling ${fileType} upload:`, err);
        }
    };

    const handleDownload = async (url: string, filename: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to download file');
            
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            window.URL.revokeObjectURL(blobUrl);
        } catch (err) {
            setError('Failed to download file');
            console.error('Error downloading file:', err);
        }
    };

    const handleCancelProof = async () => {
        try {
            const response = await fetch(getEndpoint(), {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentProof: null })
            });

            if (!response.ok) throw new Error('Failed to remove payment proof');
            setPaymentProof(null);
        } catch (err) {
            setError('Failed to remove payment proof');
            console.error('Error removing payment proof:', err);
        }
    };

    if (isLoading) return <div className="text-gray-500">Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="flex flex-col gap-4 mt-4 mb-4">
            <div className="flex items-center gap-4">
                {invoiceFile ? (
                    <button
                        onClick={() => handleDownload(
                            invoiceFile.downloadUrl, 
                            invoiceFile.filename || `${formType}-invoice.pdf`
                        )}
                        className="flex items-center gap-2 bg-[#00AFB9] text-white px-4 py-2 rounded-lg hover:bg-[#009BA4] transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Invoice
                    </button>
                ) : (
                    <CldUploadWidget
                        uploadPreset="labmcbpreset"
                        onSuccess={(result) => handleFileUpload(result, 'invoice', setInvoiceFile)}
                        options={{
                            sources: ["local"],
                            multiple: false,
                            maxFiles: 1,
                            folder: `${formType}/invoice`,
                            clientAllowedFormats: ["pdf"]
                        }}
                    >
                        {({ open }) => (
                            <button
                                onClick={() => open?.()}
                                className="bg-[#50BCB8] text-white px-4 py-2 rounded-lg text-lg hover:bg-[#45a6a3] transition-colors"
                            >
                                Invoice
                            </button>
                        )}
                    </CldUploadWidget>
                )}
                
                {paymentProof ? (
                    <div className="flex gap-2">
                        <a
                            href={paymentProof.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Eye className="w-4 h-4" />
                            Lihat
                        </a>
                        <button
                            onClick={handleCancelProof}
                            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            Batal
                        </button>
                    </div>
                ) : (
                    <CldUploadWidget
                        uploadPreset="labmcbpreset"
                        onSuccess={(result) => handleFileUpload(result, 'payment', setPaymentProof)}
                        options={{
                            sources: ["local"],
                            multiple: false,
                            maxFiles: 1,
                            folder: `${formType}/payments`,
                            clientAllowedFormats: ["pdf", "png", "jpg", "jpeg"]
                        }}
                    >
                        {({ open }) => (
                            <button
                                onClick={() => open?.()}
                                className="bg-[#50BCB8] text-white px-4 py-2 rounded-lg text-lg hover:bg-[#45a6a3] transition-colors"
                            >
                                Unggah Bukti Pembayaran
                            </button>
                        )}
                    </CldUploadWidget>
                )}
            </div>
        </div>
    );
};

export default InvoiceSection;