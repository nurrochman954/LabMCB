import React from "react";
import Header from "../../components/Header";
import TopBar from "../../components/TopBar";
import Footer from "../../components/Footer";


const Home = () => {
  return (
    <>
      <Header />
      <TopBar />
      <section
        id="home"
        className="bg-bannerImg bg-no-repeat bg-cover bg-bottom"
        style={{ height: "100vh" }}
      >
        <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center px-4">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold" style={{ fontFamily: "Bodoni, serif" }}>
              Laboratorium Konservasi
              <br />
              Cagar Budaya Borobudur
            </h1>
            <p className="text-white w-full max-w-xl my-8 text-sm md:text-base">
              Jelajahi dedikasi kami dalam merawat dan melestarikan keajaiban
              budaya Borobudur untuk generasi mendatang.
            </p>
            <a
              href="#"
              className="bg-green-500 text-white uppercase font-semibold px-6 py-3 rounded-md transition-transform transform hover:scale-105"
            >
              Mulai
            </a>
          </div>
        </div>
      </section>

      {/* Tentang Kami Section */}
      <section id="about" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Tentang Kami</h2>
          <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto">
            Lab Konservasi Cagar Budaya Borobudur adalah pusat riset dan
            pelestarian yang didedikasikan untuk menjaga dan merawat warisan
            budaya dunia, Borobudur. Dengan menggabungkan teknologi modern dan
            teknik konservasi tradisional, kami berkomitmen untuk memastikan
            kelestarian candi ini untuk generasi yang akan datang.
          </p>
          <a
            href="#"
            className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-md font-semibold transition-transform transform hover:scale-105"
          >
            Read More
          </a>
        </div>
      </section>

      {/* Fasilitas Kami Section */}
      <section id="facilities" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Fasilitas Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative group rounded-md overflow-hidden">
              <img
                src="/assets/kembud.png"
                alt="Facility 1"
                className="w-full h-40 object-cover transition-transform transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  href="#facility1"
                  className="text-white text-lg font-semibold flex items-center gap-2"
                >
                  Laser Scanner
                  <span className="material-icons">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="relative group rounded-md overflow-hidden">
              <img
                src="/assets/kembud.png"
                alt="Facility 2"
                className="w-full h-40 object-cover transition-transform transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  href="#facility2"
                  className="text-white text-lg font-semibold flex items-center gap-2"
                >
                  Digital Scanner
                  <span className="material-icons">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="relative group rounded-md overflow-hidden">
              <img
                src="/assets/kembud.png"
                alt="Facility 3"
                className="w-full h-40 object-cover transition-transform transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  href="#facility3"
                  className="text-white text-lg font-semibold flex items-center gap-2"
                >
                  3D Printer
                  <span className="material-icons">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="relative group rounded-md overflow-hidden">
              <img
                src="/assets/kembud.png"
                alt="Facility 4"
                className="w-full h-40 object-cover transition-transform transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  href="#facility4"
                  className="text-white text-lg font-semibold flex items-center gap-2"
                >
                  Artifact Scanner
                  <span className="material-icons">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;