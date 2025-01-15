import React from 'react';

const UnduhSurat = () => {
    return (
        <button className="bg-secondary text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#0081A7]" style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <img src="/assets/Download.png" alt="Download" className="inline-block w-5 h-5 mr-2" />
            Unduh File Surat Pengantar
        </button>
      
    );
};

export default UnduhSurat;
