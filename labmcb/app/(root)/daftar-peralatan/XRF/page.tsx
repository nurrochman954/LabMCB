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
    ['Benchtop', 'Rp350.000,00/sampel'],
    ['Handheld', 'Rp250.000,00/sampel'],
    ['Preparasi sampel', 'Rp50.000,00/sampel'],
  ];

  const rentalHeaders = ['Jenis', 'Harga per Hari', 'Keterangan'];
  const rentalData = [
    ['XRF handheld', 'Rp700.000,00/hari', 'per hari max. 30 titik, dengan jeda 2 jam setelah mendapatkan 10 titik. Harga belum termasuk biaya packaging dan lungsump operator.'],
  ];

  return (
    <>   <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0", flex : 1 }}>
      <DeskripsiPeralatan
        mainTitle="XRF (X-ray Fluorescence)"
        imageUrl="/assets/XRF_benchtop.jpg"
        rightText={
          "Metode XRF digunakan untuk menentukan komposisi unsur suatu material.Output berupa komposisi unsur dan oksida.\n\n" +
          "Syarat sampel XRF (Benchtop):\n" +
          "• Sampel dapat berupa serbuk, padatan, gel maupun cairan \n" +
          "• Dimensi maksimal sampel. padatan 3x3x3cm\n" +
          "• Berat sampel minimal: padatan 2 gram, cair 50 ml.\n\n" +
          "Syarat sampel XRF (Handheld):\n" +
          "• khusus untuk sampel utuh/non-destructive\n" +
          "• Sampel kering total.\n" +
          "• Maksimal pengukuran dalam 1 sampel adalah 3 titik." 
        }
        leftText={
          "XRF\n" +
            "Merk : Malven panalytical\n" +
            "Tipe : Epsilon 1\n\n" +
            "XRF Handheld\n" +
            "Merk : Olympus\n" +
            "Tipe : DPO-2000-CC"}
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
        <Table title="Informasi Penyewaan Peralatan" headers={rentalHeaders} data={rentalData} />
      </div>
        <KontakKami/>
      <Footer /></div>
    </>
  );
};

export default DaftarPeralatan;
