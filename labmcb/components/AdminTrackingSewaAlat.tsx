'use client';

import React, { useState, useEffect } from 'react';
import ButtonDU from './TombolDU';
import PopUpNoSurat from '@/components/PopUpNoSurat';
import DetailPenyewaan from '@/components/DetailPenyewaanPopup';
import FileUploadAdmin from './FileUploadAdmin';
import FileDownloadAdmin from './FileDownloadAdmin';
import ComplaintAdmin from './PopUpKomplainAdmin';
import { RentalStatus } from '@prisma/client';

interface RentalTimeline {
    id: number;
    rentalId: number;
    rentalStatus: RentalStatus;
    rentalTimelineCreatedAt: string;
}

interface RentalData {
    id: number;
    rentalName: string;
    rentalRequestNumber: string | null;
    status: string;
    createdAt: string;
}

interface AdminTrackingStatus {
    [key: number]: {
        isAdminReceived: boolean;
        isManagerProcessing: boolean;
        isManagerApproved: boolean;
        isManagerRejected: boolean;
        isPaymentPaid: boolean;
        isDeliveryStarted: boolean;
        isInUse: boolean;
        isReturned: boolean;
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

const AdminTrackingSewaAlat: React.FC = () => {
    const [rentals, setRentals] = useState<RentalData[]>([]);
    const [openRentalId, setOpenRentalId] = useState<number | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);
    const [trackingStatus, setTrackingStatus] = useState<AdminTrackingStatus>({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentRentalId, setCurrentRentalId] = useState<number | null>(null);

    const isRentalFinished = (rentalId: number) => {
        return trackingStatus[rentalId]?.isReturned || trackingStatus[rentalId]?.isManagerRejected;
    };

    const activeRentals = rentals.filter(rental => !isRentalFinished(rental.id));
    const completedRentals = rentals.filter(rental => isRentalFinished(rental.id));

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const rentalsResponse = await fetch('/api/equipment-rental');
                const rentalsData = await rentalsResponse.json();
                setRentals(rentalsData);

                const initialStatus: AdminTrackingStatus = {};
                for (const rental of rentalsData) {
                    const timelineResponse = await fetch(`/api/equipment-rental/${rental.id}/timeline`);
                    const timelines: RentalTimeline[] = await timelineResponse.json();

                    initialStatus[rental.id] = {
                        isAdminReceived: timelines.some((t: RentalTimeline) => t.rentalStatus === RentalStatus.RECEIVED),
                        isManagerProcessing: timelines.some((t: RentalTimeline) => t.rentalStatus === RentalStatus.REVIEWING),
                        isManagerApproved: timelines.some((t: RentalTimeline) => t.rentalStatus === RentalStatus.APPROVED),
                        isManagerRejected: timelines.some((t: RentalTimeline) => t.rentalStatus === RentalStatus.REJECTED),
                        isPaymentPaid: timelines.some((t: RentalTimeline) => t.rentalStatus === RentalStatus.PAID),
                        isDeliveryStarted: timelines.some((t: RentalTimeline) => t.rentalStatus === RentalStatus.DELIVERY),
                        isInUse: timelines.some((t: RentalTimeline) => t.rentalStatus === RentalStatus.IN_USE),
                        isReturned: timelines.some((t: RentalTimeline) => t.rentalStatus === RentalStatus.RETURNED)
                    };
                }
                setTrackingStatus(initialStatus);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInitialData();
    }, []);

