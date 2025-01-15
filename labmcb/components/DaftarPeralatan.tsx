"use client";

import React from "react";
import { useRouter } from "next/navigation"; // for programmatic navigation

interface PeralatanCardProps {
  imageSrc: string; // Prop for dynamic image source
  title: string;    // Prop for the overlay text
  linkTo: string;   // Prop for the navigation link
}

const PeralatanCard: React.FC<PeralatanCardProps> = ({ imageSrc, title, linkTo }) => {
  const router = useRouter();

  // Navigate to the link
  const handleNavigate = () => {
    router.push(linkTo); // Navigates to the link provided in the `linkTo` prop
  };

  return (
    <div className="w-[200px] h-[200px]  cursor-pointer" onClick={handleNavigate} >
      <div className="relative rounded-lg overflow-hidden w-full h-full">
        {/* Image */}
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Overlay */}
        <div
          className="absolute top-0 left-0 right-0 bg-[#FED9B7]/80 p-2 cursor-pointer hover:bg-[#FED9B7]/90 transition-colors"
        >
          <span className="text-black font-semibold text-sm">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PeralatanCard;
