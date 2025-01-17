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
    ['Rotary Vacuum Evaporator', 'Rp150.000,00/sampel'],
  ];


  return (
    <>   <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0", flex : 1}}>
      <DeskripsiPeralatan
        mainTitle="Rotary Vacuum Evaporator"
        imageUrl="/assets/noimg.png"
        rightText={
            "Merupakan alat untuk memisahkan pelarut dari larutan untuk mendapatkan larutan yang lebih pekat dengan cara mengubah pelarut dari cair menjadi uap. Output berupa ekstraksi.\n\n" +
            "Syarat sampel:\n" +
            "• Menginformasikan pelarut yang digunakan pada sampel.\n" +
            "• Sampel berbentuk cair.\n" +
            "• Sampel sudah dipreparasi dan siap untuk dipekatkan.\n" +
            "• Tempat hasil evaporator berupa botol vial disediakan oleh customer.\n" +
            "• Volume maksimal dalam satu kali rotary 300 mL.\n" +
            "• Pengambilan hasil ekstraksi paling lama 2 hari setelah ekstraksi selesai, jika tidak diambil maka akan dimusnahkan.\n" +
            "• Customer wajib membawa wadah hasil ekstraksi."
        }
        leftText={
            "Merk : Buchi\n" + 
            "Tipe : BX 53"}
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
      </div>
        <KontakKami/>
      <Footer /></div>
    </>
  );
};

export default DaftarPeralatan;
