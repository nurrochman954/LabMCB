"use client";

import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="bg-bannerImg bg-no-repeat bg-cover bg-bottom"
      style={{ height: "100vh" }}
    >
      <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-center px-4">
          <h1
            className="text-white text-2xl md:text-3xl lg:text-4xl"
            style={{ fontFamily: 'BODAR' }}
          >
            Laboratorium Konservasi
            <br />
            Cagar Budaya Borobudur
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;