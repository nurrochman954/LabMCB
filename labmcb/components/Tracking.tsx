'use client';
import React, { useState, useEffect, CSSProperties } from 'react';
import { useAuth } from "@clerk/nextjs";
import ButtonDU from './TombolDU';
import PopUpNoSurat from '@/components/PopUpNoSurat';
import DetailPermohonan from '@/components/DetailPermohonanPopup';
import InvoiceSection from './InvoiceSection';
import FileResultDownload from './FileResultDownload';
import ComplaintForm from './PopUpKomplain';
import type { SampleTest, TestTimelineData, UserTrackingStatus } from '../types';

const statusMapping = {
    isAdminReceived: 'RECEIVED',
    isSupervisorProcessing: 'REVIEWING',
    isSupervisorApproved: 'APPROVED',
    isSupervisorRejected: 'REJECTED',
    isLaboranTested: 'TESTED',
    isPaymentPaid: 'PAID',
    isFileUploaded: 'COMPLETED'
} as const;

interface StatusItemProps {
    color: string;
    text: string;
    direction?: 'up' | 'down' | 'both';
    showCheckbox?: boolean;
    onCheck?: () => void;
}

const formatDate = (dateString: string | Date) => {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return '-';
        }
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        return date.toLocaleDateString('id-ID', options);
    } catch (error) {
        console.error('Error formatting date:', error);
        return '-';
    }
};

const StatusItem: React.FC<StatusItemProps> = ({
    color,
    text,
    direction = 'both',
}) => (
    <div className="relative flex items-center my-5">
        <div className="flex items-center flex-1">
            {direction === 'up' && (
                <div style={styles.lineStyle as CSSProperties}></div>
            )}

            <div style={{
                ...styles.dotStyle as CSSProperties,
                backgroundColor: color
            }}></div>

            {direction === 'down' && (
                <div style={{
                    ...styles.lineStyle as CSSProperties,
                    bottom: '-47px',
                    top: 'auto'
                }}></div>
            )}

            {direction === 'both' && (
                <div style={{
                    ...styles.lineStyle as CSSProperties,
                    bottom: '-15px',
                    top: '15px'
                }}></div>
            )}

            <span className="flex-grow text-base font-normal">{text}</span>
        </div>
    </div>
);

