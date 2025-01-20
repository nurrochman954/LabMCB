'use client';
import React, { useState } from 'react';
import { createSampleTestForm } from '@/lib/sampleTest';
import { AnalysisType, SampleType, DeliveryMethod } from '@prisma/client';
import { useAuth } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";

const SampleRequestForm: React.FC = () => {
  const { userId } = useAuth();
  
  // Form state sesuai interface SampleTestFormData
  const [formData, setFormData] = useState({
    testName: '',
    testEmail: '',
    testPhone: '',
    testAddress: '',
    analysisTypes: [] as AnalysisType[],
    sampleName: '',
    sampleType: '' as SampleType,
    sampleQuantity: 0,
    testDescription: '',
    deliveryMethod: '' as DeliveryMethod,
    coverLetter: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // ... kode sebelumnya ...

  // Handlers untuk form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler untuk jumlah sampel
  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    setFormData(prev => ({
      ...prev,
      sampleQuantity: type === 'increase' 
        ? prev.sampleQuantity + 1 
        : Math.max(0, prev.sampleQuantity - 1)
    }));
  };

  // Handler untuk sampel type (radio buttons)
  const handleSampleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      sampleType: e.target.value as SampleType
    }));
  };

  // Handler untuk jenis analisis (checkboxes)
  const handleAnalysisTypeChange = (type: AnalysisType, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      analysisTypes: checked 
        ? [...prev.analysisTypes, type]
        : prev.analysisTypes.filter(t => t !== type)
    }));
  };

  // Handler untuk file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        coverLetter: file.name
      }));
    }
  };

  // Form validation
  const validateForm = (): string => {
    if (!formData.testName) return 'Nama harus diisi';
    if (!formData.testEmail) return 'Email harus diisi';
    if (!formData.testPhone) return 'Nomor telepon harus diisi';
    if (!formData.testAddress) return 'Alamat harus diisi';
    if (!formData.sampleName) return 'Nama sampel harus diisi';
    if (!formData.sampleType) return 'Bentuk sampel harus dipilih';
    if (formData.sampleQuantity <= 0) return 'Jumlah sampel harus lebih dari 0';
    if (formData.analysisTypes.length === 0) return 'Pilih minimal satu jenis analisis';
    if (!formData.deliveryMethod) return 'Metode pengiriman harus dipilih';
    return '';
  };

  // Submit handler
  const handleSubmit = async () => {
    console.log('Starting form submission');
    
    if (!userId) {
      setError('Please login first');
      return;
    }
  
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
  
    setIsSubmitting(true);
    setError('');
  
    try {
      console.log('Submitting form data:', formData);
      const result = await createSampleTestForm(userId, formData);
      console.log('Submission result:', result);
  
      if (result.success && result.data) {
        window.location.href = `/halaman-saya`;
      } else {
        setError(result.error || 'Failed to submit form');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }

    console.log('Form data before submit:', {
      ...formData,
      analysisTypes: Array.isArray(formData.analysisTypes) ? formData.analysisTypes : [],
      sampleQuantity: Number(formData.sampleQuantity)
    });
  };

  return (
    <>
      <Header />
      <TopBar />
      
      <div style={{ padding: '80px', maxWidth: '900px', margin: 'auto', fontFamily: 'Lato, sans-serif' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
          Formulir Permohonan Uji Sampel
        </h1>

        {/* Bagian Data Diri */}
        <h2 style={{ fontSize: '22px', marginBottom: '10px', fontWeight: 'bold' }}>
          Isi Data Diri
        </h2>

        {/* Input Nama */}
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

        {/* Input Email */}
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

        {/* Input Nomor Telepon */}
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

        {/* Input Alamat */}
        <label style={{ fontSize: '18px', display: 'block', marginBottom: '10px' }}>
          Alamat
        </label>
        <textarea
          name="testAddress"
          value={formData.testAddress}
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
          }}
        />

        {/* Metode Pengiriman */}
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

        <div style={{ borderBottom: '1px solid #C6C6C6', margin: '20px 0', width: '720px' }} />

        {/* Bagian Deskripsi Sampel */}
        <h2 style={{ fontSize: '22px', marginBottom: '10px', fontWeight: 'bold' }}>
          Deskripsi Sampel
        </h2>

        {/* Nama Sampel */}
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

        {/* Jumlah Sampel */}
        <label style={{ fontSize: '18px', display: 'block', marginBottom: '5px', marginTop: '20px' }}>
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

        {/* Bentuk Sampel */}
        <h2 style={{ fontSize: '18px', marginTop: '20px' }}>Bentuk Sampel</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Object.values(SampleType).map((type) => (
              <label key={type} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="sampleType"
                  value={type}
                  checked={formData.sampleType === type}
                  onChange={handleSampleTypeChange}
                  style={{ marginRight: '8px' }}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Jenis Analisis */}
        <h2 style={{ fontSize: '18px', marginTop: '20px' }}>Jenis Analisis yang Digunakan</h2>
        <p style={{ fontSize: '12px', marginBottom: '5px' }}>*Bisa memilih beberapa Jenis Analisis</p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '10px', 
          marginBottom: '15px', 
          fontSize: '14px' 
        }}>
          {Object.values(AnalysisType).map((type) => (
            <label key={type} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <input
                type="checkbox"
                checked={formData.analysisTypes.includes(type)}
                onChange={(e) => handleAnalysisTypeChange(type, e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              {type}
            </label>
          ))}
        </div>

        {/* Catatan Tambahan */}
        <label style={{ fontSize: '18px', display: 'block', marginTop: '20px', marginBottom: '5px' }}>
          Catatan Tambahan
        </label>
        <textarea
          name="testDescription"
          value={formData.testDescription}
          onChange={handleInputChange}
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

        {/* Pembatas */}
        <div style={{ borderBottom: '1px solid #C6C6C6', margin: '20px 0', width: '720px' }} />

        {/* Bagian Upload File */}
        <h2 style={{ fontSize: '22px', marginBottom: '10px', fontWeight: 'bold' }}>
          Unggah berkas
        </h2>

        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept=".pdf,.doc,.docx"
        />
        <label htmlFor="file-upload">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              style={{
                backgroundImage: `url(/assets/unggah.png)`,
                backgroundSize: '36px 38px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left 10px center',
                color: '#00AFB9',
                padding: '10px 20px 10px 56px',
                border: '1px solid #00AFB9',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '18px',
                height: '43px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Pilih File
            </button>
            {formData.coverLetter && (
              <span style={{ color: '#666' }}>
                {formData.coverLetter}
              </span>
            )}
          </div>
        </label>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#555' }}>
          *Template file dapat diunduh pada Halaman Panduan
        </div>

        {/* Error Message */}
        {error && (
          <div style={{ 
            color: 'red', 
            marginBottom: '20px', 
            textAlign: 'center',
            padding: '10px',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            borderRadius: '5px'
          }}>
            {error}
          </div>
        )}

        {/* Tombol Submit */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              backgroundColor: isHovered ? '#00AFB9': '#50BCB8',
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
            }}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim'}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SampleRequestForm;