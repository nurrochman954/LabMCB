import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import HalamanSayaJudul from "@/components/HalamanSayaJudul";
import Tracking from "@/components/Tracking";

const HalamanSaya: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <TopBar />
            <HalamanSayaJudul />
            <Tracking />
            <div style={{ flexGrow: 1 }} /> {/* This div allows the content to grow and push the footer down */}
            <Footer />
        </div>
    );
};

export default HalamanSaya;
