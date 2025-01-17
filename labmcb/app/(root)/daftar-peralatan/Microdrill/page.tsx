import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Table from "@/components/Table";
import KontakKami from "@/components/KontakKami";
import DeskripsiPeralatan from "@/components/DeksripsiPeralatan";

const DaftarPeralatan = () => {
  const sampleHeaders = ['Jenis', 'Harga per Sampel'];
  const sampleData = [
    ['Microdrill/DRMS', 'Rp100.000,00/sampel'],
  ];

  const rentalHeaders = ['Jenis', 'Harga per Hari', 'Keterangan'];
  const rentalData = [
    ['Microdrill/DRMS', 'Rp500.000,00/hari', 'per hari max. 10 titik pengukuran.  belum termasuk biaya packaging dan lumsump operator.'],
  ];

  return (
    <>   <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0", flex: 1 }}>
      <DeskripsiPeralatan
        mainTitle="Microdrill/ DRMS"
        imageUrl="https://www.tawada-ndt.com/wp-content/uploads/2023/06/Handheld-XRF-Jan.png"
        rightText={
            "Berfungsi untuk melakukan pengukuran ketahanan pengeboran yang sederhana namun spesifik. Sistem pengukuran ketahanan pengeboran untuk pengujian penting dalam rangka untuk mengkarakterisasi batu dan material lainnya secara mendalam. Output berupa grafik kekerasan material.\n\n" +
            "Syarat sampel:\n" +
            "• Aplikasi untuk dinding bangunan.\n" +
            "• Sampel berupa padatan.\n" +
            "• Permukaan sampel rata.\n" +
            "• Luasan permukaan sampel minimal 5x5x5 cm.\n" +
            "• Kedalaman pengeboran maksimal 5 cm."
        }
        leftText={

            "Merk : SINT Technology\n" +
            "Tipe : DRMS cordless"}
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
        <Table title="Informasi Penyewaan Peralatan" headers={rentalHeaders} data={rentalData} />
      </div>
        <KontakKami/>
      <Footer /></div>
    </>
  );
};

export default DaftarPeralatan;
