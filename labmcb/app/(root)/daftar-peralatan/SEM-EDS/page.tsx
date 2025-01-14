import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Table from "@/components/Table";
import KontakKami from "@/components/KontakKami";
import DeskripsiPeralatan from "@/components/DeksripsiPeralatan";

const DaftarPeralatan = () => {
  const sampleHeaders = ['Jenis', 'Harga per Sampel'];
  const sampleData = [
    ['SEM-EDS', 'Rp600.000,00/sampel'],
    ['SEM', 'Rp300.000,00/sampel'],
    ['SEM multiply image', 'Rp50.000,00/image'],
    ['Preparasi sampel', 'Rp100.000,00/sampel', ''],
  ];


  return (
    <>  
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
      <DeskripsiPeralatan
        mainTitle="XRF (X-ray Fluorescence)"
        imageUrl="https://instanano.com/wp-content/uploads/2022/07/sem-instrument.jpg"
        rightText={
            "Scanning Electron Microscope (SEM) adalah jenis mikroskop elektron yang menghasilkan gambar sampel dengan memindai permukaan dengan sinar elektron yang terfokus dengan perbesaran hingga skala besar. Energy Dispersive X-Ray (EDX) digunakan untuk analisis unsur kimia bahan. Dengan EDS maka komposisi unsur dapat diketahui pada titik yang dianalisis.\n" +
            "Syarat sampel:\n" +
            "• Sampel berupa padatan, bongkahan, lapis tipis (ukuran sampel maksimal diameter 25,4 mm)\n" +
            "• Sampel harus dalam kondisi kering\n" +
            "• Sampel tidak mengandung gas\n" +
            "• Jika sampel membutuhkan preparasi akan dikenakan biaya tambahan\n" 
        }
        leftText={
          "XRF\n" +
            "Merk : Malven panalytical\n" +
            "Tipe Epsilon 1\n\n" +
            "XRF Handheld\n" +
            "Merk :Olympus\n" +
            "Tipe : DPO-2000-CC"        }
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />

      </div>
        <KontakKami/>
      <Footer />
    </>
  );
};

export default DaftarPeralatan;
