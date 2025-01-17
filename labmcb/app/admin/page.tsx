'use client'
import React, { useState } from 'react';
import PopUpNoSurat from "@/components/PopUpNoSurat";
import ButtonDU from "@/components/TombolDU";
import Filter from '@/components/Filter'; 
import PopUpKomplain from '@/components/PopUpKomplain';
import Overview from '@/components/Overview';
import AdminTracking from '@/components/AdminTracking';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const admin = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const [isKomplainOpen, setIsPopupOpenKomplain] = useState(false);
  const handleOpenPopupKomplain = () => setIsPopupOpenKomplain(true);
  const handleClosePopupKomplain = () =>  setIsPopupOpenKomplain(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpenFilter = () => setIsFilterOpen(true); 
  const handleCloseFilter = () => setIsFilterOpen(false); 

  return (
    <>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <Overview setIsFilterOpen={handleOpenFilter}/> 
        {/* Mengatur margin kiri yang valid */}
        
          {/* Mengganti ml-100 dengan ml-10 atau nilai lainnya */}
        
        <AdminTracking/>
        </div>
      
      <Footer />
    </>
  );
};

export default admin;
