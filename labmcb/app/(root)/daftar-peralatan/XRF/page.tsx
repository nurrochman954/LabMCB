import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Table from "@/components/Table";
import KontakKami from "@/components/KontakKami";

const DaftarPeralatan = () => {
  const sampleHeaders = ['Jenis', 'Harga per Sampel', 'Syarat Sampel'];
  const sampleData = [
    ['Benchtop', 'Rp350.000,00/sampel', '• Sampel dapat berupa serbuk, padatan, gel maupun cairan\n• Dimensi maksimal sampel: padatan 3x3x3cm\n• Berat sampel minimal: padatan 2 gram, cair 50 ml.'],
    ['Handheld', 'Rp250.000,00/sampel', '• Khusus untuk sampel utuh/non-destructive\n• Sampel kering total.\n• Maksimal pengukuran dalam 1 sampel adalah 3 titik.'],
    ['Preparasi sampel', 'Rp250.000,00/sampel', ''],
  ];

  const rentalHeaders = ['Jenis', 'Harga per Hari', 'Keterangan'];
  const rentalData = [
    ['XRF handheld', 'Rp700.000,00/hari', 'Harga belum termasuk biaya packaging dan lungsump operator.'],
  ];

  return (
    <>  
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
        <Table title="Informasi Penyewaan Peralatan" headers={rentalHeaders} data={rentalData} />
      </div>
        <KontakKami/>
      <Footer />
    </>
  );
};

export default DaftarPeralatan;
