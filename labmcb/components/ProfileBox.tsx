import React from 'react';

interface ProfileBoxProps {
  text: string;
  imageUrl?: string;
}

const ProfileBox: React.FC<ProfileBoxProps> = ({ text, imageUrl }) => {
  // Define the style for the gradient background
  const gradientStyle: React.CSSProperties = {
    height: '120px',
    marginBottom: '12px',
    background: 'radial-gradient(circle, #FED9B7 0%, #F8AD96 45%, #F7A38E 57%, #F59986 63%, #F17C6F 86%, #F07167 100%)',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '0 20px 20px 20px',
    color: '#000',
    fontSize: '1.5rem',
    fontFamily: 'Lato, sans-serif',
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center', // Mengatur alignment vertical ke tengah
    paddingLeft: '30px', // Menambahkan padding kiri untuk menggeser ke kanan
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
      <div style={containerStyle}>
        {imageUrl && <img src={imageUrl} alt="Profile" style={imageStyle} />}
        <h1>{text}</h1>
      </div>
    </div>
  );
};

export default ProfileBox;