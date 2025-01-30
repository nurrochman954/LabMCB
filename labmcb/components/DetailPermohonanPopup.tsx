'use client';

import React, { useEffect, useState } from 'react';
import ButtonDU from './TombolDU';
import { getSampleTestDetail } from '../services/sampleTestService';

interface DetailPermohonanProps {
  onClose: () => void;
  id: number;
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
  samplePreparation: 'YES' | 'NO' | null; 
  sampleType: string;
  analysisTypes: string[];
  testDescription: string | null;
  coverLetter: string | null;
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data found</div>;

  const formatPreparation = (prep: 'YES' | 'NO' | null): string => {
    if (!prep) return 'Tidak';
    return prep === 'YES' ? 'Ya' : 'Tidak';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-xl font-bold mr-4"
        >
          ×
        </button>

        {/* Content */}
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
              <a href={`mailto:${data.testEmail}`} className="text-blue-500 underline">
                {data.testEmail}
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-1/3 font-bold">No Telepon</div>
            <div className="w-2 px-2">:</div>
            <div className="w-2/3 text-left">{data.testPhone}</div>
          </div>
          <div className="flex items-center">
            <div className="w-1/3 font-bold">Alamat</div>
            <div className="w-2 px-2">:</div>
            <div className="w-2/3 text-left">{data.testAddress}</div>
          </div>
          <div className="flex items-center">
            <div className="w-1/3 font-bold">Asal Instansi</div>
            <div className="w-2 px-2">:</div>
            <div className="w-2/3 text-left">{data.testInstanceName}</div>
          </div>
          <div className="flex items-center">
            <div className="w-1/3 font-bold">Metode Pengiriman</div>
            <div className="w-2 px-2">:</div>
            <div className="w-2/3 text-left">{data.deliveryMethod}</div>
          </div>

          <hr className="border-gray-300 my-4" />

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
            <div className="w-1/3 font-bold">Perlu Preparasi</div>
            <div className="w-2 px-2">:</div>
            <div className="w-2/3 text-left">{formatPreparation(data.samplePreparation)}</div>
          </div>
          <div className="flex items-center">
            <div className="w-1/3 font-bold">Bentuk Sampel</div>
            <div className="w-2 px-2">:</div>
            <div className="w-2/3 text-left">{data.sampleType}</div>
          </div>
          <div className="flex items-center">
            <div className="w-1/3 font-bold">Jenis Analisis</div>
            <div className="w-2 px-2">:</div>
            <div className="w-2/3 text-left">{data.analysisTypes.join(', ')}</div>
          </div>
          <div className="flex items-center">
            <div className="w-1/3 font-bold">Catatan Tambahan</div>
            <div className="w-2 px-2">:</div>
            <div className="w-2/3 text-left">{data.testDescription || '-'}</div>
          </div>
        </div>

        <hr className="border-gray-300 my-4" />

        <div className="mt-6 text-center">
          {data.coverLetter ? (
            <ButtonDU 
              variant="secondary"
              text="unduh surat pengantar"
              href={data.coverLetter}
              showIcon={true}
            />
          ) : (
            <p className="text-gray-500 italic">Surat pengantar tidak tersedia</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPermohonan;