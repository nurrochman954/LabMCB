'use client'
import React, { useState } from 'react';
import PopUpNoSurat from "@/components/PopUpNoSurat";
import ButtonDU from "@/components/TombolDU";
import Filter from '@/components/Filter'; // Adjust the import path accordingly
import PopUpKomplain from '@/components/PopUpKomplain';
const admin = () => {
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
   const [isKomplainOpen, setIsPopupOpenKomplain] = useState(false);
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
    
  const handleOpenPopupKomplain = () => {
    setIsPopupOpenKomplain(true);
  };

  const handleClosePopupKomplain = () => {
    setIsPopupOpenKomplain(false);
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to toggle Filter visibility
   
  
    return (
    <div>
      <button onClick={handleOpenPopup}>NomorSurat</button>
      {isPopupOpen && <PopUpNoSurat onClose={handleClosePopup} />}

      <ButtonDU
        text="Buka Filter"
        variant="primary"
        onClick={() => setIsFilterOpen(true)} // Open the Filter on button click
      />

      {/* Conditionally render the Filter */}
      {isFilterOpen && (
        <Filter
          onClose={() => setIsFilterOpen(false)} // Pass function to close the Filter
        />
      )}

      <button onClick={handleOpenPopupKomplain}>Komplain</button>
      {isKomplainOpen && <PopUpKomplain onClose={handleClosePopupKomplain} />}
            
    </div>
  
  );
};

export default admin;
