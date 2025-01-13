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
      
      {/* Gambar-Gambar Alat */}
      <div className= "container mx-5 px-10">
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-10 p-20">
          <PeralatanCard 
            imageSrc="/assets/XRD.jpg" 
            title="XRD (X-Ray Diffraction)" 
          />
          <PeralatanCard 
            imageSrc="/assets/XRF_benchtop.jpg" 
            title="XRF Benchtop" 
          />
          <PeralatanCard 
            imageSrc="/assets/SEM.jpg" 
            title="SEM EDS " 
          />
          <PeralatanCard 
            imageSrc="/assets/UV_vis.jpg" 
            title="UV-Vis (Ultraviolet-Visible)" 
          />
          <PeralatanCard 
            imageSrc="/assets/UTM.jpg" 
            title="UTM (Universal Testing Machine)" 
          />
          <PeralatanCard 
            imageSrc="/assets/FTIR.jpg" 
            title="FTIR " 
          />
          <PeralatanCard 
            imageSrc="/assets/TGDSC.jpg" 
            title="TG/DSC" 
          />
          <PeralatanCard 
            imageSrc="/assets/raman.jpg" 
            title="Raman" 
          />
          <PeralatanCard 
            imageSrc="/assets/NMR_X_pulse.jpg" 
            title="NMR " 
          />
          <PeralatanCard 
            imageSrc="/assets/GCMS.jpg" 
            title="GC–MS" 
          />
          <PeralatanCard 
            imageSrc="/assets/UPLC.jpg" 
            title="UPLC–MSMS " 
          />
          <PeralatanCard 
            imageSrc="/assets/CPC.jpg" 
            title="CPC" 
          />
          <PeralatanCard 
            imageSrc="/assets/freeze_dryer.jpg" 
            title="Freeze Dryer" 
          />
          <PeralatanCard 
            imageSrc="/assets/" 
            title="Microdrill/DRMS" 
          />
          <PeralatanCard 
            imageSrc="/assets/coloni_counter.jpg" 
            title="Colony Counter" 
          />
          <PeralatanCard 
            imageSrc="/assets/mikroskop_trinokuler.jpg" 
            title="Mikroskop Trinokuler" 
          />
          <PeralatanCard 
            imageSrc="/assets/" 
            title="Rotary Vacuum Evaporator" 
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DaftarPeralatan;
