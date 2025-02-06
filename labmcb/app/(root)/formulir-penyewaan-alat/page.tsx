'use client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import React, { useState } from 'react';
import { RentalEquipment } from '@prisma/client';
import { FileUpload } from '@/components/FileUpload';
import { createEquipmentRental } from '@/lib/equipmentRental';
import { useAuth } from "@clerk/nextjs";
import PricePreview from '@/components/PreviewHarga';
import Notification from "@/components/Notifikasi";

const EquipmentRentalForm: React.FC = () => {
  const { userId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form data states
  const [formData, setFormData] = useState({
    rentalName: '',
    rentalEmail: '',
    rentalPhone: '',
    rentalAddress: '',
    rentalInstance: '',
    startDate: '',
    endDate: '',
    agreementFile: null as string | null,
  });

  // Equipment orders state with proper typing
  const [orders, setOrders] = useState<Array<{
    id: number;
    equipmentType: RentalEquipment;
    quantity: number;
  }>>([{ id: 1, equipmentType: RentalEquipment.XRF_HANDHELD, quantity: 1 }]);

  // UI states
  const [showPopup, setShowPopup] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Add state for notification
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (id: number, value: RentalEquipment) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, equipmentType: value } : order
    ));
  };

  const handleFileUpload = (file: {
    url: string;
    filename?: string;
    public_id: string;
    format: string;
  } | null) => {
    try {
      document.body.style.overflow = 'auto';
      if (file) {
        setFormData(prev => ({
          ...prev,
          agreementFile: file.url
        }));
        setError('');
      } else {
        setFormData(prev => ({
          ...prev,
          agreementFile: null
        }));
      }
    } catch (error) {
      console.error('Error handling file upload:', error);
      document.body.style.overflow = 'auto';
      setError('Terjadi kesalahan saat mengunggah file. Silakan coba lagi.');
    }
  };

  const addOrder = () => {
    const newOrder = {
      id: orders.length + 1,
      equipmentType: RentalEquipment.XRF_HANDHELD,
      quantity: 1
    };
    setOrders([...orders, newOrder]);
  };

  const increaseCount = (id: number) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, quantity: order.quantity + 1 } : order
    ));
  };

  const decreaseCount = (id: number) => {
    setOrders(orders.map(order =>
      order.id === id && order.quantity > 1
        ? { ...order, quantity: order.quantity - 1 }
        : order
    ));
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

  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.rentalName) errors.push('Nama lengkap harus diisi');
    if (!formData.rentalEmail) errors.push('Email harus diisi');
    if (!formData.rentalPhone) errors.push('Nomor telepon harus diisi');
    if (!formData.rentalAddress) errors.push('Alamat harus diisi');
    if (!formData.rentalInstance) errors.push('Asal instansi harus diisi');
    if (!formData.startDate) errors.push('Tanggal mulai harus diisi');
    if (!formData.endDate) errors.push('Tanggal selesai harus diisi');
    if (!formData.agreementFile) errors.push('Surat perjanjian harus diunggah');
    if (orders.length === 0) errors.push('Minimal satu alat harus dipilih');

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) errors.push('Tanggal selesai tidak boleh sebelum tanggal mulai');
    }

    return errors;
  };

  const handleSubmit = async () => {
    if (!userId) {
      setNotification({
        message: 'Silakan masuk terlebih dahulu',
        type: 'success'
      });
      return;
    }

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join('\n'));
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await createEquipmentRental(userId, {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        equipmentOrders: orders.map(({ equipmentType, quantity }) => ({
          equipmentType,
          quantity
        }))
      });

      if (response.success) {
        setNotification({
          message: 'Formulir penyewaan alat berhasil dikirim',
          type: 'success'
        });
        setTimeout(() => {
          window.location.href = '/halaman-saya';
        }, 2000);
      } else {
        setError(response.error || 'Terjadi kesalahan saat mengirim form');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
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

        <label style={{ fontSize: '18px', display: 'block', marginBottom: '10px', marginTop: '20px' }}>Nama Lengkap</label>
        <input
          type="text"
          name="rentalName"
          value={formData.rentalName}
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

        <label style={{ fontSize: '18px', display: 'block', marginBottom: '10px', marginTop: '20px' }}>Email</label>
        <input
          type="email"
          name="rentalEmail"
          value={formData.rentalEmail}
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

        <label style={{ fontSize: '18px', display: 'block', marginBottom: '10px', marginTop: '20px' }}>No Telepon</label>
        <input
          type="tel"
          name="rentalPhone"
          value={formData.rentalPhone}
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

        <label style={{ fontSize: '18px', display: 'block', marginBottom: '10px', marginTop: '20px' }}>Alamat</label>
        <textarea
          name="rentalAddress"
          value={formData.rentalAddress}
          onChange={handleInputChange}
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

        <label style={{ fontSize: '18px', display: 'block', marginBottom: '10px', marginTop: '20px' }}>Asal Instansi</label>
        <input
          type="text"
          name="rentalInstance"
          value={formData.rentalInstance}
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

        <label style={{ fontSize: '18px', display: 'block', marginBottom: '10px', marginTop: '20px' }}>Tanggal Penyewaan</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
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
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
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
              value={order.equipmentType}
              onChange={(e) => handleSelectChange(order.id, e.target.value as RentalEquipment)}
              style={{
                width: '713px',
                height: '45px',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '10px',
                border: '1px solid #C6C6C6',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
              }}
            >
              {Object.entries(RentalEquipment).map(([key, value]) => (
                <option key={key} value={value}>
                  {value.replace(/_/g, ' ')}
                </option>
              ))}
            </select>

            <label style={{ fontSize: '18px', display: 'block', marginBottom: '5px', marginTop: '20px' }}>Kuantitas</label>
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

              <div style={{ marginRight: '30px' }}>
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

        <PricePreview
          orders={orders}
          startDate={formData.startDate}
          endDate={formData.endDate}
        />

        <div style={{ borderBottom: '1px solid #C6C6C6', margin: '20px 0', width: '720px' }} />
        <h2 style={{ fontSize: '22px', marginBottom: '10px', fontWeight: 'bold' }}>Unggah Surat Perjanjian</h2>

        <div style={{ marginBottom: '20px' }}>
          <FileUpload
            uploadPreset="labmcbpreset"
            folder="rental/agreements"
            acceptedFileTypes={["pdf"]}
            maxFileSize={5242880}
            onFileUpload={handleFileUpload}
            initialFile={formData.agreementFile}
          />
          <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
            *Unggah surat perjanjian dalam format PDF, maksimal 5MB
          </p>
        </div>

        {error && (
          <div style={{
            color: 'red',
            marginBottom: '20px',
            textAlign: 'left',
            padding: '15px',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            borderRadius: '5px',
            border: '1px solid #ffcdd2',
            whiteSpace: 'pre-line'
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              backgroundColor: isSubmitting ? '#cccccc' : (isHovered ? '#00AFB9' : '#50BCB8'),
              color: 'white',
              padding: '5px 20px',
              border: 'none',
              borderRadius: '10px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '20px',
              width: '150px',
              height: '50px',
              textAlign: 'center',
              lineHeight: '30px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
              opacity: isSubmitting ? 0.7 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim'}
          </button>
        </div>
      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <Footer />
    </>
  );
};

export default EquipmentRentalForm;