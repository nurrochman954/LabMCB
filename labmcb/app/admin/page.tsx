'use client'
import React, { useState } from 'react';
import PopUpNoSurat from "@/components/PopUpNoSurat";
import ButtonDU from "@/components/TombolDU";
import Filter from '@/components/Filter'; 
import PopUpKomplain from '@/components/PopUpKomplain';
import Overview from '@/components/Overview';


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

      <Overview setIsFilterOpen={handleOpenFilter}/>

            
    </div>
  
  );
};

export default admin;
