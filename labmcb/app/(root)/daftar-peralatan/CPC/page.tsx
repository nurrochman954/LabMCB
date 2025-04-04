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
    ['CPC (bagi sampel yang tidak memerlukan preparasi terlebih dahulu)', 'Rp200.000,00/sampel'],
    ['CPC (bagi sampel yang memerlukan preparasi terlebih dahulu)', 'Rp500.000,00/sampel'],
  ];


  return (
    <>   <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <TopBar />

      <div style={{ padding: "20px", backgroundColor: "#f0f0f0", flex: 1 }}>
      <DeskripsiPeralatan
        mainTitle="CPC (Centrifugal Partition Chromatography)"
        imageUrl="/assets/CPC.jpg"
        rightText={
            "Pengeringan sampel melalui proses sublimasi. Pengeringan menggunakan alat freeze dryer lebih baik dibandingkan dengan oven karena kadar airnya lebih rendah. Pengeringan menggunakan alat freeze dryer/pengering beku lebih aman terhadap risiko terjadinya degradasi senyawa dalam ekstrak. Hal ini dikarenakan suhu yang digunakan untuk mengeringkan ekstrak cukup rendah. Output berupa sampel dalam kondisi kering.\n\n" +
            "Syarat sampel:\n" +
            "• Sampel dapat berupa simplisia.\n" +
            "• Customers wajib membawa sampel yang siap dianalisis.\n" +
            "• Customers wajib menginformasikan pelarut yang digunakan pada sampel.\n" +
            "• Customers tidak melakukan optimasi sistem arizona yang akan digunakan.\n" +
            "• Panjang gelombang senyawa target sudah diketahui.\n" +
            "• Customers wajib membawa 4 jenis eluen yang akan digunakan (N-Heksan, Ethyl Asetat, Methanol, dan Aquadest).\n" +
            "• Customers wajib membawa botol penampungan hasil CPC.\n" +
            "• Apabila sistem arizona belum ada dalam default alat CPC, maka customers wajib menyediakan eluen untuk membuat larutan premix.\n\n" +
            "Ketentuan tambahan:\n" +
            "• Pengambilan hasil ekstraksi paling lama 2 hari setelah proses CPC selesai. Jika tidak diambil, akan dimusnahkan."
        }
        leftText={
            "Merk : Gilson\n" + 
            "Tipe : CPC 250-PVC 250"}
            />
        <Table title="Informasi Uji Sampel" headers={sampleHeaders} data={sampleData} />
      </div>
        <KontakKami/>
      <Footer /></div>
    </>
  );
};

export default DaftarPeralatan;
