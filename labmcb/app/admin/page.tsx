'use client'
import React, { useState } from 'react';
import PopUpNoSurat from "@/components/PopUpNoSurat";

const admin = () => {
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <div>
    <button onClick={handleOpenPopup}>NomorSurat</button>
    {isPopupOpen && <PopUpNoSurat onClose={handleClosePopup} />}
  </div>
  );
};

export default admin;
