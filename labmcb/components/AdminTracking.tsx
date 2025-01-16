'use client'
import React, { useState } from 'react';
import ButtonDU from './TombolDU';

const AdminTracking: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div style={{
            backgroundColor: '#FAEBD7',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            width: '750px',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            position: 'relative', // Ensure the transition works smoothly
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
                            <button style={{ width: '35px', height: '35px', background: 'url(\'./assets/checkbox.png\') no-repeat center center', backgroundSize: 'contain', border: 'none', cursor: 'pointer' }}></button>
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
                            <button style={{ width: '35px', height: '35px', background: 'url(\'./assets/checkbox.png\') no-repeat center center', backgroundSize: 'contain', border: 'none', cursor: 'pointer' }}></button>
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
                            <button style={{ width: '35px', height: '35px', background: 'url(\'./assets/checkbox.png\') no-repeat center center', backgroundSize: 'contain', border: 'none', cursor: 'pointer' }}></button>
                            <button style={{ width: '35px', height: '35px', background: 'url(\'./assets/crossbox.png\') no-repeat center center', backgroundSize: 'contain', border: 'none', cursor: 'pointer' }}></button>
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
                            <button style={{ width: '35px', height: '35px', background: 'url(\'./assets/checkbox.png\') no-repeat center center', backgroundSize: 'contain', border: 'none', cursor: 'pointer' }}></button>
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
                            <button style={{ width: '35px', height: '35px', background: 'url(\'./assets/checkbox.png\') no-repeat center center', backgroundSize: 'contain', border: 'none', cursor: 'pointer' }}></button>
                        </div>
                    </div>
                    <div style={styles.paymentSection}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                        }}>
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
                            <button style={{ width: '35px', height: '35px', background: 'url(\'./assets/checkbox.png\') no-repeat center center', backgroundSize: 'contain', border: 'none', cursor: 'pointer' }}></button>
                        </div>
                    </div>
                    <div style={styles.finalStep}>
                            <ButtonDU text="File Uji Sample" variant="primary"/>
                    </div>
                </div>
            )}
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