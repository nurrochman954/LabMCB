import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TopBar from "../../components/TopBar";
import Hero from "../../components/Hero";
import TentangKami from "../../components/TentangKami";
import Fasilitas from "../../components/Fasilitas";
import PendaftaranAnalisis from "../../components/PendaftaranAnalisis";
import PenyewaanAlat from "../../components/PenyewaanAlat";
import Berita from "@/components/Berita";

const Home = () => {
  const slides = [
    { src: "/assets/berita1.jpg", link: "https://kebudayaan.kemdikbud.go.id/bkborobudur/arsip-konservasi-borobudur-jejak-sejarah-yang-menjadi-memori-dunia/" },
    { src: "/assets/berita2.jpg", link: "https://kebudayaan.kemdikbud.go.id/bkborobudur/tingkatkan-pengetahuan-siswa-sdn-mranggen-1-lakukan-kunjungan-edukasi-ke-candi-borobudur/" },
    { src: "/assets/berita3.jpeg", link: "https://kebudayaan.kemdikbud.go.id/bkborobudur/cultural-visit-delagasi-seameo-seamolec/" },
  ];

  return (
    <>
      <Header />
      <TopBar />
      <Hero />
      <Berita slides={slides}/>
      <Fasilitas />
      <PendaftaranAnalisis />
      <PenyewaanAlat />
      <TentangKami />
      <Footer />
    </>
  );
};

export default Home;
