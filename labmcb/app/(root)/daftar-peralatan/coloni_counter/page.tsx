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
    ['Colony Counter', 'Rp100.000,00/sampel'],
  ];


  return (
    <>   <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0", flex: 1 }}>
      <DeskripsiPeralatan
        mainTitle="Colony Counter"
        imageUrl="/assets/coloni_counter.jpg"
        rightText={
            "Merupakan alat bantu yang digunakan untuk menghitung koloni bakteri secara otomatis yang ditumbuhkan di media yang disimpan dalam cawan petri. Digunakan juga untuk diameter zona hambat pada pengujian antibakteri, antijamur, dll. Output berupa jumlah koloni jamur/bakteri dalam biakan cawan petri.\n\n" +
            "Syarat sampel:\n" +
            "• Sampel sudah dipreparasi dan siap dilakukan analisis.\n" +
            "• Tidak menerima sampel patogenik.\n" +
            "• Cawan petri tersegel sempurna.\n" +
            "• Batas koloni masih terlihat jelas."
        }
        leftText={
            "Merk : Interscience\n" + 
            "Tipe : Scan 500"}
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
      </div>
        <KontakKami/>
      <Footer /></div>
    </>
  );
};

export default DaftarPeralatan;
