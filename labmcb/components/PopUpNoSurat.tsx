import React, { useState } from 'react';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  const [nomorPermohonan, setNomorPermohonan] = useState('');

  const handleConfirm = () => {
    // Logika untuk memproses nomor permohonan
    console.log('Nomor Permohonan:', nomorPermohonan);
    onClose(); // Kembali ke halaman awal
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2>Masukkan nomor permohonan</h2>
        <input
          type="text"
          value={nomorPermohonan}
          onChange={(e) => setNomorPermohonan(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleConfirm} style={styles.button}>
          Konfirmasi
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    background: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Popup;
