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
    ['Ultrasonic Hardnest Tester', 'Rp100.000,00/hari', 'Harga belum termasuk biaya packaging dan lungsump operator.'],
  ];

  return (
    <>   <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0", flex: 1 }}>
      <DeskripsiPeralatan
        mainTitle="Ultrasonic Hardnest Tester"
        imageUrl="/assets/noimg.png"
        rightText={
          "Mengukur kekerasan dari berbagai jenis material terutama logam dan alloy. Jenis logam yang dapat diukur dengan akurat dan terstandar meliputi steel, alloy steel, stainless steel, cast iron, aluminum, brass, bronze dan copper. Output berupa data kekerasan" 
        }
        leftText={
            "Merk : Novotest"}
            />
    
        <Table title="Informasi Penyewaan Peralatan" headers={rentalHeaders} data={rentalData} />
      </div>
        <KontakKami/>
      <Footer /></div>
    </>
  );
};

export default DaftarPeralatan;
