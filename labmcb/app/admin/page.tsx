'use client'
import React, { useState } from 'react';
import ButtonDU from "@/components/TombolDU";
import Filter from '@/components/Filter'; 
import Overview from '@/components/Overview';
import AdminTracking from '@/components/AdminTracking';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const admin = () => {

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
        
          {isFilterOpen && <Filter onClose={handleCloseFilter} />}
        <AdminTracking/>
        </div>
      
      <Footer />
    </>
  );
};

export default admin;
