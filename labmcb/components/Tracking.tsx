import React from 'react';

const NomorPenyewaan = () => {
  return (
    <div
      style={{
        backgroundColor: '#FAEBD7', // Warna krem
        padding: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '1208px',
        height : '605px', // Lebar kotak
        margin: '20px auto', // Centering the box
      }}
    >
       <h2
        style={{
          fontWeight: 'bold',
          fontSize: '24px',
          margin: '0 0 10px 0',
        }}
      >
        Nomor Penyewaan
      </h2>
      <p
        style={{
          margin: '0 0 20px 0',
        }}
      >
        Tanggal Peminjaman: 23 Januari 2025
      </p>

      <div style={{ marginTop: '10px' }}>
        {renderStatus('Admin Laboratorium telah menerima surat perjanjian kerja sama/MOU', 'success')}
        {renderStatus('Sedang diproses oleh Manager ISO', 'pending')}
        {renderStatus('Manager ISO menyetujui analisis sampel', 'success')}
        {renderStatus('Customer perlu membayar', 'pending', true)}
        {renderStatus('Proses Pengiriman', 'pending')}
        {renderStatus('Proses Pengembalian', 'pending')}
        {renderStatus('Pengembalian alat-alat berhasil', 'success')}
      </div>

      <p
        style={{
          marginTop: '20px',
          color: 'blue',
          cursor: 'pointer',
        }}
      >
        Ajukan pengaduan
      </p>
    </div>
  );
};

const renderStatus = (text: string, status: 'success' | 'failure' | 'pending', showButtons?: boolean) => {
  let color;
  if (status === 'success') {
    color = 'green'; // Sukses
  } else if (status === 'failure') {
    color = 'red'; // Gagal
  } else {
    color = 'lightgray'; // Belum diproses
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <span
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: color,
          borderRadius: '50%',
          marginRight: '10px',
        }}
      ></span>
      <span>{text}</span>
      {showButtons && (
        <div style={{ marginLeft: '10px' }}>
          <button
            style={{
              backgroundColor: 'lightgray',
              border: 'none',
              borderRadius: '5px',
              padding: '5px 10px',
              cursor: 'pointer',
              marginRight: '5px',
            }}
          >
            <img src="/path/to/download-icon.png" alt="Download" style={{ width: '16px', height: '16px', marginRight: '5px' }} />
            Invoice
          </button>
          <button
            style={{
              backgroundColor: '#20B2AA', // Warna untuk tombol unggah
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            <img src="/path/to/upload-icon.png" alt="Upload" style={{ width: '16px', height: '16px', marginRight: '5px' }} />
            Unggah Bukti Pembayaran
          </button>
        </div>
      )}
    </div>
  );
};

export default NomorPenyewaan;