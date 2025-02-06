// components/DetailPenyewaan.tsx
'use client';

import React, { useEffect, useState } from 'react';
import ButtonDU from './TombolDU';
import { getRentalDetail } from '@/services/rentalService';
import { RentalStatus } from '@prisma/client';

interface DetailPenyewaanProps {
  onClose: () => void;
  id: number;
}

interface EquipmentOrder {
  equipmentType: string;
  quantity: number;
}

interface RentalTimeline {
  id: number;
  rentalStatus: RentalStatus;
  rentalTimelineCreatedAt: string;
}

interface RentalDetail {
  id: number;
  rentalName: string;
  rentalEmail: string;
  rentalPhone: string;
  rentalAddress: string;
  rentalInstance: string;
  startDate: string;
  endDate: string;
  equipmentOrders: EquipmentOrder[];
  agreementFile: string | null;
  invoiceFile: string | null;
  paymentProof: string | null;
  timelines: RentalTimeline[];
  rentalRequestNumber: string | null;
  createdAt: string;
}

const DetailPenyewaan: React.FC<DetailPenyewaanProps> = ({ onClose, id }) => {
  const [data, setData] = useState<RentalDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getRentalDetail(id);
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load data');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6">
          <div className="text-red-500">Error: {error}</div>
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

  if (!data) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6">
          <div>No data found</div>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const formatStatus = (status: RentalStatus): string => {
    const statusMap: Record<string, string> = {
      'SUBMITTED': 'Terkirim',
      'RECEIVED': 'Diterima',
      'REVIEWING': 'Sedang Direview',
      'APPROVED': 'Disetujui',
      'REJECTED': 'Ditolak',
      'PAID': 'Pembayaran Diterima',
      'IN_USE': 'Sedang Digunakan',
      'DELIVERY': 'Dalam Pengiriman',
      'RETURNED': 'Dikembalikan',
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

  const formatEquipmentType = (type: string) => {
    return type.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px] relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold"
          aria-label="Close"
        >
          ×
        </button>

        {/* Header with Request Number */}
        {data.rentalRequestNumber && (
          <div className="text-center mb-4 text-gray-700">
            <h3 className="font-semibold">Nomor Permintaan: {data.rentalRequestNumber}</h3>
          </div>
        )}

        {/* Content */}
        <div className="space-y-4 mt-4">
          {/* Personal Information */}
          <div className="flex items-center">
            <div className="w-1/3 font-bold">Nama Lengkap</div>
            <div className="w-auto px-2">:</div>
            <div className="w-2/3 text-left">{data.rentalName}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold">Email</div>
            <div className="w-auto px-2">:</div>
            <div className="w-2/3 text-left">
              <a href={`mailto:${data.rentalEmail}`} className="text-blue-500 hover:underline">
                {data.rentalEmail}
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold">No Telepon</div>
            <div className="w-auto px-2">:</div>
            <div className="w-2/3 text-left">{data.rentalPhone}</div>
          </div>

          <div className="flex items-start">
            <div className="w-1/3 font-bold pt-1">Alamat</div>
            <div className="w-auto px-2">:</div>
            <div className="w-2/3 text-left">{data.rentalAddress}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold">Asal Instansi</div>
            <div className="w-auto px-2">:</div>
            <div className="w-2/3 text-left">{data.rentalInstance}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold">Tanggal Penyewaan</div>
            <div className="w-auto px-2">:</div>
            <div className="w-2/3 text-left">
              {formatDate(data.startDate)} - {formatDate(data.endDate)}
            </div>
          </div>

          <hr className="border-gray-300 my-4" />

          {/* Equipment Orders */}
          <div className="font-bold text-lg mb-2">Detail Peralatan</div>

          {data.equipmentOrders.map((order, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center">
                <div className="w-1/3 font-bold">Nama Alat {data.equipmentOrders.length > 1 ? index + 1 : ''}</div>
                <div className="w-auto px-2">:</div>
                <div className="w-2/3 text-left">{formatEquipmentType(order.equipmentType)}</div>
              </div>
              <div className="flex items-center mt-2">
                <div className="w-1/3 font-bold">Kuantitas</div>
                <div className="w-auto px-2">:</div>
                <div className="w-2/3 text-left">{order.quantity}</div>
              </div>
              {index < data.equipmentOrders.length - 1 && (
                <div className="my-3 border-t border-gray-200"></div>
              )}
            </div>
          ))}

          <hr className="border-gray-300 my-4" />

          {/* Files Section */}
          <div className="space-y-4">
            {/* Agreement File */}
            <div className="text-center">
              {data.agreementFile ? (
                <ButtonDU
                  variant="secondary"
                  text="Unduh Surat Perjanjian"
                  href={data.agreementFile}
                  showIcon={true}
                />
              ) : (
                <p className="text-gray-500 italic">Surat perjanjian tidak tersedia</p>
              )}
            </div>

            {/* Invoice File - if available */}
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

            {/* Payment Proof - if available */}
            {data.paymentProof && (
              <div className="text-center mt-2">
                <ButtonDU
                  variant="secondary"
                  text="Unduh Bukti Pembayaran"
                  href={data.paymentProof}
                  showIcon={true}
                />
              </div>
            )}
          </div>

          {/* Status Timeline - if available */}
          {data.timelines && data.timelines.length > 0 && (
            <>
              <hr className="border-gray-300 my-4" />
              <div className="font-bold text-lg mb-2">Riwayat Status</div>
              <div className="space-y-2 border border-gray-300 rounded-lg p-4">
                {data.timelines.map((timeline, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="w-1/2">{formatDate(timeline.rentalTimelineCreatedAt)}</div>
                    <div className="w-1/2 font-semibold">{formatStatus(timeline.rentalStatus)}</div>
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

export default DetailPenyewaan;