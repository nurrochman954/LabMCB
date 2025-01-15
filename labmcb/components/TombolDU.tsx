import React from 'react';

interface ButtonDUProps {
    text: string; 
    variant?: 'primary' | 'secondary'; // primary yang warna fill, secondary yang putih pake outline
}

const ButtonDU: React.FC<ButtonDUProps> = ({ text, variant = 'primary' }) => {
    return (
        <>
            {variant === 'primary' && (
                <button
                    className="bg-softsec text-white px-3 py-1 rounded-md text-lg hover:bg-secondary flex items-center"
                    style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                >
                    <img src="/assets/fileputih.png" alt="Unggah" className="inline-block w-5 h-5 mr-2" />
                    {text}
                </button>
            )}
            {variant === 'secondary' && (
                <button
                    className="bg-white text-black px-3 py-1 rounded-md text-lg hover:bg-softsec border-2 border-softsec flex items-center"
                    style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                >
                    <img src="/assets/unduhhitam.png" alt="Download" className="inline-block w-5 h-5 mr-2" />
                    {text}
                </button>
            )}
        </>
    );
};

export default ButtonDU;
