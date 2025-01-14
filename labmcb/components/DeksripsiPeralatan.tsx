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
  mainTitle = "XRD (X-Ray Diffraction)",
  specTitle = "Spesifikasi",
  descTitle = "Deskripsi",
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <div style={{ width: "60%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Judul Besar */}
        <h1 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginTop: "20px" }}>
          {mainTitle}
        </h1>

        {/* Konten */}
        <div style={{ display: "flex", width: "100%", marginTop: "20px" }}>
          {/* Gambar */}
          <div style={{ width: "50%", paddingRight: "20px" }}>
            <img
              src={imageUrl}
              alt="Info"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Teks */}
          <div style={{ width: "50%", paddingLeft: "20px" }}>
            {/* Deskripsi */}
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                {descTitle}
              </h2>
              <p style={{ textAlign: "justify", whiteSpace: "pre-wrap"}}>{rightText}</p>
            </div>

            {/* Spesifikasi */}
            <div style={{ marginTop: "20px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                {specTitle}
              </h2>
              <p style={{ textAlign: "justify", whiteSpace: "pre-wrap"}}>{leftText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeskripsiPeralatan;
