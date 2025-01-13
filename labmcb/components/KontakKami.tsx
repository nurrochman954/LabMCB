import React from 'react';
import "./KontakKami.css";

const KontakKami: React.FC = () => {
  return (
    <a 
      href="https://wa.me/+6281931747582" 
      className="floating-button" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <span className="icon">✆</span>
      Kontak Kami
    </a>
  );
};

export default KontakKami;
