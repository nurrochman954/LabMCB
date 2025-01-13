"use client";

import React from "react";

interface PeralatanCardProps {
  imageSrc: string; // Prop for dynamic image source
  title: string;    // Prop for the overlay text
}

const PeralatanCard: React.FC<PeralatanCardProps> = ({ imageSrc, title }) => {
  return (
    <div className="w-[200px] h-[200px]">
      <div className="relative rounded-lg overflow-hidden w-6/7 h-200">
        {/* Image */}
        <img
          src={imageSrc}
          className="w-full h-full object-cover rounded-lg"
        />
        
        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bg-[#FED9B7]/80 p-2">
          <span className="text-black font-semibold text-sm">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PeralatanCard;
