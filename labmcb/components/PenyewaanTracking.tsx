'use client';
import React, { useState, useEffect, CSSProperties } from 'react';
import DetailPenyewaan from '@/components/DetailPenyewaanPopup';
import InvoiceSection from './InvoiceSection';
import ComplaintForm from './PopUpKomplain';
import { RentalStatus } from '@prisma/client';
import { useAuth } from "@clerk/nextjs";

interface RentalData {
  id: number;
  rentalName: string;
  rentalRequestNumber: string | null;
  status: string;
  createdAt: string;
}

interface RentalTimeline {
  id: number;
  rentalId: number;
  rentalStatus: RentalStatus;
  rentalTimelineCreatedAt: string;
}

interface UserTrackingStatus {
  [key: number]: {
    isAdminReceived: boolean;
    isManagerProcessing: boolean;
    isManagerApproved: boolean;
    isManagerRejected: boolean;
    isPaymentPaid: boolean;
    isDeliveryStarted: boolean;
    isInUse: boolean;
    isReturned: boolean;
    createdAt: Date;
  };
}

const statusMapping = {
  isAdminReceived: 'RECEIVED',
  isManagerProcessing: 'REVIEWING',
  isManagerApproved: 'APPROVED',
  isManagerRejected: 'REJECTED',
  isPaymentPaid: 'PAID',
  isDeliveryStarted: 'DELIVERY',
  isInUse: 'IN_USE',
  isReturned: 'RETURNED'
} as const;

const formatDate = (dateString: string | Date) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '-';
  }
};

interface StatusItemProps {
  color: string;
  text: string;
  direction?: 'up' | 'down' | 'both';
}

const StatusItem: React.FC<StatusItemProps> = ({
  color,
  text,
  direction = 'both',
}) => (
  <div className="relative flex items-center my-5">
    <div className="flex items-center flex-1">
      {direction === 'up' && <div style={styles.lineStyle as CSSProperties}></div>}
      <div style={{ ...styles.dotStyle as CSSProperties, backgroundColor: color }}></div>
      {direction === 'down' && (
        <div style={{ ...styles.lineStyle as CSSProperties, bottom: '-47px', top: 'auto' }}></div>
      )}
      {direction === 'both' && (
        <div style={{ ...styles.lineStyle as CSSProperties, bottom: '-15px', top: '15px' }}></div>
      )}
      <span className="flex-grow text-base font-normal">{text}</span>
    </div>
  </div>
);

