"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Slide {
  src: string;
}

interface BeritaProps {
  slides: Slide[];
}

const Berita: React.FC<BeritaProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPrevHovered, setIsPrevHovered] = useState(false);
  const [isNextHovered, setIsNextHovered] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="py-10 bg-white flex justify-center items-center" id="berita-terbaru">
      <div className="container mx-auto flex flex-col justify-center items-center space-y-8">
        <div className="relative w-full max-w-3xl h-64 md:h-80 flex overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((img, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full"
                  style={{ borderRadius: '14px', width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center space-x-3">
          {/* Left Arrow Button with smoother hover effect */}
          <button
            onClick={prevSlide}
            onMouseEnter={() => setIsPrevHovered(true)}
            onMouseLeave={() => setIsPrevHovered(false)}
            className="p-2"
          >
            <img
              src={isPrevHovered ? "/assets/leftarrowblack.png" : "/assets/leftarrowgray.png"}
              alt="Left Arrow"
              className="w-4 h-4 transition-all duration-300 ease-in-out"
            />
          </button>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? "bg-secondary" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>

          {/* Right Arrow Button with smoother hover effect */}
          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsNextHovered(true)}
            onMouseLeave={() => setIsNextHovered(false)}
            className="p-2"
          >
            <img
              src={isNextHovered ? "/assets/rightarrowblack.png" : "/assets/rightarrowgray.png"}
              alt="Right Arrow"
              className="w-4 h-4 transition-all duration-300 ease-in-out"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Berita;
