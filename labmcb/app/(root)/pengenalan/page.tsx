"use client";

import React from "react";
import Header from "@/components/Header";
import TopBar from "../../../components/TopBar";
import LabProfile from "@/components/LabProfile";
import Footer from "@/components/Footer";
import StrukturOrganisasi from "../../../components/StrukturOrganisasi";

const Pengenalan: React.FC = () => {
  return (
    <>
      <Header/>
      <TopBar />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-0 mt-10 ">Pengenalan</h1>
      </div>
      <LabProfile
        imageUrl="https://lingkar.co/wp-content/uploads/2021/03/candi-borobudur-magelang-jawa-tengah.jpg" 
        text="Lab Konservasi Cagar Budaya Borobudur adalah pusat riset dan pelestarian yang didedikasikan untuk menjaga dan merawat warisan budaya dunia, Borobudur. Dengan menggabungkan teknologi modern dan teknik konservasi tradisional, kami berkomitmen untuk memastikan kelestarian candi ini untuk generasi yang akan datang.
  Kami terdiri dari tim ahli yang bekerja secara kolaboratif untuk melaksanakan penelitian, pemulihan, dan pelestarian struktur serta artefak yang ada di situs yang memiliki nilai sejarah dan budaya yang tinggi. Melalui kolaborasi ini, kami berusaha untuk menerapkan praktik terbaik dalam pelestarian warisan budaya. Kami juga berfokus pada inovasi dan penggunaan teknologi digital untuk mendokumentasikan dan memetakan situs sehingga informasi dan pengetahuan tentang Borobudur dapat diakses oleh generasi mendatang. "
      />
      <StrukturOrganisasi />
      <Footer/>
    </>
  );
};

export default Pengenalan;