const RentalTracking: React.FC = () => {
  const { userId } = useAuth();
  const [rentals, setRentals] = useState<RentalData[]>([]);
  const [openRentalId, setOpenRentalId] = useState<number | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);
  const [trackingStatus, setTrackingStatus] = useState<UserTrackingStatus>({});
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [selectedRentalId, setSelectedRentalId] = useState<number | null>(null);

  const fetchInitialData = async () => {
    try {
     // if (!userId) return; // Guard clause
      
      const response = await fetch('/api/equipment-rental/user');
      const rentalsData = await response.json();
      const rentalsToProcess = rentalsData.data || []; // Access .data property
      setRentals(rentalsToProcess);

      const initialStatus: UserTrackingStatus = {};
      for (const rental of rentalsToProcess) {
        const timelineResponse = await fetch(`/api/equipment-rental/${rental.id}/timeline`);
        const timelines: RentalTimeline[] = await timelineResponse.json();

        const createdAt = timelines.length > 0
          ? new Date(timelines[0].rentalTimelineCreatedAt)
          : new Date();

        initialStatus[rental.id] = {
          isAdminReceived: timelines.some(t => t.rentalStatus === RentalStatus.RECEIVED),
          isManagerProcessing: timelines.some(t => t.rentalStatus === RentalStatus.REVIEWING),
          isManagerApproved: timelines.some(t => t.rentalStatus === RentalStatus.APPROVED),
          isManagerRejected: timelines.some(t => t.rentalStatus === RentalStatus.REJECTED),
          isPaymentPaid: timelines.some(t => t.rentalStatus === RentalStatus.PAID),
          isDeliveryStarted: timelines.some(t => t.rentalStatus === RentalStatus.DELIVERY),
          isInUse: timelines.some(t => t.rentalStatus === RentalStatus.IN_USE),
          isReturned: timelines.some(t => t.rentalStatus === RentalStatus.RETURNED),
          createdAt
        };
      }
      setTrackingStatus(initialStatus);
    } catch (error) {
      console.error('Error fetching data:', error);
      setRentals([]);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleToggleAccordion = (rentalId: number) => {
    setOpenRentalId(openRentalId === rentalId ? null : rentalId);
  };

  const handleOpenDetail = (rentalId: number) => {
    setSelectedDetailId(rentalId);
    setIsDetailOpen(true);
  };

  const handleComplaintClick = (rentalId: number) => {
    setSelectedRentalId(rentalId);
    setShowComplaintForm(true);
  };

  const handleComplaintSuccess = () => {
    setShowComplaintForm(false);
    fetchInitialData();
  };

  const isRentalFinished = (rentalId: number) => {
    return trackingStatus[rentalId]?.isReturned || trackingStatus[rentalId]?.isManagerRejected;
  };

  const getStatusColor = (rentalId: number, status: keyof typeof statusMapping) => {
    if (trackingStatus[rentalId]?.[status]) return 'green';
    const prevStatus = getPreviousStatus(status);
    if (!prevStatus || trackingStatus[rentalId]?.[prevStatus]) return 'red';
    return 'gray';
  };

  const getPreviousStatus = (status: keyof typeof statusMapping) => {
    const statusOrder: (keyof typeof statusMapping)[] = [
      'isAdminReceived',
      'isManagerProcessing',
      'isManagerApproved',
      'isPaymentPaid',
      'isDeliveryStarted',
      'isInUse',
      'isReturned'
    ];
    const currentIndex = statusOrder.indexOf(status);
    return currentIndex > 0 ? statusOrder[currentIndex - 1] : null;
  };

  const activeRentals = rentals.filter(rental => !isRentalFinished(rental.id));
  const completedRentals = rentals.filter(rental => isRentalFinished(rental.id));

  const renderRentalCard = (rental: RentalData) => (
    <div key={rental.id} className="bg-[#FAEBD7] p-5 rounded-lg border border-gray-300 w-[750px] mb-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="font-bold text-left text-[20px] cursor-pointer m-0" onClick={() => handleToggleAccordion(rental.id)}>
            {rental.rentalRequestNumber || 'Nomor permohonan belum diterbitkan'}
          </h2>
          <p className="text-sm mt-1">
            Tanggal Pemesanan: {trackingStatus[rental.id]?.createdAt ? formatDate(trackingStatus[rental.id].createdAt) : '-'}
          </p>
          {trackingStatus[rental.id]?.isManagerRejected && (
            <p className="text-sm mt-1 text-red-600">Status: Ditolak</p>
          )}
          {trackingStatus[rental.id]?.isReturned && (
            <p className="text-sm mt-1 text-green-600">Status: Selesai</p>
          )}
        </div>
        <img
          src="assets/ExternalLink.png"
          alt="Open Detail"
          className="h-8 w-10 mr-12 cursor-pointer"
          onClick={() => handleOpenDetail(rental.id)}
        />
      </div>

      {openRentalId === rental.id && (
        <div className="mt-4">
          <StatusItem
            color={getStatusColor(rental.id, 'isAdminReceived')}
            text="Admin Laboratorium telah menerima surat perjanjian kerja sama/MOU"
            direction="down"
          />
          <StatusItem
            color={getStatusColor(rental.id, 'isManagerProcessing')}
            text="Sedang diproses oleh Manager ISO"
          />
          <StatusItem
            color={getStatusColor(rental.id, 'isManagerApproved')}
            text="Manager ISO menyetujui penyewaan alat"
          />
          <StatusItem
            color={getStatusColor(rental.id, 'isPaymentPaid')}
            text="Customer perlu membayar"
          />

          {trackingStatus[rental.id]?.isManagerApproved && (
            <div className="mb-5 ml-6">
              <InvoiceSection
                id={rental.id}
                formType="equipment-rental"
              />
            </div>
          )}

          <StatusItem
            color={getStatusColor(rental.id, 'isDeliveryStarted')}
            text="Proses Pengiriman"
          />
          <StatusItem
            color={getStatusColor(rental.id, 'isInUse')}
            text="Sedang Digunakan"
          />
          <StatusItem
            color={getStatusColor(rental.id, 'isReturned')}
            text="Pengembalian alat-alat berhasil"
            direction="up"
          />

          <div className="mt-4 text-right mr-3">
            <button
              onClick={() => handleComplaintClick(rental.id)}
              className="text-gray-600 hover:text-gray-800"
            >
              Ajukan Pengaduan
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div style={{ width: '750px' }}>
        <h2 className="text-2xl font-bold mb-4">Penyewaan Alat</h2>

        {activeRentals.length > 0 && (
          <>
            <h3 className="text-xl mb-4">Terbaru</h3>
            {activeRentals.map(rental => renderRentalCard(rental))}
          </>
        )}

        {completedRentals.length > 0 && (
          <>
            <h3 className="text-xl mb-4">Selesai</h3>
            {completedRentals.map(rental => renderRentalCard(rental))}
          </>
        )}

        {rentals.length === 0 && (
          <p className="text-gray-500 text-center">Tidak ada penyewaan alat</p>
        )}
      </div>

      {isDetailOpen && selectedDetailId && (
        <DetailPenyewaan
          id={selectedDetailId}
          onClose={() => setIsDetailOpen(false)}
        />
      )}

      {showComplaintForm && selectedRentalId && (
        <ComplaintForm
          testId={selectedRentalId}
          formType="equipment-rental"
          onClose={() => setShowComplaintForm(false)}
          onSubmitSuccess={handleComplaintSuccess}
        />
      )}
    </div>
  );
};

const styles = {
  dotStyle: {
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    zIndex: 2,
    position: 'relative' as const,
    marginRight: '10px'
  },
  lineStyle: {
    position: 'absolute' as const,
    left: '6px',
    transform: 'translateX(-50%)',
    width: '2px',
    height: '65px',
    backgroundColor: '#ccc',
    zIndex: 1,
    top: '-47px'
  }
};

export default RentalTracking;