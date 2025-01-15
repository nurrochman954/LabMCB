import React from 'react';

interface LabProfileProps {
  imageUrl: string;
  text: string;
}

const LabProfile: React.FC<LabProfileProps> = ({ imageUrl, text }) => {
  const LabProfileStyle: React.CSSProperties = {
    display: 'flex',
    maxWidth: '1000px',
    height: 'auto',
    margin: '10px auto',
    background: 'radial-gradient(farthest-corner at 80% 80%, #FED9B7 0%, #F8AD96 45%, #F7A38E 57%, #F59986 63%, #F17C6F 86%, #F07167 100%)',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    color: '#000',
    fontFamily: 'Lato, sans-serif',
    flexDirection: 'row', // Set the flex direction to row
    alignItems: 'center',
  };

  const imageStyle: React.CSSProperties = {
    width: '40%', // Adjust the width to take up less space
    borderRadius: '12px',
    marginLeft: '40px',
    objectFit: 'cover',
    maxWidth: '480px', // Adjust max dimensions to fit the new layout
    maxHeight: '280px',
  };

  const textStyle: React.CSSProperties = {
    textAlign: 'justify',
    lineHeight: '1.4',
    marginLeft: '40px',
    marginRight: '30px',
    marginBottom: '30px',
    marginTop: '30px',
    flex: '1',
  };

  return (
    <div style={LabProfileStyle}>
      <img src={imageUrl} alt="Lab Profile" style={imageStyle} />
      <p style={textStyle}>{text}</p>
    </div>
  );
};

export default LabProfile;
