"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Slide {
  src: string;
  link: string;  
}

interface BeritaProps {
  slides: Slide[];
}

const Berita: React.FC<BeritaProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleImageClick = (link: string) => {
    router.push(link);
  };

  return (
    <section className="py-16 bg-white flex justify-center items-center" id="berita-terbaru">
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
                onClick={() => handleImageClick(img.link)}
              >
                <img
                  src={img.src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={prevSlide}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200 opacity-75 hover:opacity-100"
          >
            &#8592;
          </button>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? "bg-indigo-600" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200 opacity-75 hover:opacity-100"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Berita;
