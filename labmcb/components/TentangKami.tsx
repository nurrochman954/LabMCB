"use client";

import Link from "next/link";

const TentangKami = () => {
  return (
    <section id="about" className="py-12 space-y-12">
      <div className="relative container mx-auto px-4">
        {/* Rectangle Shape with Custom Drop Shadow */}
        <div
          className="bg-softaccent absolute top-[-60px] left-1/2 transform -translate-x-1/2 bg-gray-100 rounded-2xl w-[650px] h-[500px] shadow-[3px_8px_4px_#00000040]"
        ></div>

        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">Tentang Kami</h2>
          <p className="text-gray-700 text-base md:text-lg max-w-[580px] mx-auto leading-6 text-justify text-[17px]">
          Lab Konservasi Cagar Budaya Borobudur adalah pusat riset dan pelestarian yang didedikasikan untuk menjaga dan merawat warisan budaya dunia, Borobudur. Dengan menggabungkan teknologi modern dan teknik konservasi tradisional, kami berkomitmen untuk memastikan kelestarian candi ini untuk generasi yang akan datang.   <br /><br />

Kami terdiri dari tim ahli yang berpengalaman dalam bidang arkeologi, konservasi, dan pemeliharaan budaya, yang bekerja secara kolaboratif untuk melaksanakan penelitian, pemulihan, dan pelestarian struktur serta artefak yang ada di situs...
          </p>
          <Link
            href="/pengenalan"
            className="mt-6 inline-flex items-center bg-secondary text-white px-6 py-3 rounded-md font-semibold transition-transform transform hover:scale-105 shadow-[3px_8px_4px_#00000040]"
          >
            Read More
            <img
              src="/assets/rightarrow.png"
              alt="arrow icon"
              className="ml-2 w-6 h-6 transform scale-75"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TentangKami;
