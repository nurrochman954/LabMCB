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
    ['Preparasi sampel', 'Rp200.000,00/sampel'],
    ['Tambahan Pengulangan', 'Rp50.000,00/sampel'],
  ];


  return (
    <>   <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0", flex: 1}}>
      <DeskripsiPeralatan
        mainTitle="UTM (Universal Testing Machine)"
        imageUrl="https://tokoalatpengujian.wordpress.com/wp-content/uploads/2017/11/universal-testing-machine.jpg?w=1081"
        rightText={
            "Alat untuk menguji kuat tarik/kuat tekan/kuat lentur suatu bahan atau material. Output berupa grafik dan data kuat tekan/kuat tarik/kuat lentur\n\n" +
            "Syarat sampel:\n" +
            "• Sampel untuk kuat tekan ukuran 5x5x5cm (sesuai dengan standar ASTM)\n" +
            "• Dimensi sampel untuk kuat lentur minimal panjang 10 cm x lebar 3 cm x tinggi 3 cm (sesuai dengan standar ASTM)\n" +
            "• Sampel untuk kuat tarik ketebalan maksimal 4 cm, panjang sampel minimal 10 cm (sesuai dengan standar ASTM)\n" +
            "• Sampel kertas uji kuat tarik kondisi kering dengan panjang minimal 10 cm.\n" +
            "• Satu sampel maksimal 3 pengulangan\n" +
            "• Jika sampel membutuhkan preparasi akan dikenakan biaya tambahan."
        }
        leftText={
            "Merk : Shimadzu\n" + 
            "Tipe : AGX100KNVSY/ST/C1 R5"}
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
      </div>
        <KontakKami/>
      <Footer /></div>
    </>
  );
};

export default DaftarPeralatan;
