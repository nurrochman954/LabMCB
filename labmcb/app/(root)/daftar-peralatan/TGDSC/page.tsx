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
    ['TG/ DSC', 'Rp500.000,00/sampel'],
  ];


  return (
    <>   <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0", flex: 1 }}>
      <DeskripsiPeralatan
        mainTitle="TG/DSC (Thermogravimetric/Differential Scanning Calorimetry)"
        imageUrl="https://image.made-in-china.com/202f0j00viGqONbtMyke/Full-Automatic-DSC-Differential-Scanning-Calorimeter-Testing-DSC-Calorimeter-Analysis-Machine.webp"
        rightText={
            "Thermogravimetri adalah teknik untuk mengukur perubahan berat dari suatu senyawa sebagai fungsi dari suhu ataupun waktu. Teknik yang berhubungan dengan DTA adalah differential scanning calorimetry (DSC). Pada DSC, peralatan didesain untuk memungkinkan pengukuran kuantitatif perubahan entalpi yang timbul dalam sampel sebagai fungsi dari suhu maupun waktu.Output berupa thermografik, berupa rekaman diagram yang contineau; reaksi dekomposisi satu tahap yang skematik.\n\n" +
            "Syarat sampel:\n" +
            "• Sampel dapat berupa padatan kering atau serbuk.\n" +
            "• Kuantitas sampel berkisar antara 10-15 mg.\n" +
            "• Suhu pengujian maksimal 1500 Celcius."
        }
        leftText={
            "Merk : Perkin Elmer\n" + 
            "Tipe : STA 8000"}
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
      </div>
        <KontakKami/>
      <Footer /></div>
    </>
  );
};

export default DaftarPeralatan;
