import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TopBar from "../../components/TopBar";
import Hero from "../../components/Hero";
import TentangKami from "../../components/TentangKami";
import PendaftaranAnalisis from "../../components/PendaftaranAnalisis";
import PenyewaanAlat from "../../components/PenyewaanAlat";
import Berita from "@/components/Berita";

const Home = () => {
  const slides = [
    { src: "/assets/berita1.jpg" },
    { src: "/assets/berita2.jpg" },
    { src: "/assets/berita3.jpeg"},
  ];

  return (
    <>
      <Header />
      <TopBar />
      <Hero />
      <Berita slides={slides}/>
      <PendaftaranAnalisis />
      <PenyewaanAlat />
      <TentangKami />
      <Footer />
    </>
  );
};

export default Home;
