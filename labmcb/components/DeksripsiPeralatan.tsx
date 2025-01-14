import React from "react";

interface InfoSectionProps {
  imageUrl: string;
  leftText: string;
  rightText: string;
  mainTitle?: string; // Judul besar di awal komponen
  specTitle?: string; // Judul untuk spesifikasi
  descTitle?: string; // Judul untuk deskripsi
}

const DeskripsiPeralatan: React.FC<InfoSectionProps> = ({
  imageUrl,
  leftText,
  rightText,
  mainTitle, // Default judul besar jika tidak disediakan
  specTitle = "Spesifikasi", // Default judul spesifikasi
  descTitle = "Deskripsi", // Default judul deskripsi
}) => {
  return (
    <div
    >
      {/* Judul Besar */}
      {mainTitle && (
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "40px",
            marginBottom: "20px",
          }}
        >
          {mainTitle}
        </h1>
      )}

      {/* Konten */}
      <div style={{ display: "flex" }}>
        {/* Gambar */}
        <div style={{ flex: "0 0 400px", paddingRight: "20px" }}>
          <img
            src={imageUrl}
            alt="Info"
            style={{
              width: "400px",
              height: "400px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Teks */}
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Deskripsi */}
          <div>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                margin: "0 0 10px 0",
              }}
            >
              {descTitle}
            </h2>
            <p style={{ margin: "0", whiteSpace: "pre-wrap" }}>{rightText}</p>
          </div>

          {/* Spesifikasi */}
          <div>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                margin: "20px 0 10px 0",
              }}
            >
              {specTitle}
            </h2>
            <p style={{ margin: "0", whiteSpace: "pre-wrap" }}>{leftText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeskripsiPeralatan;
