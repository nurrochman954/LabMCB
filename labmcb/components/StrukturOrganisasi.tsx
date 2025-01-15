import React from 'react';
import Image from 'next/image';

const StrukturOrganisasi = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Struktur Organisasi Section */}
      <section className="mb-0 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Text Content - Takes 1 column */}
          <div 
          style = {{
              marginTop :'50px'
          }} >
            <h2 className="text-3xl font-bold mb-4">
              Struktur
              <br />
              Organisasi
            </h2>
            <p className="text-justify max-w-xs">
            Laboratorium Konservasi dan Dokumentasi Cagar Budaya terdiri dari lima laboratorium utama: Kimia, Biologi, Material, Fisik, dan Dokumentasi. 
            Setiap laboratorium memiliki spesialisasi dan tim ahli yang dipimpin oleh PJ Konservasi Cagar Budaya di bawah koordinasi Ketua Tim Konservasi Koleksi & CB.
            </p>
          </div>
          
          {/* Image Content - Takes 2 columns */}
          <div className="relative w-full h-[300px] md:col-span-2">
            <Image
              src="/assets/StrukturOrganisasi.png"
              alt="Struktur Organisasi"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-20">
        {/* Visi */}
        <section className="rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Visi</h2>
          <p className="text-justify">
            Menjadi Laboratorium Konservasi dan Dokumentasi Cagar Budaya yang Terkemuka, 
            Terakreditasi, dan Berstandar internasional dalam pelayanan, pengujian dan analisis.
          </p>
        </section>

        {/* Misi */}
        <section className="rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Misi</h2>
          <ol className="list-decimal list-inside space-y-2 text-justify">
            <li>Menerapkan cara berlaboratorium yang baik dan benar serta sistem manajemen mutu yang sesuai ISO/IEC 17025:2017.</li>
            <li>Melaksanakan pengujian analisis material cagar budaya yang berbasis kompetensi, profesional, dengan menggunakan standar yang diakui nasional, regional, maupun internasional untuk mencapai kepuasan pengguna jasa.</li>
            <li>Menghasilkan data pengujian yang cepat, tepat, akurat, dan terpercaya.</li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default StrukturOrganisasi;