'use client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import React, { useState } from 'react';

const SampleRequestForm: React.FC = () => {
  const [sampleCount, setSampleCount] = useState(0); // State untuk menyimpan jumlah sampel
  const [selectedMethod, setSelectedMethod] = useState('');
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value);
  };

  const increaseCount = () => {
    setSampleCount(sampleCount + 1); // Menambah jumlah sampel
  };

  const decreaseCount = () => {
    if (sampleCount > 0) {
      setSampleCount(sampleCount - 1); // Mengurangi jumlah sampel jika lebih dari 0
    }
  };

  

  return (
    <>
      <Header />
      <TopBar />

      <div style={{ padding: '80px', maxWidth: '900px', margin: 'auto', fontFamily: 'Lato, sans-serif' }}>
        <h1 style={{ fontSize: '50px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
          Formulir Permohonan Uji Sampel
        </h1>

        <h2 style={{ fontSize: '30px', marginBottom: '10px', fontWeight: 'semibold' }}>Isi Data Diri</h2>
        
        <label style={{ fontSize: '22px',display: 'block', marginBottom: '10px', marginTop: '20px' }}>Nama Lengkap</label>
        <input
          type="text"
          style={{
            width: '713px',
            height: '52px',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '10px',
            border: '1px solid #C6C6C6',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
          }}
        />

        <label style={{fontSize: '22px', display: 'block', marginBottom: '10px', marginTop: '20px' }}>Email</label>
        <input
          type="text"
          style={{
            width: '713px',
            height: '52px',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '10px',
            border: '1px solid #C6C6C6',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
          }}
        />

        <label style={{ fontSize: '22px', display: 'block', marginBottom: '10px', marginTop: '20px' }}>No Telepon</label>
        <input
          type="text"
          style={{
            width: '713px',
            height: '52px',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '10px',
            border: '1px solid #C6C6C6',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
          }}
        />

        <label style={{fontSize: '22px', display: 'block', marginBottom: '10px', marginTop: '20px' }}>Alamat</label>
        <textarea
          style={{
            width: '713px',
            minHeight: '52px',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '10px',
            border: '1px solid #C6C6C6',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
        />

        <label style={{ fontSize: '22px',display: 'block', marginBottom: '10px', marginTop: '20px' }}>Asal Instansi</label>
        <input
          type="text"
          style={{
            width: '713px',
            height: '52px',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '10px',
            border: '1px solid #C6C6C6',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
          }}
        />
        
        <div>
          <h3>Metode Pengiriman Sampel</h3>
          <label>
            <input 
              type="radio" 
              name="sampleShape" 
              value="Diantar sendiri" 
              onChange={handleChange} 
              style={{ marginRight: '5px' }} 
            />
            Diantar sendiri
          </label>
          <br />
          <label>
            <input 
              type="radio" 
              name="sampleShape" 
              value="Jasa ekspedisi" 
              onChange={handleChange} 
              style={{ marginRight: '5px' }} 
            />
            Jasa ekspedisi
          </label>
          <br />
          {selectedMethod === 'Jasa ekspedisi' && (
            <input
            type="text"
            placeholder="masukkan Nomor Resi"
            style={{
              width: '713px',
              height: '52px',
              padding: '10px',
              marginBottom: '15px',
              marginTop:'15px',
              borderRadius: '10px',
              border: '1px solid #C6C6C6',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
            }}
          />
      )}
    </div>
       
        <div style={{ borderBottom: '1px solid #C6C6C6', margin: '20px 0', width: '720px' }} />

        <h2 style={{ fontSize: '30px', marginBottom: '10px', fontWeight: 'bold' }}>Deskripsi Sampel</h2>

        <label style={{ fontSize: '22px', display: 'block', marginBottom: '5px', marginTop: '20px' }}>Nama Sampel</label>
        <input
          type="text"
          style={{
            width: '713px',
            height: '52px',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '10px',
            border: '1px solid #C6C6C6',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
            boxSizing: 'border-box',
          }}
        />

        <label style={{fontSize: '22px', display: 'block', marginBottom: '5px', marginTop: '20px' }}>Jumlah Sampel</label>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <button
            onClick={decreaseCount}
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
          <span style={{ fontSize: '20px', marginRight: '10px' }}>{sampleCount}</span>
          <button
            onClick={increaseCount}
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

        <h2 style={{ fontSize: '22px', marginTop: '20px' }}>Bentuk Sampel</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
       <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
       <input type="radio" name="sampleShape" value="Cair" style={{ marginRight: '5px' }} />
       Cair
       </label>
       <label>
       <input type="radio" name="sampleShape" value="Padat" style={{ marginRight: '5px' }} />
         Padat
         </label>
        <label>
        <input type="radio" name="sampleShape" value="Pasta" style={{ marginRight: '5px' }} />
       Pasta
      </label>
       </div>
       <div style={{ display: 'flex', flexDirection: 'column',marginRight: '430px' }}>
        <label>
         <input type="radio" name="sampleShape" value="Gel" style={{ marginRight: '5px' }} />
          Gel
      </label>
      <label>
      <input type="radio" name="sampleShape" value="Gas" style={{ marginRight: '5px' }} />
      Gas
        </label>
      </div>
      </div>




        <h2 style={{ fontSize: '22px', marginTop: '20px' }}>Jenis Analisis yang Digunakan</h2>
        <p style={{ fontSize: '14px', marginBottom: '5px' }}>*Bisa memilih beberapa Jenis Analisis</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '50px'}}>
        <label>
          <input type="checkbox" value="XRF" />
          XRF
        </label>
        <label>
          <input type="checkbox" value="XRD" />
          XRD 
        </label>
        <label>
          <input type="checkbox" />
          SEM EDS
        </label>
        <label>
          <input type="checkbox" value="Laser Scanner" />
          UV-Vis
        </label>
        
        <label>
          <input type="checkbox" value="Laser Scanner" />
          UTM
        </label>
        <label>
          <input type="checkbox" value="Laser Scanner" />
          FTIR
        </label>
        <label>
          <input type="checkbox" value="Laser Scanner" />
          TG/DSC
        </label>
        </div>
  <div style={{ display: 'flex', flexDirection: 'column',marginRight: '30px' }}>
  <label>
          <input type="checkbox" value="Laser Scanner" />
          Raman
        </label>
        <label>
          <input type="checkbox" value="Laser Scanner" />
          NMR
        </label>
        <label>
          <input type="checkbox" value="Laser Scanner" />
          GC-MS
        </label>
        <label>
          <input type="checkbox" value="Laser Scanner" />
          UPLC-MSMS
        </label>
        <label>
          <input type="checkbox" value="Laser Scanner" />
          CPC
        </label>
        <label>
          <input type="checkbox" value="Laser Scanner" />
          Freeze Dryer
        </label>
        <label>
          <input type="checkbox" value="Laser Scanner" />
          Micordrill/DRMS
        </label>
        </div>
  <div style={{ display: 'flex', flexDirection: 'column', marginRight: '0px'}}>
  <label>
          <input type="checkbox" value="Laser Scanner" />
          Colony Counter
        </label>
        <label>
          <input type="checkbox" value="Laser Scanner" />
          Mikroskop Trinokuler
        </label>
        <label>
          <input type="checkbox" value="Laser Scanner" />
          Rotary Vacuum Evaporator
        </label>
        
        </div>
</div>

      
        
        

        <label style={{fontSize: '22px', display: 'block', marginTop: '20px', marginBottom: '5px' }}>Catatan Tambahan</label>
        <textarea
          style={{
            width: '713px',
            minHeight: '52px',
            padding: '10px',
            borderRadius: '10px',
            marginBottom: '15px',
            border: '1px solid #C6C6C6',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
            boxSizing: 'border-box',
          }}
        /> 
          <div style={{ borderBottom: '1px solid #C6C6C6', margin: '20px 0', width: '720px' }} />
      <h2 style={{ fontSize: '30px', marginBottom: '10px', fontWeight: 'bold'}}>Unggah berkas</h2>

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
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left',
            color: '#00AFB9',
            padding: '10px 0px 10px 20px',
            border: '1px solid #00AFB9',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '20px',
            width: '150px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Pilih File
        </button>
      </label>
      <div style={{ marginBottom: '20px', fontSize: '14px', color: '#555' }}>
        *Template file dapat diunduh pada Halaman Panduan
      </div>
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
          fontSize: '30px',
          width : '200px', 
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

export default SampleRequestForm;
