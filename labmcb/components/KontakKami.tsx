"use client";
import React, { useState } from "react";

const KontakKami: React.FC = () => {
  const [isNextHovered, setIsNextHovered] = useState(false);
  return (
    <a 
      href="https://wa.me/6281931747582"  // Format yang benar tanpa tanda +
      className="floating-button" 
      target="_blank" 
      rel="noopener noreferrer"
    >
       <button
          onMouseEnter={() => setIsNextHovered(true)}
          onMouseLeave={() => setIsNextHovered(false)}
          className="p-2"
>
      <img
        src={isNextHovered ?   "/assets/KontakKamiColor.png" : "/assets/KontakKami.png"}
        alt="Right Arrow"
        className="w-4 h-4 transition-all duration-300 ease-in-out"
        style={{
          width: '160px', // Sesuaikan ukuran gambar
          height: 'auto', // Sesuaikan ukuran gambar
        }}
      />
</button>
    </a>
  );
};

export default KontakKami;
