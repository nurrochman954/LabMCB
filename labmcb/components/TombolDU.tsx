import React from 'react';

interface ButtonDUProps {
  text: string; 
  variant?: 'primary' | 'secondary'; // Style variant: primary or secondary
  href?: string; // Optional link for navigation
  onClick?: () => void; // Optional click handler
  showIcon?: boolean; // Optional prop to control whether the icon is displayed
}

const ButtonDU: React.FC<ButtonDUProps> = ({ 
  text, 
  variant = 'primary', 
  href, 
  onClick, 
  showIcon = true // Default to true if not provided
}) => {
  // Define class names for primary and secondary variants
  const classNames = variant === 'primary'
    ? "bg-softsec text-white px-3 py-1 rounded-md text-lg hover:bg-secondary flex items-center z-50"
    : "bg-white text-black px-3 py-1 rounded-md text-lg hover:bg-softsec border-2 border-softsec flex items-center z-50";

  // Define icons for different variants
  const imageSrc = variant === 'primary' ? "/assets/fileputih.png" : "/assets/unduhhitam.png";
  const imageAlt = variant === 'primary' ? "Unggah" : "Download";

  // If `href` is provided, render an <a> tag for navigation
  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
      >
        {showIcon && (
          <img src={imageSrc} alt={imageAlt} className="inline-block w-5 h-5 mr-2" />
        )}
        {text}
      </a>
    );
  }

  // Otherwise, render a button with an `onClick` handler
  return (
    <button
      onClick={onClick}
      className={classNames}
      style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
    >
      {showIcon && (
        <img src={imageSrc} alt={imageAlt} className="inline-block w-5 h-5 mr-2" />
      )}
      {text}
    </button>
  );
};

export default ButtonDU;
