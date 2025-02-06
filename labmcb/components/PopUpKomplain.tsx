import React, { useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`}>
      {message}
    </div>
  );
};

interface ComplaintFormProps {
  testId: number;
  formType: 'sample-test' | 'equipment-rental';
  onClose: () => void;
  onSubmitSuccess: () => void;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ 
  testId,
  formType, 
  onClose, 
  onSubmitSuccess 
}) => {
  const [complaint, setComplaint] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleSubmit = async () => {
    if (!complaint.trim()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/complaints/${formType}/${testId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: complaint
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit complaint');
      }
      
      setNotification({
        message: 'Pengaduan berhasil dikirim',
        type: 'success'
      });
      
      setTimeout(() => {
        onSubmitSuccess();
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setNotification({
        message: 'Gagal mengirim pengaduan. Silakan coba lagi.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <div className="flex items-center mb-4">
          <img
            src="/assets/Complaintpic.png"
            alt="Komplain"
            className="w-10 h-10 mr-2"
          />
          <h2 className="text-xl font-semibold text-[#AF362D] ml-2">
            Ajukan Pengaduan
          </h2>
        </div>
        <div className="bg-[#D9D9D9] w-[350px] h-[150px] rounded-[14px] mb-4">
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Tulis pengaduan Anda"
            className="w-full h-full p-3 bg-transparent border-none resize-none text-[16px] focus:outline-none rounded-[14px]"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-white text-[#A09E9E] px-4 py-2 border-2 border-[#A09E9E] text-[16px] rounded-[14px] w-[120px] h-[40px] flex items-center justify-center ml-auto"
            disabled={isSubmitting}
          >
            Tutup
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !complaint.trim()}
            className="bg-[#50BCB8] text-white px-4 py-2 rounded-[14px] w-[120px] h-[40px] flex items-center justify-center shadow-2xl ml-3 disabled:opacity-50"
            style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)' }}
          >
            {isSubmitting ? 'Mengirim...' : 'Selesai'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;