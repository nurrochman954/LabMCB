import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import PeralatanCard from "@/components/DaftarPeralatan";

const DaftarPeralatan = () => {
  return (
    <>
      <Header />
      <TopBar />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-0 mt-10">Daftar Peralatan</h1>
      </div>

      {/* Gambar-Gambar Alat */}
      <div className= "container mx-5 px-10">
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-10 p-20">
          <PeralatanCard 
            imageSrc="/assets/XRD.jpg" 
            title="XRD (X-Ray Diffraction)" 
            linkTo=""
          />
          <PeralatanCard 
            imageSrc="/assets/XRF_benchtop.jpg" 
            title="XRF Benchtop" 
            linkTo="/daftar-peralatan/XRF"
          />
          <PeralatanCard 
            imageSrc="/assets/SEM.jpg" 
            title="SEM EDS " 
            linkTo=""
          />
          <PeralatanCard 
            imageSrc="/assets/UV_vis.jpg" 
            title="UV-Vis (Ultraviolet-Visible)" 
            linkTo=""
          />
          <PeralatanCard 
            imageSrc="/assets/UTM.jpg" 
            title="UTM (Universal Testing Machine)"
            linkTo="" 
          />
          <PeralatanCard 
            imageSrc="/assets/FTIR.jpg" 
            title="FTIR " 
            linkTo=""
          />
          <PeralatanCard 
            imageSrc="/assets/TGDSC.jpg" 
            title="TG/DSC" 
            linkTo=""
          />
          <PeralatanCard 
            imageSrc="/assets/raman.jpg" 
            title="Raman" 
            linkTo=""
          />
          <PeralatanCard 
            imageSrc="/assets/NMR_X_pulse.jpg" 
            title="NMR " 
            linkTo=""
          />
          <PeralatanCard 
            imageSrc="/assets/GCMS.jpg" 
            title="GC–MS"
            linkTo="" 
          />
          <PeralatanCard 
            imageSrc="/assets/UPLC.jpg" 
            title="UPLC–MSMS " 
            linkTo=""
          />
          <PeralatanCard 
            imageSrc="/assets/CPC.jpg" 
            title="CPC" 
            linkTo=""
          />
          <PeralatanCard 
            imageSrc="/assets/freeze_dryer.jpg" 
            title="Freeze Dryer"
            linkTo=""

          />
          <PeralatanCard 
            imageSrc="/assets/" 
            title="Microdrill/DRMS" 
            linkTo=""
          />
          <PeralatanCard 
            imageSrc="/assets/coloni_counter.jpg" 
            title="Colony Counter" 
            linkTo=""
          />
          <PeralatanCard 
            imageSrc="/assets/mikroskop_trinokuler.jpg" 
            title="Mikroskop Trinokuler"
            linkTo="" 
          />
          <PeralatanCard 
            imageSrc="/assets/" 
            title="Rotary Vacuum Evaporator" 
            linkTo=""
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DaftarPeralatan;