    const handleStatusChange = async (rentalId: number, status: keyof typeof statusMapping) => {
        try {
            const response = await fetch(`/api/equipment-rental/${rentalId}/timeline`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: statusMapping[status] })
            });

            const result = await response.json();
            if (!result.success) throw new Error(result.error);

            setTrackingStatus(prev => ({
                ...prev,
                [rentalId]: {
                    ...prev[rentalId],
                    [status]: true,
                    ...(status === 'isManagerRejected' && {
                        isPaymentPaid: false,
                        isDeliveryStarted: false,
                        isInUse: false,
                        isReturned: false
                    })
                }
            }));
        } catch (error) {
            console.error('Status update error:', error);
        }
    };

    const handleToggleAccordion = (rentalId: number) => {
        setOpenRentalId(openRentalId === rentalId ? null : rentalId);
    };

    const handleOpenDetail = (rentalId: number) => {
        setSelectedDetailId(rentalId);
        setIsDetailOpen(true);
    };

    const handlePopupOpen = (rentalId: number) => {
        setCurrentRentalId(rentalId);
        setIsPopupOpen(true);
    };

    const handlePopupConfirm = async (rentalId: number, rentalRequestNumber: string) => {
        try {
            await fetch(`/api/equipment-rental/${rentalId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rentalRequestNumber })
            });

            setRentals(prev => prev.map(rental =>
                rental.id === rentalId ? { ...rental, rentalRequestNumber } : rental
            ));

            handleStatusChange(rentalId, 'isAdminReceived');
            setIsPopupOpen(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderStatusRow = (
        rentalId: number,
        status: keyof typeof statusMapping,
        text: string,
        condition: boolean,
        prevStatus?: keyof typeof statusMapping
    ) => {
        const canUpdate = prevStatus ? trackingStatus[rentalId]?.[prevStatus] : true;
        const isCompleted = trackingStatus[rentalId]?.[status];
        const isRejected = trackingStatus[rentalId]?.isManagerRejected;

        // Special render for manager approval step
        if (status === 'isManagerApproved') {
            return (
                <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-normal">{text}</span>
                    {!isCompleted && !isRejected && canUpdate && (
                        <div className="flex items-center gap-4 mr-12">
                            <button
                                className="w-8 h-8 bg-center bg-no-repeat bg-contain border-none cursor-pointer"
                                style={{ backgroundImage: "url('./assets/checkbox.png')" }}
                                onClick={() => handleStatusChange(rentalId, 'isManagerApproved')}
                            />
                            <button
                                className="w-8 h-8 bg-center bg-no-repeat bg-contain border-none cursor-pointer"
                                style={{ backgroundImage: "url('./assets/crossbox.png')" }}
                                onClick={() => handleStatusChange(rentalId, 'isManagerRejected')}
                            />
                        </div>
                    )}
                </div>
            );
        }

        // For other status rows
        return (
            <div className="flex items-center justify-between mb-3">
                <span className="text-base font-normal">{text}</span>
                {!isCompleted && !isRejected && canUpdate && (
                    <button
                        className="w-8 h-8 bg-center bg-no-repeat bg-contain border-none cursor-pointer mr-12"
                        style={{ backgroundImage: "url('./assets/checkbox.png')" }}
                        onClick={() => {
                            if (status === 'isAdminReceived') {
                                handlePopupOpen(rentalId);
                            } else {
                                handleStatusChange(rentalId, status);
                            }
                        }}
                    />
                )}
            </div>
        );
    };

    const renderRentalCard = (rental: RentalData) => (
        <div key={rental.id} className="bg-[#FAEBD7] p-5 rounded-lg border border-gray-300 w-[750px] mb-5 relative">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h2 className="font-bold text-left text-[20px] cursor-pointer m-0" onClick={() => handleToggleAccordion(rental.id)}>
                        {rental.rentalName}
                    </h2>
                    <p className="text-sm mt-1">Nomor Penyewaan Alat: {rental.rentalRequestNumber}</p>
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
                <>
                    <div className="mt-4">
                        {renderStatusRow(rental.id, 'isAdminReceived', 'Admin Laboratorium telah menerima surat perjanjian kerja sama/MOU', false)}
                        {renderStatusRow(rental.id, 'isManagerProcessing', 'Sedang diproses oleh Manager ISO', false, 'isAdminReceived')}
                        {renderStatusRow(rental.id, 'isManagerApproved', 'Manager ISO menyetujui penyewaan alat', false, 'isManagerProcessing')}
                        {renderStatusRow(rental.id, 'isPaymentPaid', 'Customer perlu membayar', false, 'isManagerApproved')}

                        {trackingStatus[rental.id]?.isManagerApproved && (
                            <div className="mb-5">
                                <div className="flex gap-4">
                                    <FileDownloadAdmin
                                        id={rental.id}
                                        buttonText="Download Bukti Pembayaran"
                                        fileType="paymentProof"
                                        formType="equipment-rental"
                                    />
                                    <FileUploadAdmin
                                        id={rental.id}
                                        buttonText="Unggah Invoice"
                                        uploadPreset="labmcbpreset"
                                        folder="rental/invoice"
                                        fileType="invoice"
                                        formType="equipment-rental"
                                    />
                                </div>
                            </div>
                        )}

                        {renderStatusRow(rental.id, 'isDeliveryStarted', 'Proses Pengiriman', false, 'isPaymentPaid')}
                        {renderStatusRow(rental.id, 'isInUse', 'Sedang Digunakan', false, 'isDeliveryStarted')}
                        {renderStatusRow(rental.id, 'isReturned', 'Pengembalian alat-alat berhasil', false, 'isInUse')}
                    </div>

                    <div className="absolute bottom-4 right-4">
                        <ComplaintAdmin
                            formId={rental.id}
                            formType="equipment-rental"
                        />
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className="flex justify-center items-center">
            <div className="w-3/5 px-6 py-4">
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

            {isPopupOpen && currentRentalId && (
                <PopUpNoSurat
                    onClose={() => setIsPopupOpen(false)}
                    onConfirm={(rentalRequestNumber) => handlePopupConfirm(currentRentalId, rentalRequestNumber)}
                />
            )}
        </div>
    );
};

export default AdminTrackingSewaAlat;