'use client'
import React, { useState } from 'react';

const Tracking: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div style={{
            backgroundColor: '#FAEBD7', // Warna krem
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            width: '750px',
            height: isOpen ? 'auto' : '74px', // Adjust height based on state
            margin: '10px auto',
            transition: 'height 0.3s ease', // Smooth transition
        }}>
            <h2
                style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    textAlign: 'left',
                    margin: 0,
                    cursor: 'pointer',
                }}
                onClick={toggleAccordion} // Toggle on click
            >
                Nomor Permohonan
            </h2>

            {isOpen && ( // Conditionally render the tracking information
                <div style={{ marginTop: '10px' }}>
                    <p style={styles.date}>Tanggal Permohonan: 23 Januari 2025</p>

                    <div style={styles.status}>
                        <StatusItem color="green" text="Admin Laboratorium telah menerima surat pengantar dan sampel" />
                        <StatusItem color="green" text="Sedang diproses oleh Supervisor" />
                        <StatusItem color="green" text="Supervisor menyetujui analisis sampel" />
                        <StatusItem color="gray" text="Customer perlu membayar" />
                        
                        <div style={styles.paymentSection}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px', // Jarak antara tombol
                            }}>
                                <button
                                    style={{
                                        backgroundImage: `url(/assets/downloadinvoicepng.png)`,
                                        backgroundSize: '35px 25px',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'left',
                                        backgroundColor: 'white',
                                        color: 'black',
                                        padding: '10px 0px 10px 20px',
                                        border: '3px solid #50BCB8',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        width: '95px',
                                        height: '38px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
                                    }}
                                >
                                    Invoice
                                </button>
                                <button
                                    style={{
                                        backgroundImage: `url(/assets/UnggahTFpng.png)`,
                                        backgroundSize: '35px 25px',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'left',
                                        backgroundColor: '#50BCB8',
                                        color: 'white',
                                        padding: '10px 0px 10px 20px',
                                        border: '3px solid #50BCB8',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        width: '240px',
                                        height: '38px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
                                    }}
                                >
                                    Unggah Bukti Pembayaran
                                </button>
                            </div>
                        </div>

                        <StatusItem color="gray" text="Hasil Uji Sampel" />
                        <div style={styles.finalStep}>
                            <button
                                style={{
                                    backgroundImage: `url(/assets/downloadinvoicepng.png)`,
                                    backgroundSize: '35px 25px',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'left',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    padding: '10px 0px 10px 20px',
                                    border: '3px solid #50BCB8',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    width: '160px',
                                    height: '38px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                File Uji Sampel
                            </button>
                        </div>
                    </div>

                    <div style={styles.footer}>
                        <button style={{
                            color: 'grey',
                            marginLeft: '550px',
                        }}>
                            Ajukan Pengaduan
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatusItem: React.FC<{ color: string; text: string }> = ({ color, text }) => (
    <div style={styles.statusItem}>
        <div style={{ ...styles.dot, backgroundColor: color }}></div>
        <span style={styles.text}>{text}</span>
    </div>
);

const styles: { [key: string]: React.CSSProperties } = {
    title: {
        marginBottom: '10px',
        fontSize: '20px',
        fontWeight: 'bold',
    },
    date: {
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
    dot: {
        height: '12px',
        width: '12px',
        borderRadius: '50%',
        marginRight: '10px',
    },
    text: {
        flexGrow: 1,
    },
    paymentSection: {
        marginBottom: '20px',
    },
    finalStep: {
        marginBottom: '20px',
    },
    footer: {
        marginTop: '20px',
    },
};

export default Tracking;
