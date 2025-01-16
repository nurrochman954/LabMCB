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
      <h2
      style={{
        fontSize: '18px', // Ukuran font
        fontWeight: 'bold', // Ketebalan font
        color: 'black', // Warna teks
        textAlign: 'left', // Rata tengah
        marginBottom: '10px'
         // Font keluarga
      }}
    >
      Masukkan Nomor Permohonan
      </h2>
        <input
          type="text"
          value={nomorPermohonan}
          onChange={(e) => setNomorPermohonan(e.target.value)}
          style={styles.input}
          className=' '
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
      borderRadius: '14px',
      width: '600px',
      
    },
  
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '15px',
      borderRadius: '4px',
      backgroundColor: '#D9D9D9',
      fontSize: '16px',
    },
    button: {
      backgroundColor: '#00AFB9',
      color: '#fff',
      padding: '10px 15px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s',
       boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
       marginLeft: '453px'
    },
  };
  

export default Popup;
