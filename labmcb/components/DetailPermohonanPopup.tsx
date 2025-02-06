// components/DetailPermohonan.tsx
'use client';

import React, { useEffect, useState } from 'react';
import ButtonDU from './TombolDU';
import { getSampleTestDetail } from '../services/sampleTestService';
import { SampleType, AnalysisType, SamplePreparation } from '@prisma/client';

interface DetailPermohonanProps {
  onClose: () => void;
  id: number;
}

interface TestTimeline {
  id: number;
  testStatus: string;
  testTimelineCreatedAt: string;
}

interface SampleTestDetail {
  id: number;
  testName: string;
  testEmail: string;
  testPhone: string;
  testAddress: string;
  testInstanceName: string;
  deliveryMethod: string;
  sampleName: string;
  sampleQuantity: number;
  samplePreparation: SamplePreparation | null;
  sampleType: SampleType;
  analysisTypes: AnalysisType[];
  testDescription: string | null;
  coverLetter: string | null;
  sampleRequestNumber: string | null;
  invoiceFile: string | null;
  paymentProof: string | null;
  resultFile: string | null;
  timelines: TestTimeline[];
}

const DetailPermohonan: React.FC<DetailPermohonanProps> = ({ onClose, id }) => {
  const [data, setData] = useState<SampleTestDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSampleTestDetail(id);
        setData(result);
      } catch (err) {
        setError('Failed to load data');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const formatPreparation = (prep: SamplePreparation | null): string => {
    if (!prep) return 'Tidak';
    return prep === 'YES' ? 'Ya' : 'Tidak';
  };

  const formatSampleType = (type: SampleType): string => {
    return type.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const formatStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      'SUBMITTED': 'Terkirim',
      'RECEIVED': 'Diterima',
      'REVIEWING': 'Sedang Direview',
      'APPROVED': 'Disetujui',
      'REJECTED': 'Ditolak',
      'TESTED': 'Selesai Diuji',
      'PAID': 'Pembayaran Diterima',
      'COMPLETED': 'Selesai'
    };
    return statusMap[status] || status;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6">
          <div className="text-red-500">{error || 'No data found'}</div>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold"
          aria-label="Close"
        >
          ×
        </button>

        {data.sampleRequestNumber && (
          <div className="text-center mb-4">
            <p className="font-semibold">Nomor Permohonan: {data.sampleRequestNumber}</p>
          </div>
        )}

        <div className="space-y-4 mt-4">
          <div className="flex items-center">
            <div className="w-1/3 font-bold">Nama Lengkap</div>
            <div className="w-auto px-2">:</div>
            <div className="w-2/3 text-left">{data.testName}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold">Email</div>
            <div className="w-auto px-2">:</div>
            <div className="w-2/3 text-left">
              <a href={`mailto:${data.testEmail}`} className="text-blue-500 hover:underline">
                {data.testEmail}
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold">No Telepon</div>
            <div className="w-auto px-2">:</div>
            <div className="w-2/3 text-left">{data.testPhone}</div>
          </div>

          <div className="flex items-start">
            <div className="w-1/3 font-bold pt-1">Alamat</div>
            <div className="w-auto px-2">:</div>
            <div className="w-2/3 text-left">{data.testAddress}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold">Asal Instansi</div>
            <div className="w-auto px-2">:</div>
            <div className="w-2/3 text-left">{data.testInstanceName}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold">Metode Pengiriman</div>
            <div className="w-auto px-2">:</div>
            <div className="w-2/3 text-left">
              {data.deliveryMethod === 'SELF' ? 'Diantar Sendiri' : 'Jasa Ekspedisi'}
            </div>
          </div>

          <hr className="border-gray-300 my-4" />

          <div className="font-bold text-lg mb-2">Detail Sampel</div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold">Nama Sampel</div>
            <div className="w-2 px-2">:</div>
            <div className="w-2/3 text-left">{data.sampleName}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold">Jumlah Sampel</div>
            <div className="w-2 px-2">:</div>
            <div className="w-2/3 text-left">{data.sampleQuantity}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold">Sudah Preparasi</div>
            <div className="w-2 px-2">:</div>
            <div className="w-2/3 text-left">{formatPreparation(data.samplePreparation)}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold">Bentuk Sampel</div>
            <div className="w-2 px-2">:</div>
            <div className="w-2/3 text-left">{formatSampleType(data.sampleType)}</div>
          </div>

          <div className="flex items-start">
            <div className="w-1/3 font-bold pt-1">Jenis Analisis</div>
            <div className="w-2 px-2">:</div>
            <div className="w-2/3 text-left">
              {data.analysisTypes.map(type => type.replace(/_/g, ' ')).join(', ')}
            </div>
          </div>

          {data.testDescription && (
            <div className="flex items-start">
              <div className="w-1/3 font-bold pt-1">Catatan Tambahan</div>
              <div className="w-2 px-2">:</div>
              <div className="w-2/3 text-left">{data.testDescription}</div>
            </div>
          )}

          <hr className="border-gray-300 my-4" />

          <div className="space-y-4">
            {data.coverLetter ? (
              <div className="text-center">
                <ButtonDU
                  variant="secondary"
                  text="Unduh Surat Pengantar"
                  href={data.coverLetter}
                  showIcon={true}
                />
              </div>
            ) : (
              <p className="text-gray-500 italic text-center">Surat pengantar tidak tersedia</p>
            )}

            {data.invoiceFile && (
              <div className="text-center mt-2">
                <ButtonDU
                  variant="secondary"
                  text="Unduh Invoice"
                  href={data.invoiceFile}
                  showIcon={true}
                />
              </div>
            )}

            {data.resultFile && (
              <div className="text-center mt-2">
                <ButtonDU
                  variant="secondary"
                  text="Unduh Hasil Uji"
                  href={data.resultFile}
                  showIcon={true}
                />
              </div>
            )}
          </div>

          {data.timelines && data.timelines.length > 0 && (
            <>
              <hr className="border-gray-300 my-4" />
              <div className="font-bold text-lg mb-2">Riwayat Status</div>
              <div className="space-y-2 border border-gray-300 rounded-lg p-4">
                {data.timelines.map((timeline, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="w-1/2">{formatDate(timeline.testTimelineCreatedAt)}</div>
                    <div className="w-1/2 font-semibold">{formatStatus(timeline.testStatus)}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPermohonan;