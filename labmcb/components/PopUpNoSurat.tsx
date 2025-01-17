import React, { useState } from 'react';

interface PopupProps {
  onClose: () => void;
  onConfirm: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose, onConfirm }) => {
  const [nomorPermohonan, setNomorPermohonan] = useState('');

  // Fungsi konfirmasi untuk memproses nomor permohonan
  const handleConfirm = () => {
    console.log('Nomor Permohonan:', nomorPermohonan);
    onConfirm(); // Panggil onConfirm untuk aksi setelah konfirmasi
    onClose(); // Tutup popup setelah konfirmasi
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'left',
            marginBottom: '10px',
          }}
        >
          Masukkan Nomor Permohonan
        </h2>
        <input
          type="text"
          value={nomorPermohonan}
          onChange={(e) => setNomorPermohonan(e.target.value)}
          style={styles.input}
        />
        <div style={styles.buttonsContainer}>
          <button onClick={handleConfirm} style={styles.button}>
            Konfirmasi
          </button>
          <button onClick={onClose} style={styles.button}>
            Batal
          </button>
        </div>
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
    zIndex: 999,
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
    marginRight: '10px', // Menambahkan jarak antar tombol
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end', // Mengatur tombol agar sejajar di sebelah kanan
    gap: '10px', // Menambah jarak antar tombol
  },
};

export default Popup;
