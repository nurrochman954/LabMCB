"use client";

import Link from "next/link";

const TentangKami = () => {
  return (
    <section id="about" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Tentang Kami</h2>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto">
          Lab Konservasi Cagar Budaya Borobudur adalah pusat riset dan
          pelestarian yang didedikasikan untuk menjaga dan merawat warisan
          budaya dunia, Borobudur. Dengan menggabungkan teknologi modern dan
          teknik konservasi tradisional, kami berkomitmen untuk memastikan
          kelestarian candi ini untuk generasi yang akan datang.
        </p>
        <Link
          href="/pengenalan"
          className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-md font-semibold transition-transform transform hover:scale-105"
        >
          Read More
        </Link>
      </div>
    </section>
  );
};

export default TentangKami;