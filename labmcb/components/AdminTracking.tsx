import React, { useState, useEffect } from 'react';
import ButtonDU from './TombolDU';
import PopUpNoSurat from '@/components/PopUpNoSurat';
import DetailPermohonan from '@/components/DetailPermohonanPopup';
import FileUploadAdmin from './FileUploadAdmin';
import FileDownloadAdmin from './FileDownloadAdmin';
import ComplaintAdmin from './PopUpKomplainAdmin';
import type { SampleTest, TestTimelineData, AdminTrackingStatus } from '../types';

const statusMapping = {
  isAdminReceived: 'RECEIVED',
  isSupervisorProcessing: 'REVIEWING',
  isSupervisorApproved: 'APPROVED',
  isSupervisorRejected: 'REJECTED',
  isLaboranTested: 'TESTED',
  isPaymentPaid: 'PAID',
  isFileUploaded: 'COMPLETED'
} as const;

const AdminTracking: React.FC = () => {
  const [sampleTests, setSampleTests] = useState<SampleTest[]>([]);
  const [openTestId, setOpenTestId] = useState<number | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);
  const [trackingStatus, setTrackingStatus] = useState<AdminTrackingStatus>({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [currentTestId, setCurrentTestId] = useState<number | null>(null);

  // Helper function to check if a test is completed or rejected
  const isTestFinished = (testId: number) => {
    return trackingStatus[testId]?.isFileUploaded || trackingStatus[testId]?.isSupervisorRejected;
  };

  // Filter tests into active and completed
  const activeTests = sampleTests.filter(test => !isTestFinished(test.id));
  const completedTests = sampleTests.filter(test => isTestFinished(test.id));


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const testsResponse = await fetch('/api/sample-test');
        const tests = await testsResponse.json();
        setSampleTests(tests);

        const initialStatus: AdminTrackingStatus = {};
        for (const test of tests) {
          const timelineResponse = await fetch(`/api/sample-test/${test.id}/timeline`);
          const timelines = await timelineResponse.json();

          initialStatus[test.id] = {
            isAdminReceived: timelines.some((t: TestTimelineData) => t.testStatus === 'RECEIVED'),
            isSupervisorProcessing: timelines.some((t: TestTimelineData) => t.testStatus === 'REVIEWING'),
            isSupervisorApproved: timelines.some((t: TestTimelineData) => t.testStatus === 'APPROVED'),
            isSupervisorRejected: timelines.some((t: TestTimelineData) => t.testStatus === 'REJECTED'),
            isLaboranTested: timelines.some((t: TestTimelineData) => t.testStatus === 'TESTED'),
            isPaymentPaid: timelines.some((t: TestTimelineData) => t.testStatus === 'PAID'),
            isFileUploaded: timelines.some((t: TestTimelineData) => t.testStatus === 'COMPLETED'),
          };
        }
        setTrackingStatus(initialStatus);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

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
        [testId]: {
          ...prev[testId],
          [status]: true,
          // Reset subsequent statuses if rejected
          ...(status === 'isSupervisorRejected' && {
            isLaboranTested: false,
            isPaymentPaid: false,
            isFileUploaded: false
          })
        }
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

  const renderStatusRow = (
    testId: number,
    status: keyof typeof statusMapping,
    text: string,
    condition: boolean,
    prevStatus?: keyof typeof statusMapping
  ) => {
    const canUpdate = prevStatus ? trackingStatus[testId]?.[prevStatus] : true;
    const isCompleted = trackingStatus[testId]?.[status];
    const isRejected = trackingStatus[testId]?.isSupervisorRejected;

    // Special render for supervisor approval step
    if (status === 'isSupervisorApproved') {
      return (
        <div className="flex items-center justify-between mb-3">
          <span className="text-base font-normal">{text}</span>
          {!isCompleted && !isRejected && canUpdate && (
            <div className="flex items-center gap-4 mr-12">
              <button
                className="w-8 h-8 bg-center bg-no-repeat bg-contain border-none cursor-pointer"
                style={{ backgroundImage: "url('./assets/checkbox.png')" }}
                onClick={() => handleStatusChange(testId, 'isSupervisorApproved')}
              />
              <button
                className="w-8 h-8 bg-center bg-no-repeat bg-contain border-none cursor-pointer"
                style={{ backgroundImage: "url('./assets/crossbox.png')" }}
                onClick={() => handleStatusChange(testId, 'isSupervisorRejected')}
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
                handlePopupOpen(testId);
              } else {
                handleStatusChange(testId, status);
              }
            }}
          />
        )}
      </div>
    );
  };

  const renderTestCard = (test: SampleTest) => (
    <div key={test.id} className="bg-[#FAEBD7] p-5 rounded-lg border border-gray-300 w-[750px] mb-5 relative">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="font-bold text-left text-[20px] cursor-pointer m-0" onClick={() => handleToggleAccordion(test.id)}>
            {test.testName}
          </h2>
          <p className="text-sm mt-1">Nomor Permohonan Analisis: {test.sampleRequestNumber}</p>
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
        <>
          <div className="mt-4">
            {renderStatusRow(test.id, 'isAdminReceived', 'Admin Laboratorium telah menerima surat pengantar dan sampel', false)}
            {renderStatusRow(test.id, 'isSupervisorProcessing', 'Sedang diproses oleh Supervisor', false, 'isAdminReceived')}
            {renderStatusRow(test.id, 'isSupervisorApproved', 'Supervisor menyetujui analisis sampel', false, 'isSupervisorProcessing')}
            {renderStatusRow(test.id, 'isLaboranTested', 'Laboran selesai melakukan proses uji dan analisis pada sampel', false, 'isSupervisorApproved')}
            {renderStatusRow(test.id, 'isPaymentPaid', 'Customer perlu membayar', false, 'isLaboranTested')}
   
            {trackingStatus[test.id]?.isLaboranTested && (
              <div className="mb-5">
                <div className="flex gap-4">
                  <FileDownloadAdmin
                    id={test.id}
                    buttonText="Download Bukti Pembayaran" 
                    fileType="paymentProof"
                    formType="sample-test"
                  />
                  <FileUploadAdmin
                    id={test.id}
                    buttonText="Unggah Invoice"
                    uploadPreset="labmcbpreset"
                    folder="invoice"
                    fileType="invoice"
                    formType="sample-test"
                  />
                </div>
              </div>
            )}
   
            {renderStatusRow(test.id, 'isFileUploaded', 'Admin Laboratorium telah mengunggah file hasil uji', false, 'isPaymentPaid')}
   
            {trackingStatus[test.id]?.isPaymentPaid && (
              <div className="mb-5">
                <FileUploadAdmin
                  id={test.id}
                  buttonText="Upload File Uji"
                  uploadPreset="labmcbpreset"
                  folder="test_results"
                  fileType="result"
                  formType="sample-test"
                />
              </div>
            )}
          </div>
          
          <div className="absolute bottom-4 right-4">
            <ComplaintAdmin
              formId={test.id}
              formType="sample-test"
            />
          </div>
        </>
      )}
    </div>
   );
   
  return (
    <div className="flex justify-center items-center">
      <div className="w-3/5 px-6 py-4">
        <h2 className="text-2xl font-bold mb-4">Permohonan Analisis</h2>

        {activeTests.length > 0 && (
          <>
            <h3 className="text-xl mb-4">Terbaru</h3>
            {activeTests.map((test) => (
              <div key={test.id}>  {/* Tambahkan key di sini */}
                {renderTestCard(test)}
              </div>
            ))}
          </>
        )}

        {completedTests.length > 0 && (
          <>
            <h3 className="text-xl mb-4">Selesai</h3>
            {completedTests.map((test) => (
              <div key={test.id}>  {/* Tambahkan key di sini */}
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
    </div>
  );
}
export default AdminTracking;