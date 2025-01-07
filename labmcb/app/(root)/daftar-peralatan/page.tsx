import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";

const DaftarPeralatan = () => {
    return (
        <>
            <Header />
            <TopBar />

            {/* Spasi besar untuk visualisasi */}
            <div style={{ height: "500px", backgroundColor: "#f0f0f0" }}>
                <p style={{ textAlign: "center", lineHeight: "500px", fontSize: "18px", color: "#888" }}>
                    Area Konten
                </p>
            </div>

            <Footer />
        </>
    );
};

export default DaftarPeralatan;
