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
    ['Mikroskop Trinokuler', 'Rp200.000,00/sampel'],
    ['Tarif tambahan perbesaran foto mikroskopik 1x perbesaran', 'Rp100.000,00/sampel'],
  ];


  return (
    <>  
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
      <DeskripsiPeralatan
        mainTitle="Mikroskop Trinokuler"
        imageUrl="https://tokoalatpengujian.wordpress.com/wp-content/uploads/2017/11/universal-testing-machine.jpg?w=1081"
        rightText={
            "Mikroskop trinokuler memiliki eyetube yang bisa disambungkan dengan monitor komputer atau proyektor dengan memasang kamera di salah satu eyetube-nya. Mikroskop trinokular digunakan di laboratorium untuk mengetahui struktur tak kasat mata pada sampel. Digunakan untuk penampang mikroskopis arah serat kayu transversal, tangensial, dan radial. Output berupa foto mikroskopik.\n\n" +
            "Syarat sampel:\n" +
            "• Jika sampel berupa kayu, maka ukuran sampel minimal 3x3x3 cm yang mewakili arah serat kayu.\n" +
            "• Jika sampel berupa cendawan, maka harus dalam bentuk preparat buatan.\n" +
            "• Hasil foto mikroskopik 2x perbesar dengan jumlah foto 2 buah.\n" +
            "• Tambahan perbesaran mencapai 1000x."
        }
        leftText={
            "Merk : Olympus\n" + 
            "Tipe : BX 53"}
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
      </div>
        <KontakKami/>
      <Footer />
    </>
  );
};

export default DaftarPeralatan;
