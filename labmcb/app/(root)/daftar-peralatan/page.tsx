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

      {/* Page Title */}
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-4 mt-10 ">Daftar Peralatan</h1>
      </div>

      {/* Grid of Peralatan */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <PeralatanCard
            imageSrc="/assets/XRD.jpg"
            title="XRD (X-Ray Diffraction)"
            linkTo="/daftar-peralatan/XRD"
          />
          <PeralatanCard
            imageSrc="/assets/XRF_benchtop.jpg"
            title="XRF"
            linkTo="/daftar-peralatan/XRF"
          />
          <PeralatanCard
            imageSrc="/assets/SEM.jpg"
            title="SEM EDS"
            linkTo="/daftar-peralatan/SEM-EDS"
          />
          <PeralatanCard
            imageSrc="/assets/UV_vis.jpg"
            title="UV-Vis (Ultraviolet-Visible)"
            linkTo="/daftar-peralatan/UV-VIS"
          />
          <PeralatanCard
            imageSrc="/assets/UTM.jpg"
            title="UTM (Universal Testing Machine)"
            linkTo="/daftar-peralatan/UTM"
          />
          <PeralatanCard
            imageSrc="/assets/FTIR.jpg"
            title="FTIR"
            linkTo="/daftar-peralatan/FTIR"
          />
          <PeralatanCard
            imageSrc="/assets/TGDSC.jpg"
            title="TG/DSC"
            linkTo="/daftar-peralatan/TGDSC"
          />
          <PeralatanCard
            imageSrc="/assets/raman.jpg"
            title="Raman"
            linkTo="/daftar-peralatan/raman"
          />
          <PeralatanCard
            imageSrc="/assets/NMR_X_pulse.jpg"
            title="NMR"
            linkTo="/daftar-peralatan/NMR_X_pulse"
          />
          <PeralatanCard
            imageSrc="/assets/GCMS.jpg"
            title="GC–MS"
            linkTo="/daftar-peralatan/GCMS"
          />
          <PeralatanCard
            imageSrc="/assets/UPLC.jpg"
            title="UPLC–MSMS"
            linkTo="/daftar-peralatan/UPLC"
          />
          <PeralatanCard
            imageSrc="/assets/CPC.jpg"
            title="CPC"
            linkTo="/daftar-peralatan/CPC"
          />
          <PeralatanCard
            imageSrc="/assets/freeze_dryer.jpg"
            title="Freeze Dryer"
            linkTo="/daftar-peralatan/freeze_dryer"
          />
          <PeralatanCard
            imageSrc="/assets/"
            title="Microdrill/DRMS"
            linkTo="/daftar-peralatan/Microdrill"
          />
          <PeralatanCard
            imageSrc="/assets/coloni_counter.jpg"
            title="Colony Counter"
            linkTo="/daftar-peralatan/coloni_counter"
          />
          <PeralatanCard
            imageSrc="/assets/mikroskop_trinokuler.jpg"
            title="Mikroskop Trinokuler"
            linkTo="/daftar-peralatan/mikroskop_trinokuler"
          />
          <PeralatanCard
            imageSrc="/assets/"
            title="Rotary Vacuum Evaporator"
            linkTo="/daftar-peralatan/rotary_vacuum_evaporator"
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DaftarPeralatan;