const Tracking: React.FC = () => {
    const { userId } = useAuth();
    const [sampleTests, setSampleTests] = useState<SampleTest[]>([]);
    const [openTestId, setOpenTestId] = useState<number | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);
    const [trackingStatus, setTrackingStatus] = useState<UserTrackingStatus>({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentTestId, setCurrentTestId] = useState<number | null>(null);
    // State untuk ComplaintForm
    const [showComplaintForm, setShowComplaintForm] = useState(false);
    const [selectedTestId, setSelectedTestId] = useState<number | null>(null);

// In Tracking.tsx, modify fetchInitialData:
const fetchInitialData = async () => {
    try {
    //  if (!userId) return; // Add guard clause for userId
      
      const testsResponse = await fetch(`/api/sample-test/user`);
      const testsData = await testsResponse.json();
      
      const tests = testsData.data || testsData;
      setSampleTests(Array.isArray(tests) ? tests : []);
      
      const initialStatus: UserTrackingStatus = {};
      const testsToProcess = Array.isArray(tests) ? tests : [];
      
      for (const test of testsToProcess) {
        const timelineResponse = await fetch(`/api/sample-test/${test.id}/timeline`);
        const timelines = await timelineResponse.json();
        
        const createdAt = timelines.length > 0 ? 
          new Date(timelines[0].testTimelineCreatedAt) : 
          new Date();
  
        initialStatus[test.id] = {
          isAdminReceived: timelines.some((t: TestTimelineData) => t.testStatus === 'RECEIVED'),
          isSupervisorProcessing: timelines.some((t: TestTimelineData) => t.testStatus === 'REVIEWING'),
          isSupervisorApproved: timelines.some((t: TestTimelineData) => t.testStatus === 'APPROVED'),
          isSupervisorRejected: timelines.some((t: TestTimelineData) => t.testStatus === 'REJECTED'),
          isLaboranTested: timelines.some((t: TestTimelineData) => t.testStatus === 'TESTED'),
          isPaymentPaid: timelines.some((t: TestTimelineData) => t.testStatus === 'PAID'),
          isFileUploaded: timelines.some((t: TestTimelineData) => t.testStatus === 'COMPLETED'),
          createdAt
        };
      }
      setTrackingStatus(initialStatus);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSampleTests([]);
    }
  };

    useEffect(() => {
        fetchInitialData();
    }, []);

    const handleStatusChange = async (testId: number, status: keyof typeof statusMapping) => {
        try {
            const response = await fetch(`/api/sample-test/${testId}/timeline`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: statusMapping[status] })
            });

            const result = await response.json();
            if (!result.success) throw new Error(result.error);

            setTrackingStatus(prev => ({
                ...prev,
                [testId]: { ...prev[testId], [status]: true }
            }));
        } catch (error) {
            console.error('Status update error:', error);
        }
    };

    const handleToggleAccordion = (testId: number) => {
        setOpenTestId(openTestId === testId ? null : testId);
    };

    const handleOpenDetail = (testId: number) => {
        setSelectedDetailId(testId);
        setIsDetailOpen(true);
    };

    const handlePopupOpen = (testId: number) => {
        setCurrentTestId(testId);
        setIsPopupOpen(true);
    };

    const handlePopupConfirm = async (testId: number, nomorPermohonan: string) => {
        try {
            await fetch(`/api/sample-test/${testId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sampleRequestNumber: nomorPermohonan })
            });

            setSampleTests(prev => prev.map(test =>
                test.id === testId ? { ...test, sampleRequestNumber: nomorPermohonan } : test
            ));

            handleStatusChange(testId, 'isAdminReceived');
            setIsPopupOpen(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const isTestFinished = (testId: number) => {
        return trackingStatus[testId]?.isFileUploaded || trackingStatus[testId]?.isSupervisorRejected;
    };

    const getStatusColor = (testId: number, status: keyof typeof statusMapping) => {
        if (trackingStatus[testId]?.[status]) return 'green';
        const prevStatus = getPreviousStatus(status);
        if (!prevStatus || trackingStatus[testId]?.[prevStatus]) return 'red';
        return 'gray';
    };

    const getPreviousStatus = (status: keyof typeof statusMapping) => {
        const statusOrder: (keyof typeof statusMapping)[] = [
            'isAdminReceived',
            'isSupervisorProcessing',
            'isSupervisorApproved',
            'isLaboranTested',
            'isPaymentPaid',
            'isFileUploaded'
        ];
        const currentIndex = statusOrder.indexOf(status);
        return currentIndex > 0 ? statusOrder[currentIndex - 1] : null;
    };

    // Handler untuk komplain
    const handleComplaintClick = (testId: number) => {
        setSelectedTestId(testId);
        setShowComplaintForm(true);
    };

    const handleComplaintSuccess = () => {
        setShowComplaintForm(false);
        fetchInitialData(); // Refresh data setelah submit komplain
    };

    const activeTests = Array.isArray(sampleTests) ? sampleTests.filter(test => !isTestFinished(test.id)) : [];
    const completedTests = Array.isArray(sampleTests) ? sampleTests.filter(test => isTestFinished(test.id)) : [];

    const renderTestCard = (test: SampleTest) => (
        <div
            className="bg-[#FAEBD7] rounded-lg border border-gray-300 w-[750px] mb-5"
            style={{
                padding: '20px',
                width: '750px',
                minHeight: '74px',
                margin: '0 auto',
                marginBottom: '20px',
            }}
        >
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h2
                        className="font-bold text-left text-[20px] cursor-pointer m-0"
                        onClick={() => handleToggleAccordion(test.id)}
                    >
                        {test.sampleRequestNumber || 'Nomor permohonan belum diterbitkan'}
                    </h2>
                    <p className="text-sm mt-1">
                        Tanggal Permohonan: {
                            trackingStatus[test.id]?.createdAt ?
                                formatDate(trackingStatus[test.id]?.createdAt) :
                                '-'
                        }
                    </p>
                    {trackingStatus[test.id]?.isSupervisorRejected && (
                        <p className="text-sm mt-1 text-red-600">Status: Ditolak</p>
                    )}
                    {trackingStatus[test.id]?.isFileUploaded && (
                        <p className="text-sm mt-1 text-green-600">Status: Selesai</p>
                    )}
                </div>
                <img
                    src="assets/ExternalLink.png"
                    alt="Open Detail"
                    className="h-8 w-10 mr-12 cursor-pointer"
                    onClick={() => handleOpenDetail(test.id)}
                />
            </div>

            {openTestId === test.id && (
                <div>
                    <div className="mt-4">
                        <StatusItem
                            color={getStatusColor(test.id, 'isAdminReceived')}
                            text="Admin Laboratorium telah menerima surat pengantar dan sampel"
                            direction="down"
                            showCheckbox={!trackingStatus[test.id]?.isAdminReceived}
                            onCheck={() => handlePopupOpen(test.id)}
                        />
                        <StatusItem
                            color={getStatusColor(test.id, 'isSupervisorProcessing')}
                            text="Sedang diproses oleh Supervisor"
                            showCheckbox={!trackingStatus[test.id]?.isSupervisorProcessing && trackingStatus[test.id]?.isAdminReceived}
                            onCheck={() => handleStatusChange(test.id, 'isSupervisorProcessing')}
                        />
                        <StatusItem
                            color={getStatusColor(test.id, 'isSupervisorApproved')}
                            text="Supervisor menyetujui analisis sampel"
                            showCheckbox={!trackingStatus[test.id]?.isSupervisorApproved && trackingStatus[test.id]?.isSupervisorProcessing}
                            onCheck={() => handleStatusChange(test.id, 'isSupervisorApproved')}
                        />
                        <StatusItem
                            color={getStatusColor(test.id, 'isLaboranTested')}
                            text="Laboran selesai melakukan proses uji dan analisis pada sampel"
                            showCheckbox={!trackingStatus[test.id]?.isLaboranTested && trackingStatus[test.id]?.isSupervisorApproved}
                            onCheck={() => handleStatusChange(test.id, 'isLaboranTested')}
                        />
                        <StatusItem
                            color={getStatusColor(test.id, 'isPaymentPaid')}
                            text="Customer perlu membayar"
                            showCheckbox={!trackingStatus[test.id]?.isPaymentPaid && trackingStatus[test.id]?.isLaboranTested}
                            onCheck={() => handleStatusChange(test.id, 'isPaymentPaid')}
                        />

                        {trackingStatus[test.id]?.isLaboranTested && (
                            <div className="mb-5 ml-6">
                                <InvoiceSection
                                    id={test.id}
                                    formType="sample-test"
                                />
                            </div>
                        )}

                        <StatusItem
                            color={getStatusColor(test.id, 'isFileUploaded')}
                            text="Admin Laboratorium telah mengunggah file hasil uji"
                            direction="up"
                            showCheckbox={!trackingStatus[test.id]?.isFileUploaded && trackingStatus[test.id]?.isPaymentPaid}
                            onCheck={() => handleStatusChange(test.id, 'isFileUploaded')}
                        />

                        {trackingStatus[test.id]?.isFileUploaded && (
                            <FileResultDownload testId={test.id} />
                        )}
                    </div>

                    <div className="mt-4" style={{ textAlign: 'right', marginRight: '12px' }}>
                        <button
                            onClick={() => handleComplaintClick(test.id)}
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
                <h2 className="text-2xl font-bold mb-4">Permohonan Analisis</h2>

                {activeTests.length > 0 && (
                    <>
                        <h3 className="text-xl mb-4">Terbaru</h3>
                        {activeTests.map((test) => (
                            <div key={test.id}>
                                {renderTestCard(test)}
                            </div>
                        ))}
                    </>
                )}

                {completedTests.length > 0 && (
                    <>
                        <h3 className="text-xl mb-4">Selesai</h3>
                        {completedTests.map((test) => (
                            <div key={test.id}>
                                {renderTestCard(test)}
                            </div>
                        ))}
                    </>
                )}

                {sampleTests.length === 0 && (
                    <p className="text-gray-500 text-center">Tidak ada permohonan analisis</p>
                )}
            </div>

            {isDetailOpen && selectedDetailId && (
                <DetailPermohonan
                    id={selectedDetailId}
                    onClose={() => setIsDetailOpen(false)}
                />
            )}

            {isPopupOpen && currentTestId && (
                <PopUpNoSurat
                    onClose={() => setIsPopupOpen(false)}
                    onConfirm={(nomorPermohonan) => handlePopupConfirm(currentTestId, nomorPermohonan)}
                />
            )}

            {showComplaintForm && selectedTestId && (
                <ComplaintForm
                    testId={selectedTestId}
                    formType="sample-test"
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

export default Tracking;