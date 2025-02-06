// components/ComplaintAdmin.tsx
import React, { useState, useEffect } from 'react';

interface Complaint {
  id: number;
  complaintDescription: string;
  complaintCreateAt: string;
}

interface ComplaintAdminProps {
  formId: number;
  formType: 'sample-test' | 'equipment-rental';
}

const ComplaintAdmin: React.FC<ComplaintAdminProps> = ({ formId, formType }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [hasComplaints, setHasComplaints] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const formatComplaintDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year}, ${hours}:${minutes} WIB`;
  };

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`/api/complaints/${formType}/${formId}`);
      const data = await response.json();
      if (data.success) {
        setComplaints(data.data);
        setHasComplaints(data.data.length > 0);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [formId, formType]);

  const ComplaintPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Daftar Pengaduan</h2>
          <button
            onClick={() => setShowPopup(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {complaints.length > 0 ? (
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {complaints.map(complaint => (
              <div key={complaint.id} className="bg-[#D9D9D9] rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-2">
                  {formatComplaintDate(complaint.complaintCreateAt)}
                </p>
                <p>{complaint.complaintDescription}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Tidak ada pengaduan</p>
        )}
      </div>
    </div>
  );

  return hasComplaints ? (
    <>
      <div 
        className="absolute bottom-4 left-4 flex items-center cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        <img 
          src="/assets/complaintPic.png" 
          alt="Complaint"
          className="w-6 h-6 mr-2"
        />
        <span className="text-red-500 text-sm">Ada Pengaduan</span>
      </div>

      {showPopup && <ComplaintPopup />}
    </>
  ) : null;
};

export default ComplaintAdmin;