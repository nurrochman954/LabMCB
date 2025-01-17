import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Table from "@/components/Table";
import KontakKami from "@/components/KontakKami";
import DeskripsiPeralatan from "@/components/DeksripsiPeralatan";

const DaftarPeralatan = () => {
  const rentalHeaders = ['Jenis', 'Harga per Hari', 'Keterangan'];
  const rentalData = [
    ['Thermal Camera', 'Rp200.000,00/hari', 'Harga belum termasuk biaya packaging dan lungsump operator.'],
  ];

  return (
    <>  
     <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0" , flex: 1  }}>
      <DeskripsiPeralatan
        mainTitle="Thermal Camera"
        imageUrl="https://www.tawada-ndt.com/wp-content/uploads/2023/06/Handheld-XRF-Jan.png"
        rightText={
          "Menampilkan gambar suhu permukaan dari suatu objek. Alat ini sering digunakan untuk mengetahui perbedaan suhu permukaan material yang dapat dianalisa lebih lanjut untuk mengetahui kondisi bagian dalam objek tersebut. Output berupa foto thermal" 
        }
        leftText={
            "Merk : FLIR"}
            />

        <Table title="Informasi Penyewaan Peralatan" headers={rentalHeaders} data={rentalData} />
      </div>
        <KontakKami/>
      <Footer /></div>
    </>
  );
};

export default DaftarPeralatan;
