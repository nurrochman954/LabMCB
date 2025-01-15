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
    ['UPV (Ultrasonic Pulse Velocity)', 'Rp250.000,00/hari', 'Harga belum termasuk biaya packaging dan lungsump operator.'],
  ];

  return (
    <>  
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
      <DeskripsiPeralatan
        mainTitle="UPV (Ultrasonic Pulse Velocity)"
        imageUrl="https://www.tawada-ndt.com/wp-content/uploads/2023/06/Handheld-XRF-Jan.png"
        rightText={
          "Nondestructive testing untuk mengetahui kualitas  dan kekuatan material (beton, batu, material lainnya) serta kedalaman retakan. Output berupa kecepatan rambat gelombang." 
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
