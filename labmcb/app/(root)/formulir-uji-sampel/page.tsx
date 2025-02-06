'use client';

import React, { useState, useEffect } from 'react';
import { createSampleTestForm } from '@/lib/sampleTest';
import { AnalysisType, SampleType, DeliveryMethod, SamplePreparation } from '@prisma/client';
import type { SampleTestFormData } from '@/lib/validations/sample-test';
import { useAuth } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import { FileUpload } from '@/components/FileUpload';
import Notification from '@/components/Notifikasi';


const SampleRequestForm: React.FC = () => {
  const { userId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const formatEquipmentName = (name: string) => {
    return name.split('_').map(word => word.toUpperCase()).join(' ');
  };

  const formatSampleType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  const [formData, setFormData] = useState<SampleTestFormData>({
    testName: '',
    testEmail: '',
    testPhone: '',
    testAddress: '',
    testInstanceName: '',
    analysisTypes: [] as AnalysisType[],
    sampleName: '',
    sampleType: 'SOLID' as SampleType,
    sampleQuantity: 0,
    samplePreparation: null,
    testDescription: '',
    deliveryMethod: 'SELF' as DeliveryMethod,
    coverLetter: null,
    resultFile: null,
    sampleRequestNumber: null
  });

  // Add state for notification
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null)

  // Cleanup effect untuk memastikan scroll selalu normal
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.testName.trim()) errors.push('Nama harus diisi');
    if (!formData.testEmail.trim()) errors.push('Email harus diisi');
    if (!formData.testPhone.trim()) errors.push('Nomor telepon harus diisi');
    if (!formData.testAddress.trim()) errors.push('Alamat harus diisi');
    if (!formData.testInstanceName.trim()) errors.push('Instansi harus diisi');
    if (!formData.sampleName.trim()) errors.push('Nama sampel harus diisi');
    if (formData.sampleQuantity <= 0) errors.push('Jumlah sampel harus lebih dari 0');
    if (formData.analysisTypes.length === 0) errors.push('Pilih minimal satu jenis analisis');
    if (!formData.coverLetter) errors.push('Surat pengantar harus diunggah');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.testEmail)) errors.push('Format email tidak valid');

    const phoneRegex = /^[0-9\-+()]*$/;
    if (!phoneRegex.test(formData.testPhone)) errors.push('Format nomor telepon tidak valid');

    return errors;
  };

  const handleFileUpload = (file: {
    url: string;
    filename?: string;
    public_id: string;
    format: string;
  } | null) => {
    try {
      // Pastikan scroll tetap berfungsi
      document.body.style.overflow = 'auto';

      if (file) {
        setFormData(prev => ({
          ...prev,
          coverLetter: file.url
        }));
        setError('');
      } else {
        setFormData(prev => ({
          ...prev,
          coverLetter: null
        }));
      }
    } catch (error) {
      console.error('Error handling file upload:', error);
      document.body.style.overflow = 'auto';
      setError('Terjadi kesalahan saat mengunggah file. Silakan coba lagi.');
    }
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
      const response = await createSampleTestForm(userId, {
        ...formData,
        sampleQuantity: Number(formData.sampleQuantity),
        testDescription: formData.testDescription || null,
        resultFile: formData.resultFile || null,
        sampleRequestNumber: formData.sampleRequestNumber || null
      });
  
      if (response.success && response.data) {
        setNotification({
          message: 'Formulir permohonan uji sampel berhasil dikirim',
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
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || ''
    }));
  };

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    setFormData((prev) => ({
      ...prev,
      sampleQuantity: type === 'increase'
        ? prev.sampleQuantity + 1
        : Math.max(0, prev.sampleQuantity - 1)
    }));
  };

  const handleSampleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      sampleType: e.target.value as SampleType
    }));
  };

  const handleAnalysisTypeChange = (type: AnalysisType, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      analysisTypes: checked
        ? [...prev.analysisTypes, type]
        : prev.analysisTypes.filter(t => t !== type)
    }));
  };

  return (
    <>
      <Header />
      <TopBar />

      <div style={{
        position: 'relative',
        minHeight: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        <div style={{
          padding: '80px',
          maxWidth: '900px',
          margin: 'auto',
          fontFamily: 'Lato, sans-serif',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Form Title */}
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            Formulir Permohonan Uji Sampel
          </h1>

          {/* Data Diri Section */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '22px', marginBottom: '10px', fontWeight: 'bold' }}>
              Isi Data Diri
            </h2>

            {/* Nama Input */}
            <label style={{ fontSize: '18px', display: 'block', marginBottom: '10px', marginTop: '20px' }}>
              Nama Lengkap
            </label>
            <input
              type="text"
              name="testName"
              value={formData.testName}
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

            {/* Email Input */}
            <label style={{ fontSize: '18px', display: 'block', marginBottom: '10px' }}>
              Email
            </label>
            <input
              type="email"
              name="testEmail"
              value={formData.testEmail}
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

            {/* Phone Input */}
            <label style={{ fontSize: '18px', display: 'block', marginBottom: '10px' }}>
              No Telepon
            </label>
            <input
              type="tel"
              name="testPhone"
              value={formData.testPhone}
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

            {/* Address Input */}
            <label style={{ fontSize: '18px', display: 'block', marginBottom: '10px' }}>
              Alamat
            </label>
            <textarea
              name="testAddress"
              value={formData.testAddress}
              onChange={handleTextAreaChange}
              style={{
                width: '713px',
                minHeight: '45px',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '10px',
                border: '1px solid #C6C6C6',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
                resize: 'vertical',
              }}
            />

            {/* Institution Input */}
            <label style={{ fontSize: '18px', display: 'block', marginBottom: '10px' }}>
              Instansi
            </label>
            <input
              type="text"
              name="testInstanceName"
              value={formData.testInstanceName}
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

            {/* Delivery Method */}
            <div>
              <h3 style={{ fontSize: '18px', marginBottom: '10px', marginTop: '20px' }}>
                Metode Pengiriman Sampel
              </h3>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="SELF"
                  checked={formData.deliveryMethod === 'SELF'}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    deliveryMethod: e.target.value as DeliveryMethod
                  }))}
                  style={{ marginRight: '5px' }}
                />
                Diantar sendiri
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="LAB_DELIVERY"
                  checked={formData.deliveryMethod === 'LAB_DELIVERY'}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    deliveryMethod: e.target.value as DeliveryMethod
                  }))}
                  style={{ marginRight: '5px' }}
                />
                Jasa ekspedisi
              </label>
            </div>

            {/* Divider */}
            <div style={{ borderBottom: '1px solid #C6C6C6', margin: '20px 0', width: '720px' }} />

            {/* Sample Description Section */}
            <h2 style={{ fontSize: '22px', marginBottom: '10px', fontWeight: 'bold' }}>
              Deskripsi Sampel
            </h2>

            {/* Sample Name */}
            <label style={{ fontSize: '18px', display: 'block', marginBottom: '5px', marginTop: '20px' }}>
              Nama Sampel
            </label>
            <input
              type="text"
              name="sampleName"
              value={formData.sampleName}
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

            {/* Sample Quantity */}
            <label style={{ fontSize: '18px', display: 'block', marginBottom: '5px' }}>
              Jumlah Sampel
            </label>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <button
                onClick={() => handleQuantityChange('decrease')}
                type="button"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  border: '1px solid #C6C6C6',
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
              >
                -
              </button>
              <span style={{ fontSize: '18px', marginRight: '10px' }}>{formData.sampleQuantity}</span>
              <button
                onClick={() => handleQuantityChange('increase')}
                type="button"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  border: '1px solid #C6C6C6',
                  cursor: 'pointer',
                }}
              >
                +
              </button>
            </div>

            {/* Sample Preparation */}
            <div>
              <h3 style={{ fontSize: '18px', marginBottom: '10px', marginTop: '20px' }}>
                Status Preparasi Sampel
                <span style={{
                  fontSize: '12px',
                  color: '#666',
                  fontWeight: 'normal',
                  marginLeft: '8px'
                }}>
                  (opsional)
                </span>
              </h3>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="radio"
                  name="samplePreparation"
                  value="YES"
                  checked={formData.samplePreparation === 'YES'}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    samplePreparation: e.target.value as SamplePreparation
                  }))}
                  style={{ marginRight: '5px' }}
                />
                Sudah preparasi
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="radio"
                  name="samplePreparation"
                  value="NO"
                  checked={formData.samplePreparation === 'NO'}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    samplePreparation: e.target.value as SamplePreparation
                  }))}
                  style={{ marginRight: '5px' }}
                />
                Belum preparasi
              </label>
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  samplePreparation: null
                }))}
                style={{
                  fontSize: '12px',
                  color: '#666',
                  background: 'none',
                  border: 'none',
                  padding: '0',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  display: formData.samplePreparation ? 'block' : 'none'
                }}
              >
                Hapus pilihan
              </button>
            </div>

            {/* Sample Type */}
            <h3 style={{ fontSize: '18px', marginTop: '20px' }}>Bentuk Sampel</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
              {Object.values(SampleType).map((type) => (
                <label key={type} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="radio"
                    name="sampleType"
                    value={type}
                    checked={formData.sampleType === type}
                    onChange={handleSampleTypeChange}
                    style={{ marginRight: '8px' }}
                  />
                  {formatSampleType(type)}
                </label>
              ))}
            </div>

            {/* Analysis Types */}
            <h3 style={{ fontSize: '18px', marginTop: '20px' }}>Jenis Analisis yang Digunakan</h3>
            <p style={{ fontSize: '12px', marginBottom: '5px' }}>*Bisa memilih beberapa Jenis Analisis</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              marginBottom: '15px'
            }}>
              {Object.values(AnalysisType).map((type) => (
                <label key={type} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={formData.analysisTypes.includes(type)}
                    onChange={(e) => handleAnalysisTypeChange(type, e.target.checked)}
                    style={{ marginRight: '8px' }}
                  />
                  {formatEquipmentName(type)}
                </label>
              ))}
            </div>

            {/* Additional Notes */}
            <label style={{ fontSize: '18px', display: 'block', marginTop: '20px', marginBottom: '5px' }}>
              Catatan Tambahan
              <span style={{
                fontSize: '12px',
                color: '#666',
                fontWeight: 'normal',
                marginLeft: '8px'
              }}>
                (opsional)
              </span>
            </label>
            <textarea
              name="testDescription"
              value={formData.testDescription || ''}
              onChange={handleTextAreaChange}
              style={{
                width: '713px',
                minHeight: '45px',
                padding: '10px',
                borderRadius: '10px',
                marginBottom: '15px',
                border: '1px solid #C6C6C6',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
                resize: 'vertical',
              }}
            />

            {/* Divider */}
            <div style={{ borderBottom: '1px solid #C6C6C6', margin: '20px 0', width: '720px' }} />

            {/* File Upload Section with updated message */}
            <div style={{
              marginBottom: '30px',
              position: 'relative',
              zIndex: 10
            }}>
              <h2 style={{
                fontSize: '22px',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}>
                Unggah Surat Pengantar
              </h2>

              <p style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '15px'
              }}>
                *Unggah surat pengantar dalam format PDF, maksimal 5MB
              </p>

              <div style={{
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#F9FAFB',
                position: 'relative',
                zIndex: 20
              }}>
                <FileUpload
                  uploadPreset="labmcbpreset"
                  folder="samples/labmcb"
                  acceptedFileTypes={["pdf"]}
                  maxFileSize={5242880}
                  onFileUpload={handleFileUpload}
                  initialFile={formData.coverLetter}
                />
              </div>
            </div>

            {/* Error display */}
            {error && (
              <div style={{
                color: 'red',
                marginBottom: '20px',
                textAlign: 'left',
                padding: '15px',
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                borderRadius: '5px',
                border: '1px solid #ffcdd2',
                whiteSpace: 'pre-line',
                position: 'relative',
                zIndex: 1
              }}>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '30px',
              position: 'relative',
              zIndex: 1
            }}>
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

export default SampleRequestForm;