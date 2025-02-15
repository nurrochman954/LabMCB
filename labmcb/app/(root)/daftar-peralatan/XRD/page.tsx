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
    ['Dengan tanpa interpretasi data', 'Rp300.000,00/sampel'],
    ['Dengan interpretasi data', 'Rp800.000,00/sampel'],
    ['Preparasi sampel', 'Rp80.000,00/sampel'],
  ];


  return (
    <>   <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0", flex: 1 }}>
      <DeskripsiPeralatan
        mainTitle="XRD (X-Ray Diffraction)"
        imageUrl="/assets/XRD.jpg"
        rightText={
            "XRD memberikan informasi mengenai karakteristik material terutama mineralogi dan kekristalannya. Output berupa grafik XRD tanpa interpretasi data dan grafik XRD dengan interpretasi data.\n" +
            "Syarat sampel:\n" +
            "• Sampel dapat berupa serbuk.\n" +
            "• Sampel berupa padatan sebaiknya memiliki permukaan (atas dan bawah) rata.\n" +
            "• Ukuran minimal diameter 2 cm.\n" +
            "• Sampel kering total, tidak volatil, tidak korosif, tidak bersifat asam.\n" +
            "• Berat Sampel minimal 10 gram\n" +
            "• Jika sampel membutuhkan preparasi akan dikenakan biaya tambahan."
        }
        leftText={
            "Merk : Malvern Panalytical\n" + 
            "Tipe : Empyrean"}
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
      </div>
        <KontakKami/>
      <Footer /></div>
    </>
  );
};

export default DaftarPeralatan;
