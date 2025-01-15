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
    ['GC-MS', 'Rp500.000,00/sampel'],
    ['GC-MS dan Headspace', 'Rp750.000,00/sampel'],
  ];


  return (
    <>  
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
      <DeskripsiPeralatan
        mainTitle="GC–MS (Gas Chromatography-Mass Spectrometry)"
        imageUrl="https://tokoalatpengujian.wordpress.com/wp-content/uploads/2017/11/universal-testing-machine.jpg?w=1081"
        rightText={
            "Mengonfirmasikan senyawa target. Output berupa grafik chromatogram kualitatif.\n\n" +
            "Syarat sampel GC-MS:\n" +
            "• Sampel harus bersifat volatile (mudah menguap).\n" +
            "• Sampel tidak mengandung air.\n" +
            "• Sampel berbentuk cair sudah siap inject tanpa perlakuan derivatisasi.\n" +
            "• Menginformasikan pelarut yang digunakan.\n" +
            "• Menginformasikan senyawa target (jika tidak menginformasikan maka akan dilakukan screening saja).\n" +
            "• Apabila customers menginginkan hasil kuantitatif, maka larutan standar dari customers.\n\n" +
            "Syarat sampel GC-MS dan Headspace:\n" +
            "• Sampel harus bersifat volatile.\n" +
            "• Berat sampel serbuk minimal 1 gram.\n" +
            "• Wajib menginformasikan senyawa target.\n" +
            "• Hasil kualitatif."
        }
        leftText={
            "Merk : Agilent\n" + 
            "Tipe : 8890 GC System–59778 DG/MSD"}
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
      </div>
        <KontakKami/>
      <Footer />
    </>
  );
};

export default DaftarPeralatan;
