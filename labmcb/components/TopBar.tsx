import React from "react";
import Image from "next/image";

const TopBar = () => {
  return (
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
      {/* Logo dan Judul */}
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
          href="/"
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
  );
};

export default TopBar;
