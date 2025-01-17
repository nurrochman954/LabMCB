'use client'
import React, { useState } from 'react';
import Header from '@/components/Header';
import PopUpNoSurat from "@/components/PopUpNoSurat";
import ButtonDU from "@/components/TombolDU";
import Filter from '@/components/Filter'; 
import PopUpKomplain from '@/components/PopUpKomplain';
import Overview from '@/components/Overview';

const Admin = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isKomplainOpen, setIsPopupOpenKomplain] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  const handleOpenPopupKomplain = () => setIsPopupOpenKomplain(true);
  const handleClosePopupKomplain = () => setIsPopupOpenKomplain(false);
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="space-y-4">
          {/* Buttons Section */}
          <div className="flex gap-4">
            <button 
              className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
              onClick={handleOpenPopup}
            >
              Nomor Surat
            </button>

            <ButtonDU
              text="Buka Filter"
              variant="primary"
              onClick={handleOpenFilter}
            />

            <button 
              className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
              onClick={handleOpenPopupKomplain}
            >
              Komplain
            </button>
          </div>

          {/* Overview Section */}
          <Overview setIsFilterOpen={handleOpenFilter} />
          
          {/* Popups */}
          {isPopupOpen && <PopUpNoSurat onClose={handleClosePopup} />}
          {isFilterOpen && <Filter onClose={handleCloseFilter} />}
          {isKomplainOpen && <PopUpKomplain onClose={handleClosePopupKomplain} />}
        </div>
      </main>
    </div>
  );
};

export default Admin;