'use client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import React, { useState } from 'react';

const EquipmentRentalForm: React.FC = () => {
  
     const [orders, setOrders] = useState([{ id: 1, quantity: 1 }]); // State to hold orders
     const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
     const [orderToDelete, setOrderToDelete] = useState<number | null>(null); // Track which order to delete
     const [selectedAlat, setSelectedAlat] = useState<string>("");
     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          console.log(`File yang dipilih: ${file.name}`);
        }
      };
    
      const handleSubmit = () => {
        // Logika untuk mengirim file
        console.log('File dikirim');
      };
      const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAlat(event.target.value); // Mengupdate state dengan nilai yang dipilih
      };

     const addOrder = () => {
        const newOrder = { id: orders.length + 1, quantity: 1 };
        setOrders([...orders, newOrder]); // Add new order
      };

      const increaseCount = (id: number) => {
        setOrders(orders.map(order => order.id === id ? { ...order, quantity: order.quantity + 1 } : order));
      };
    
      const decreaseCount = (id: number) => {
        setOrders(orders.map(order => order.id === id && order.quantity > 1 ? { ...order, quantity: order.quantity - 1 } : order));
      };

      const confirmDelete = (id: number) => {
        setOrderToDelete(id);
        setShowPopup(true);
      };
    
      const deleteOrder = () => {
        if (orderToDelete !== null) {
          setOrders(orders.filter(order => order.id !== orderToDelete));
          setShowPopup(false);
          setOrderToDelete(null);
        }
      };
    
      const cancelDelete = () => {
        setShowPopup(false);
        setOrderToDelete(null);
      };

      
        const [phoneNumber, setPhoneNumber] = useState('');
      
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          // Mengizinkan hanya angka
          if (/^[0-9]*$/.test(value)) {
            setPhoneNumber(value);
          }
        };

    return (
        <>
          <Header />
          <TopBar />
    
          <div style={{ padding: '80px', maxWidth: '900px', margin: 'auto', fontFamily: 'Lato, sans-serif' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
              Formulir Penyewaan Alat
            </h1>
    
            <h2 style={{ fontSize: '22px', marginBottom: '10px', fontWeight: 'bold' }}>Isi Data Diri</h2>
            
            <label style={{ fontSize: '18px',display: 'block', marginBottom: '10px', marginTop: '20px' }}>Nama Lengkap</label>
            <input
              type="text"
              style={{
                width: '713px',
                height: '45px',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '10px',
                border: '1px solid #C6C6C6',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
              }}
            />
    
            <label style={{fontSize: '18px', display: 'block', marginBottom: '10px', marginTop: '20px' }}>Email</label>
            <input
              type="text"
              style={{
                width: '713px',
                height: '45px',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '10px',
                border: '1px solid #C6C6C6',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
              }}
            />
    
            <label style={{ fontSize: '18px', display: 'block', marginBottom: '10px', marginTop: '20px' }}>No Telepon</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={handleInputChange}
                style={{
                  width: '713px',
                  height: '45px',
                  padding: '10px',
                  marginBottom: '15px',
                  borderRadius: '10px',
                  border: '1px solid #C6C6C6',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
                }}
              />

    
            <label style={{fontSize: '18px', display: 'block', marginBottom: '10px', marginTop: '20px' }}>Alamat</label>
            <textarea
              style={{
                width: '713px',
                minHeight: '45px',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '10px',
                border: '1px solid #C6C6C6',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />
    
            <label style={{ fontSize: '18px',display: 'block', marginBottom: '10px', marginTop: '20px' }}>Asal Instansi</label>
            <input
              type="text"
              style={{
                width: '713px',
                height: '45px',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '10px',
                border: '1px solid #C6C6C6',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
              }}
            />

<label style={{ fontSize: '18px', display: 'block', marginBottom: '10px' , marginTop: '20px'}}>Tanggal Penyewaan</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="date"
              style={{
                width: '325px',
                height: '45px',
                padding: '5px',
                marginRight: '20px',
                borderRadius: '10px',
                border: '1px solid #C6C6C6',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
              }}
            />
            <span style={{ fontSize: '18px', marginRight: '20px' }}>s.d.</span>
            <input
              type="date"
              style={{
                width: '325px',
                height: '45px',
                padding: '5px',
                borderRadius: '10px',
                border: '1px solid #C6C6C6',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
              }}
            />
          </div>

                <div style={{ borderBottom: '1px solid #C6C6C6', margin: '20px 0', width: '720px' }} />
                <h2 style={{ fontSize: '22px', marginBottom: '10px', fontWeight: 'bold' }}>Order Penyewaan Alat</h2>
                
                {orders.map(order => (
        <div key={order.id} style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '18px', display: 'block', marginBottom: '5px', marginTop: '20px' }}>Nama Alat</label>
          <select
            style={{
              width: '713px',
              height: '45px',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '10px',
              border: '1px solid #C6C6C6',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
            }}
            value={selectedAlat} // Menggunakan value untuk mengatur nilai yang dipilih
            onChange={handleSelectChange} // Menangani perubahan nilai
          >
            <option value="" disabled >Pilih Alat</option>
            <option value="alat1">XRF Handheld</option>
            <option value="alat2">Microdrill/DRMS</option>
            <option value="alat3">UPV (Ultrasonic Pulse Velocity)</option>
            <option value="alat4">Thermal Camera</option>
            <option value="alat5">Schmidt Hammer</option>
          </select>

          <label style={{ fontSize: '18px', display: 'block', marginBottom: '5px', marginTop: '20px'}}>Kuantitas</label>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <button
              onClick={() => decreaseCount(order.id)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                border: '1px solid #C6C6C6',
                marginRight: '10px',
              }}
            >
              -
            </button>
            <span style={{ fontSize: '18px', marginRight: '10px' }}>{order.quantity}</span>
            <button
              onClick={() => increaseCount(order.id)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                border: '1px solid #C6C6C6',
              }}
            >
              +
            </button>
          </div>

         
        <div style={{ marginRight: '30px' }}> {/* Adjust margin as needed */}
            <button
            onClick={() => confirmDelete(order.id)}
            style={{
                backgroundColor: 'white',
                color: '#E03838',
                padding: '5px 10px',
                border: '1px solid #E038B9',
                borderRadius: '5px',
                cursor: 'pointer',
              fontSize: '16px'
            }}
            >
            Hapus
            </button>
        </div>
          </div>
        </div>
      ))}
 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
<button
        onClick={addOrder}
        style={{
          color: 'black',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          alignItems: 'center'
        }}
      >
        + Tambah Pesanan
      </button>
      </div>  
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
        }}>
          <h3>Apakah Anda yakin ingin menghapus?</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button
              onClick={cancelDelete}
              style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Tidak
            </button>
            <button
              onClick={deleteOrder}
              style={{
                backgroundColor: '#00AFB9',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Ya
            </button>
          </div>
        </div>
      )}

        <div style={{ borderBottom: '1px solid #C6C6C6', margin: '20px 0', width: '720px' }} />
        <h2 style={{ fontSize: '22px', marginBottom: '10px', fontWeight: 'bold' }}>Unggah Surat Perjanjian</h2>
        <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        style={{ display: 'none' }} // Menyembunyikan input file asli
      />
      <label htmlFor="file-upload">
        <button
          style={{
            backgroundImage: `url(/assets/unggah.png)`,
            backgroundSize: '36px 38px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left',
            color: '#00AFB9',
            padding: '10px 0px 10px 20px',
            border: '1px solid #00AFB9',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '18px',
            width: '130px',
            height: '43px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Pilih File
        </button>
      </label>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#00AFB9',
          color: 'white',
          padding: '5px 20px',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '20px',
          width : '150px', 
          height : '50px',
          textAlign: 'center', // Memastikan teks berada di tengah
          lineHeight: '30px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
        }}
      >
        Kirim
      </button>
      </div>
    </div>
    
            
          
          
          <Footer />
        </>
      );
    };
    
    export default EquipmentRentalForm;