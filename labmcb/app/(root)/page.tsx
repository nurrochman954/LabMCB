import React from "react";

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
          borderBottom: "2px solid #007bff",
        }}
      >
        {/* Logo and Title */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://drive.google.com/uc?export=view&id=1yNUumiMUBWToTDOr6SSIBqwO_zd1al0_we" // Replace with the actual logo URL
            alt="Logo"
            style={{ width: "60px", height: "60px", marginRight: "10px" }}
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
        <nav style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <a href="/" style={{ textDecoration: "none", color: "#000" }}>
            Home
          </a>
          <a href="/login" style={{ textDecoration: "none", color: "#000" }}>
            Login
          </a>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            🔍
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Home;