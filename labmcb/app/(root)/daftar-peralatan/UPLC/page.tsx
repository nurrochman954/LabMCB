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
    ['UPLC–MSMS', 'Rp800.000,00/sampel'],
  ];


  return (
    <>  
     <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0", flex: 1}}>
      <DeskripsiPeralatan
        mainTitle="UPLC–MSMS (Ultra Performance Liquid Chromatography- Mass Spectrometry)"
        imageUrl="https://tokoalatpengujian.wordpress.com/wp-content/uploads/2017/11/universal-testing-machine.jpg?w=1081"
        rightText={
            "Mengonfirmasikan senyawa target. Output berupa grafik chromatogram kualitatif.\n\n" +
            "Syarat sampel:\n" +
            "• Sampel berbentuk cair sudah siap inject tanpa perlakuan derivatisasi.\n" +
            "• Menginformasikan pelarut yang digunakan.\n" +
            "• Menginformasikan senyawa target.\n" +
            "• Customer menyediakan metode.\n" +
            "• Apabila customer menginginkan hasil kuantitatif, maka larutan standar dari customers.\n" +
            "• Volume sampel minimal 2 ml."
        }
        leftText={
            "Merk : Waters\n" + 
            "Tipe : Xevo TQ-micro Type LC-MS-MS (triple Quad)"}
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
      </div>
        <KontakKami/>
      <Footer /></div>
    </>
  );
};

export default DaftarPeralatan;
