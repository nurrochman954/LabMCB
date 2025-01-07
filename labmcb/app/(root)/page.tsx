import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TopBar from "../../components/TopBar";
import Hero from "../../components/Hero";
import Berita from "../../components/Berita";
import TentangKami from "../../components/TentangKami";
import Fasilitas from "../../components/Fasilitas";
import PendaftaranAnalisis from "../../components/PendaftaranAnalisis";

const Home = () => {
  return (
    <>
      <Header />
      <TopBar />
      <Hero />
      <Berita />
      <Fasilitas />
      <PendaftaranAnalisis />
      <TentangKami />
      <Footer />
    </>
  );
};

export default Home;