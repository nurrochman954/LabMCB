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
    <>   <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0", flex : 1}}>
      <DeskripsiPeralatan
        mainTitle="Schmidt Hammer"
        imageUrl="/assets/noimg.png"
        rightText={
          "Untuk mengukur kekuatan material. Output berupa data kekuatan material" 
        }
        leftText={
            "Merk : Proceq"}
            />

        <Table title="Informasi Penyewaan Peralatan" headers={rentalHeaders} data={rentalData} />
      </div>
        <KontakKami/>
      <Footer /></div>
    </>
  );
};

export default DaftarPeralatan;
