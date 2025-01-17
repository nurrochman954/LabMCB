import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Table from "@/components/Table";
import KontakKami from "@/components/KontakKami";
import DeskripsiPeralatan from "@/components/DeksripsiPeralatan";

const DaftarPeralatan = () => {
  const sampleHeaders = ['Jenis', 'Harga per Sampel',];
  const sampleData = [
    ['UV-Vis sampel (kualitatif) padat', 'Rp200.000,00/sampel'],
    ['UV-Vis sampel (kuantitatif) cair', 'Rp200.000,00/sampel'],
    ['Preparasi sampel', 'Rp50.000,00/sampel'],
  ];


  return (
    <>   <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0", flex: 1 }}>
      <DeskripsiPeralatan
        mainTitle="UV-Vis (Ultraviolet-Visible)"
        imageUrl="/assets/UV_vis.jpg"
        rightText={
            "Spektrofotometer UV-Vis adalah suatu instrument yang digunakan untuk mengukur absorban suatu sampel pada panjang gelombang tertentu pada panjang gelombang di daerah UV (200-400 nm) dan daerah visible (400-800 nm). Sampel yang diuji dengan alat ini adalah sampel cair yang didalamnya mengandung  senyawa yang bergugus kromofor dan dapat digunakan untuk sampel berwarna. UV-Vis dengan sample padat berfungsi untuk mengetahui panjang gelombang setiap  material sehingga dapat ditentukan nilai energi celah pita setiap material. Output berupa grafik spektrum panjang gelombang.\n\n" +
            "Syarat sampel (kualitatif) padat:\n" +
            "• Sampel berupa padatan dan kering.\n\n" +
            "Syarat sampel (kuantitatif) cair:\n" +
            "• Sampel berupa cairan.\n" +
            "• Volume minimal sampel cairan 5 mL.\n" +
            "• Jika sampel membutuhkan preparasi akan dikenakan biaya tambahan" 
        }
        leftText={
            "Merk : Agilent\n" + 
            "Tipe : Cary 60"}
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
      </div>
        <KontakKami/>
      <Footer /></div>
    </>
  );
};

export default DaftarPeralatan;
