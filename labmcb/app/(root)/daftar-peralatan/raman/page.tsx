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
    ['Tanpa library', 'Rp500.000,00/sampel'],
    ['Dengan library', 'Rp800.000,00/sampel'],
  ];


  return (
    <>  
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
      <DeskripsiPeralatan
        mainTitle="Raman"
        imageUrl="https://tokoalatpengujian.wordpress.com/wp-content/uploads/2017/11/universal-testing-machine.jpg?w=1081"
        rightText={
            "Spektrum Raman digunakan identifikasi senyawa kimia yang ada dalam sampel, sehingga bertindak sebagai “sidik jari kimia” yang dapat digunakan untuk mengidentifikasi, mengukur, dan mengkarakterisasi semua senyawa kimia berbeda yang ada dalam sampel. Mikroskop Raman dapat menganalisis sampel apapun yang dapat ditempatkan pada tahap sampel, tanpa persiapan sampel sama sekali. Bahkan dapat digunakan untuk menganalisis sampel yang dikelilingi kaca, didalam kemasan transparan, atau didalam air. Output berupa grafik dan prediksi\n\n" +
            "Syarat sampel:\n" +
            "• Jenis sampel organik dan anorganik (bukan logam atau paduannya).\n" +
            "• Sampel dapat berupa padatan, serbuk, atau gel.\n" +
            "• Berat sampel minimal 1 gram.\n" +
            "• Sampel harus dalam kondisi kering.\n" +
            "• Warna sampel bukan hitam pekat."
        }
        leftText={
            "Merk : Horiba\n" + 
            "Tipe : Labram HR Evo"}
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
      </div>
        <KontakKami/>
      <Footer />
    </>
  );
};

export default DaftarPeralatan;
