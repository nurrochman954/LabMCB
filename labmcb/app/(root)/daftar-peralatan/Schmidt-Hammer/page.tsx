import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Table from "@/components/Table";
import KontakKami from "@/components/KontakKami";
import DeskripsiPeralatan from "@/components/DeksripsiPeralatan";

const DaftarPeralatan = () => {
  const rentalHeaders = ['Jenis', 'Harga per Hari', 'Keterangan'];
  const rentalData = [
    ['Schmidt Hammer ', 'Rp200.000,00/hari', 'Menandatangani surat pernyataan bermaterai.'],
  ];

  return (
    <>  
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
      <DeskripsiPeralatan
        mainTitle="Schmidt Hammer"
        imageUrl="https://www.tawada-ndt.com/wp-content/uploads/2023/06/Handheld-XRF-Jan.png"
        rightText={
          "Untuk mengukur kekuatan material. Output berupa data kekuatan material" 
        }
        leftText={
            "Merk : Proceq"}
            />

        <Table title="Informasi Penyewaan Peralatan" headers={rentalHeaders} data={rentalData} />
      </div>
        <KontakKami/>
      <Footer />
    </>
  );
};

export default DaftarPeralatan;
