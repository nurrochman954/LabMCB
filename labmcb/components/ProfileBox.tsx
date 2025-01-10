import React from 'react';

interface ProfileBoxProps {
  text: string;
  imageUrl?: string;
}

const ProfileBox: React.FC<ProfileBoxProps> = ({ text, imageUrl }) => {
  // Define the style for the gradient background
  const gradientStyle: React.CSSProperties = {
    height: '240px',
    background: 'radial-gradient(circle, #FED9B7 0%, #F8AD96 45%, #F7A38E 57%, #F59986 63%, #F17C6F 86%, #F07167 100%)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    color: '#000',
    fontSize: '2rem',
    fontFamily: 'Lato, sans-serif',
  };

  const imageStyle: React.CSSProperties = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginRight: '20px',
    objectFit: 'cover',
  };

  return (
    <div style={gradientStyle}>
      {imageUrl && <img src={imageUrl} alt="Profile" style={imageStyle} />}
      <h1>{text}</h1>
    </div>
  );
};

export default ProfileBox;