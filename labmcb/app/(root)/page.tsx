import React from "react";
import Image from "next/image";

const Home: React.FC = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header Section */}
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          //borderBottom: "2px solid #007bff",
        }}
      >
        {/* Logo and Title */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/assets/kemdikbud.svg" // Path to your logo.svg
            alt="Logo"
            width={60}
            height={60}
            style={{ marginRight: "10px" }}
          />
          <div>
            <h1 style={{ fontSize: "18px", margin: 0 }}>
              Laboratorium Museum dan Cagar Budaya
            </h1>
            <p style={{ fontSize: "14px", margin: 0 }}>
              Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div style={{ flex: 1, marginLeft: "20px" }}>
          <nav
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <a
              href="/pengenalan"
              style={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Pengenalan
            </a>
            <a
              href="/panduan"
              style={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Panduan
            </a>
            <a
              href="/daftar-peralatan"
              style={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Daftar Peralatan
            </a>
            <a
              href="/komunitas"
              style={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Komunitas
            </a>
            <a
              href="/halaman-saya"
              style={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Halaman Saya
            </a>
          </nav>
        </div>

        {/* Right Side Navigation */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            justifyContent: "flex-start", // Shift navigation links to the left
          }}
        >
          <a
            href=""
            style={{
              textDecoration: "none",
              color: "#007bff", // Blue color
              fontWeight: "bold",
            }}
          >
            Beranda
          </a>
          <a
            href="/sign-in"
            style={{
              textDecoration: "none",
              color: "#007bff", // Blue color
              fontWeight: "bold",
            }}
          >
            Masuk
          </a>
          <Image
            src="/assets/search.svg" // Path to your search.svg
            alt="Search Icon"
            width={30} // Increased size
            height={30} // Increased size
            style={{ cursor: "pointer" }}
          />
        </nav>
      </header>

      {/* Pemberitahuan Section */}
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#004b87",
          color: "#fff",
          padding: "10px 16px",
          marginTop: "0px",
        }}
      >
        <div style={{ flex: 2 }}>
          <p>
            📢 <strong>Pemberitahuan: </strong> 
            Kapokja Pengembangan diemban oleh nahkoda Zulfa.
          </p>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Baca Selengkapnya
          </button>
        </div>
      </section>

            {/* Foto Lab Section */}
            <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Image
          src="/assets/mcb.svg" // Path to the lab photo
          alt="Foto Lab"
          width={400} // Large size
          height={300}
          style={{ borderRadius: "10px" }}
        />
      </section>

      {/* Pintasan Section */}
      <section
        style={{
          textAlign: "center",
          marginTop: "20px",
          padding: "10px",
        }}
      >
        <h2>Pintasan ke Layanan</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "10px",
          }}
        >
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Prosedur Permohonan Analisis
          </button>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cari Peralatan
          </button>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Pendaftaran Analisis
          </button>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Prosedur Pembayaran
          </button>
        </div>
      </section>

      {/* Pengenalan Alat Section */}
      <section
        style={{
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <h2>Pengenalan Alat</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <Image
            src="/assets/kemdikbud.svg"
            alt="Alat 1"
            width={100}
            height={100}
          />
          <Image
            src="/assets/kemdikbud.svg"
            alt="Alat 2"
            width={100}
            height={100}
          />
          <Image
            src="/assets/kemdikbud.svg"
            alt="Alat 3"
            width={100}
            height={100}
          />
          <Image
            src="/assets/kemdikbud.svg"
            alt="Alat 4"
            width={100}
            height={100}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
