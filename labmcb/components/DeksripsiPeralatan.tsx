import React from "react";

interface InfoSectionProps {
  imageUrl: string;
  leftText: string;
  rightText: string;
  mainTitle?: string;
  specTitle?: string;
  descTitle?: string;
}

const DeskripsiPeralatan: React.FC<InfoSectionProps> = ({
  imageUrl,
  leftText,
  rightText,
  mainTitle,
  specTitle = "Spesifikasi",
  descTitle = "Deskripsi",
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <div style={{ width: "60%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Gambar dan Spesifikasi */}
        <div style={{ display: "flex", flexDirection: "row", maxWidth: "800px", width: "100%", marginBottom: "20px" }}>
          {/* Gambar */}
          <div style={{ flex: "1", paddingRight: "20px" }}>
            <img
              src={imageUrl}
              alt="Info"
              style={{
                width: "100%",
                maxWidth: "400px",
                maxHeight: "300px",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Judul dan Spesifikasi */}
          <div style={{ flex: "2", verticalAlign: "center"}}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>{mainTitle}</h1>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>{specTitle}</h2>
            <p style={{ textAlign: "justify", whiteSpace: "pre-wrap"}}>{leftText}</p>
          </div>
        </div>

        {/* Deskripsi */}
        <div style={{ maxWidth: "1200px", width: "100%" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>{descTitle}</h2>
          <p style={{ textAlign: "justify", whiteSpace: "pre-wrap" }}>{rightText}</p>
        </div>
      </div>
    </div>
  );
};

export default DeskripsiPeralatan;
