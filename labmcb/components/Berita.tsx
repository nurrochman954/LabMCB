"use client";

import React, { useState } from "react";

const Berita: React.FC = () => {
  // State untuk melacak slide gambar aktif
  const [currentSlide, setCurrentSlide] = useState(0);

  // Data dummy untuk gambar slider
  const gambarSlider = [
    "/assets/borobudur.svg",
    "/assets/borobudur.svg",
    "/assets/borobudur.svg",
  ];

  // Data dummy untuk berita
  const berita = [
    {
      id: 1,
      title: "Berita Terbaru 1",
      link: "/berita/1",
    },
    {
      id: 2,
      title: "Berita Terbaru 2",
      link: "/berita/2",
    },
    {
      id: 3,
      title: "Berita Terbaru 3",
      link: "/berita/3",
    },
  ];

  // Fungsi untuk berpindah slide gambar
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % gambarSlider.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + gambarSlider.length) % gambarSlider.length);
  };

  return (
    <section className="py-16 bg-white flex justify-center items-center" id="berita-terbaru">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center space-x-8">
        {/* Slider Gambar */}
        <div className="relative w-[45%] h-64 md:h-80 flex justify-center items-center overflow-hidden">
          {/* Wrapper untuk gambar slider */}
          <div className="relative w-full h-full flex justify-center items-center">
            {gambarSlider.map((imgSrc, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-all duration-500 transform ${
                  index === currentSlide
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <img
                  src={imgSrc}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Indikator & Navigasi di bawah gambar */}
          <div className="absolute bottom-4 flex items-center justify-center space-x-4 w-full">
            {/* Tombol Kiri */}
            <button
              onClick={prevSlide}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200 opacity-50 hover:opacity-100"
            >
              &#8592;
            </button>

            {/* Titik Indikator */}
            <div className="flex space-x-2">
              {gambarSlider.map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                ></span>
              ))}
            </div>

            {/* Tombol Kanan */}
            <button
              onClick={nextSlide}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200 opacity-50 hover:opacity-100"
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* Teks Deskripsi */}
        <div className="w-[45%] flex flex-col justify-center text-left">
          <h2 className="text-3xl font-bold">Berita Terbaru</h2>
          <p className="mt-4">
            Klik berita untuk membaca lebih lanjut tentang aktivitas terbaru.
          </p>
          {/* Judul berita dengan tautan */}
          <ul className="mt-4">
            {berita.map((item) => (
              <li
                key={item.id}
                className="underline text-indigo-600 hover:text-indigo-800 mb-2"
              >
                <a href={item.link}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Berita;
