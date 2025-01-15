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
    ['NMR   ', 'Rp500.000,00/sampel'],
  ];


  return (
    <>  
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
      <DeskripsiPeralatan
        mainTitle="NMR (Nuclear Magnetic Resonance)"
        imageUrl="https://tokoalatpengujian.wordpress.com/wp-content/uploads/2017/11/universal-testing-machine.jpg?w=1081"
        rightText={
            "Menentukan struktur kimia dari molekul dalam senyawa. Output berupa spektum prediksi stuktur molekul\n\n" +
            "Syarat sampel:\n" +
            "• Sampel harus murni dan bukan merupakan senyawa campuran.\n" +
            "• Ekstrak sampel dilarutkan dalam pelarut deuterasi.\n" +
            "• Sampel harus dipreparasi dalam bentuk larutan.\n" +
            "• Sampel larut dalam pelarut organik.\n" +
            "• Wajib menginformasikan senyawa target."
        }
        leftText={
            "Merk : Oxford x-Pulse\n" + 
            "Tipe : XP–HFX–3087 60 Hz"}
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
      </div>
        <KontakKami/>
      <Footer />
    </>
  );
};

export default DaftarPeralatan;
