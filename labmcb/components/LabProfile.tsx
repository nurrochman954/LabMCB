import React from 'react';

interface LabProfile {
  imageUrl: string;
  text: string;
}

const LabProfile: React.FC<LabProfile> = ({ imageUrl, text }) => {
  const LabProfileStyle: React.CSSProperties = {
    maxWidth: '600px',
    margin: '60px auto',
    background: 'radial-gradient(farthest-corner at 80% 80%, #FED9B7 0%, #F8AD96 45%, #F7A38E 57%, #F59986 63%, #F17C6F 86%, #F07167 100%)',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    color: '#000',
    fontFamily: 'Lato, sans-serif',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: '12px',
    marginBottom: '20px',
    objectFit: 'cover',
    maxWidth: '480px',
    maxHeight: '280px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto' 
  };

  const textStyle: React.CSSProperties = {
    textAlign: 'justify',
    lineHeight: '1.4',
    marginTop: '20px',
    marginLeft: '20px',
    marginRight: '20px'
  };

  return (
    <div style={LabProfileStyle}>
      <img src={imageUrl} alt="LabProfile" style={imageStyle} />
      <p style={textStyle}>{text}</p>
    </div>
  );
};

export default LabProfile;
