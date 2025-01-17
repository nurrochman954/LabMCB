'use client'
import React, { useState } from 'react';
import ButtonDU from './TombolDU';
import PopUpNoSurat from '@/components/PopUpNoSurat'
const AdminTracking: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [isButtonVisibleSupervisor, setIsButtonVisibleSupervisor] = useState(true);
    const [areButtonsSupervisorAccepted, setAreButtonsSupervisorAccepted] = useState(true);
    const [isButtonVisiblelaboran, setIsButtonVisibleLaboran] = useState(true);
    const [isButtonCustomer, setIsButtonCustomer] = useState(true);
    const [isButtonFile, SetIsButtonFile] = useState (true);
    const toggleAccordion = () => {
        setIsOpen(prev => !prev);
 };
        
  // Fungsi untuk membuka popup
  const handleOpenPopup = () => setIsPopupOpen(true);
  
  // Fungsi untuk menutup popup
  const handleClosePopup = () => setIsPopupOpen(false);

  const handlePopupConfirm = () => {
    setIsButtonVisible(false);  // Menyembunyikan tombol setelah konfirmasi
    handleClosePopup(); // Menutup popup setelah konfirmasi
    


        };
        const handleSupervisorChecked = () => {
            setIsButtonVisibleSupervisor(false); // Menyembunyikan tombol setelah dipilih
        };

        const handleSupervisorAccepted = () => {
            setAreButtonsSupervisorAccepted(false); // Menyembunyikan kedua tombol (checkbox dan crossbox)
        };

        const handleLaboran = () => {
            setIsButtonVisibleLaboran(false);
        };

        const handleCustomer = () => {
            setIsButtonCustomer (false)
        };

        const handleFile = () => {
            SetIsButtonFile(false)
        };

    return (
        <div className="flex justify-center items-center">
            <div className="w-3/5 px-6 py-4">
            <h2 className="text-2xl font-bold mb-4">Permohonan Analisis dan Penyewaan Alat</h2>
            <h3 className="text-xl  mb-4">Terbaru</h3>
         <div style={{
            backgroundColor: '#FAEBD7',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            width: '750px',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            position: 'relative',
            marginBottom : '20px' // Ensure the transition works smoothly
        }}>
            <h2
                style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    textAlign: 'left',
                    margin: 0,
                    cursor: 'pointer',
                }}
                onClick={toggleAccordion}
            >
                Athaya Harmana Putri
            </h2>
            <p style={styles.Nomor}>Nomor Permohonan Analisis : XXXXXXX</p>

            {isOpen && (
                <div style={{ marginTop: '10px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between', // Mengatur jarak antara teks dan ikon
                        marginBottom: '10px',
                         }}>
                        <span style={{ fontSize: '16px', fontWeight: 'normal' }}>
                            Admin Laboratorium telah menerima surat pengantar dan sampel
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '50px' }}>
                                    {isButtonVisible && ( // Tombol hanya muncul jika isButtonVisible true
                                        <button style={{ width: '35px', height: '35px', background: 'url(\'./assets/checkbox.png\') no-repeat center center', backgroundSize: 'contain', border: 'none', cursor: 'pointer' }}
                                            onClick={handleOpenPopup}
                                        ></button>
                                    )}
                                    {isPopupOpen && <PopUpNoSurat onClose={handleClosePopup} onConfirm={handlePopupConfirm} />}
                                </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        justifyContent: 'space-between', // Mengatur jarak antara teks dan ikon
                         }}>
                        <span style={{ fontSize: '16px', fontWeight: 'normal' }}>
                            Sedang diproses oleh Supervisor
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '50px' }}>
                        {isButtonVisibleSupervisor && ( // Tombol hanya muncul jika isButtonVisible true
                                        <button style={{ width: '35px', height: '35px', background: 'url(\'./assets/checkbox.png\') no-repeat center center', backgroundSize: 'contain', border: 'none', cursor: 'pointer' }}
                                        onClick={handleSupervisorChecked}
                                        ></button>
                                    )}            
                    </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        justifyContent: 'space-between', // Mengatur jarak antara teks dan ikon
                         }}>
                        <span style={{ fontSize: '16px', fontWeight: 'normal' }}>
                        Supervisor menyetujui analisis sampel
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    {areButtonsSupervisorAccepted && (
                                        <button 
                                            style={{ 
                                                width: '35px', 
                                                height: '35px', 
                                                background: 'url(\'./assets/checkbox.png\') no-repeat center center', 
                                                backgroundSize: 'contain', 
                                                border: 'none', 
                                                cursor: 'pointer' 
                                            }}
                                            onClick={handleSupervisorAccepted} // Menambahkan event handler yang benar
                                        ></button>
                                    )}
                                    {areButtonsSupervisorAccepted && (
                                        <button 
                                            style={{ 
                                                width: '35px', 
                                                height: '35px', 
                                                background: 'url(\'./assets/crossbox.png\') no-repeat center center', 
                                                backgroundSize: 'contain', 
                                                border: 'none', 
                                                cursor: 'pointer' 
                                            }}
                                            onClick={handleSupervisorAccepted} // Menambahkan event handler yang benar
                                        ></button>
                                    )}
                                </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        justifyContent: 'space-between', // Mengatur jarak antara teks dan ikon
                         }}>
                        <span style={{ fontSize: '16px', fontWeight: 'normal' }}>
                        Laboran melakukan proses uji dan analisis pada sampel
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '50px' }}>
                        {isButtonVisiblelaboran && (
                            <button style={{ width: '35px', height: '35px', background: 'url(\'./assets/checkbox.png\') no-repeat center center', backgroundSize: 'contain', border: 'none', cursor: 'pointer' }}
                            onClick={handleLaboran}
                            ></button>
                        )}
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        justifyContent: 'space-between', 
                         }}>
                        <span style={{ fontSize: '16px', fontWeight: 'normal' }}>
                        Customer perlu membayar
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '50px' }}>
                            {isButtonCustomer && (
                            <button style={{ width: '35px', height: '35px', background: 'url(\'./assets/checkbox.png\') no-repeat center center', backgroundSize: 'contain', border: 'none', cursor: 'pointer' }}
                                onClick = {handleCustomer}
                            ></button>
                            )}
                        </div>
                    </div>
                    <div style={{
                            marginBottom: '20px',
                            }}>
                        <div style={styles.paymentSection}>
                            <ButtonDU text="Download Bukti Pembayaran" variant="secondary" />
                            <ButtonDU text="Unggah Invoice" variant="primary"/>
                        </div>
                    </div>
                        
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        justifyContent: 'space-between', // Mengatur jarak antara teks dan ikon
                         }}>
                        <span style={{ fontSize: '16px', fontWeight: 'normal' }}>
                        Admin Laboratorium telah menerima surat pengantar dan sample
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '50px' }}>
                            {isButtonFile && ( 
                            <button style={{ width: '35px', height: '35px', background: 'url(\'./assets/checkbox.png\') no-repeat center center', backgroundSize: 'contain', border: 'none', cursor: 'pointer' }}
                                onClick ={handleFile}
                            ></button>
                            )}
                        </div>
                    </div>
                    <div style={styles.finalStep}>
                            <ButtonDU text="File Uji Sample" variant="primary"/>
                    </div>
                </div>
            )}
        </div>
        <h3 className="text-xl  mb-4">Selesai</h3>
        </div>
        
        </div>
    );
};

const StatusItem: React.FC<{ text: string}> = ({ text }) => (
    <div style={styles.statusItem}>
        <span style={styles.text}>{text}</span>
    </div>
);

const styles: {[key:string]: React.CSSProperties} = {
    Nomor: {
    marginBottom: '20px',
    fontSize: '18px',
},

status: {
    marginBottom: '20px',
    fontSize: '16px',
},

statusItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0',
},
finalStep: {
    marginBottom: '20px',
},

paymentSection: {
    marginBottom: '20px', 
    gap: '20px',
    display: 'flex',
},

text: {
    flexGrow: 1,
},

iconButton: {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    padding: 0,
},
}

export default AdminTracking;