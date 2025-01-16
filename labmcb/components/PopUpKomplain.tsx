import React from 'react';

interface ComplaintPopupProps {
  onClose: () => void;
}

const ComplaintPopup: React.FC<ComplaintPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <div className="flex items-center mb-4">
          <img
            src="assets/Complaintpic.png" // Ganti dengan path gambar Anda
            alt="Komplain"
            className="w-10 h-10 mr-2"
          />
          <h2 className="text-xl font-semibold text-[#AF362D] ml-2">
            Pengerjaan uji sampel memakan waktu terlalu lama
          </h2>
        </div>
        <div className="bg-[#D9D9D9] w-[350px] h-[150px] rounded-[14px] mb-4">
        <div className="text-[16px] text-left p-3">
    <p>
      Hasil uji diperlukan untuk tanggal xxx namun hasil lab belum juga
      diterima melalui email.
    </p>
  </div>
</div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-white text-[#A09E9E] px-4 py-2 border-2 border-[#A09E9E] text-[16px] rounded-[14px] w-[120px] h-[40px] flex items-center justify-center ml-auto"
          >
            Tutup
          </button>
          <button
            onClick={onClose}
            className="bg-[#50BCB8] text-white px-4 py-2 rounded-[14px] w-[120px] h-[40px] flex items-center justify-center shadow-2xl ml-3"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintPopup;
