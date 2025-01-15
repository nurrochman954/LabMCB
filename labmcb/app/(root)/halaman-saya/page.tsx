import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import ProfileBox from "@/components/ProfileBox";
import HalamanSayaJudul from "@/components/HalamanSayaJudul";
import Tracking from "@/components/Tracking";

const HalamanSaya: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <TopBar />
            <ProfileBox 
                text="Athaya Putri Harmana"
                imageUrl="https://cdn0-production-images-kly.akamaized.net/zmTJIzsJi7IfBJCh0uBylr9u1jU=/1200x900/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/5050791/original/062807400_1734171357-shin-tae-yong_26cccc2.jpg"
            />
            <HalamanSayaJudul />
            <Tracking />
            <div style={{ flexGrow: 1 }} /> {/* This div allows the content to grow and push the footer down */}
            <Footer />
        </div>
    );
};

export default HalamanSaya;
