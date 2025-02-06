'use client';
import React from 'react';

interface ProfileBoxProps {
  text: string;
  imageUrl?: string;
 }
 
 const ProfileBox: React.FC<ProfileBoxProps> = ({ text, imageUrl }) => {
  const defaultImage = "/default-avatar.png";
 
  const gradientStyle: React.CSSProperties = {
    height: '120px',
    marginBottom: '12px', 
    background: 'linear-gradient(to right, #FDD5B2, #F27C70)',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '0 20px 20px 20px',
    color: '#000',
    fontSize: '1.5rem',
    fontFamily: 'Lato, sans-serif',
  };
 
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '30px',
  };
 
  const imageStyle: React.CSSProperties = {
    width: '50px', 
    height: '50px',
    borderRadius: '50%',
    marginRight: '15px',
    objectFit: 'cover',
  };
 
  return (
    <div style={gradientStyle}>
      <div style={containerStyle} className="w-[900px] justify-center">
        <img 
          src={imageUrl || defaultImage} 
          alt="Profile" 
          style={imageStyle}
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
        />
        <h1>{text}</h1>
      </div>
    </div>
  );
 };
 
 export default ProfileBox;