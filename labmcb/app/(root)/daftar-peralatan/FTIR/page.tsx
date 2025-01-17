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
    ['Tanpa library', 'Rp250.000,00/sampel'],
    ['Dengan library', 'Rp350.000,00/sampel'],
    ['Preparasi sampel', 'Rp50.000,00/sampel'],
  ];


  return (
    <>   <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0", flex: 1}}>
      <DeskripsiPeralatan
        mainTitle="FTIR (Fourier Transform InfraRed)"
        imageUrl="/assets/FTIR.jpg"
        rightText={
            "Alat yang berfungsi untuk mengidentifikasi senyawa dan analisis gugus fungsi dalam senyawa kimia. Output berupa spektrum absorben/transmitten dan nilai peak.\n\n" +
            "Syarat sampel:\n" +
            "• Sampel dapat berupa organik dan anorganik.\n" +
            "• Sampel padatan berupa serbuk kering berat minimal 1 gram.\n" +
            "• Sampel cair tidak mengandung pelarut air (non-waterbase) dengan volume minimal 1 mL.\n" +
            "• Sampel plastik atau rubber menggunakan ATR.\n" +
            "• Sampel tidak boleh mengandung pelarut asam kuat (H₂SO₄, HCl).\n" +
            "• Sampel minimal: padatan 1 gram, cairan 1 mL.\n" +
            "• Jika sampel membutuhkan preparasi, akan dikenakan biaya tambahan."
        }
        leftText={
            "Merk : Perkin Elmer\n" + 
            "Tipe : L1600300 Spectrum Two"}
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
      </div>
        <KontakKami/>
      <Footer /></div>
    </>
  );
};

export default DaftarPeralatan;
