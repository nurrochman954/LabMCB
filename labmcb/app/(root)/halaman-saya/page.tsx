'use client';
import React from "react";
import { useUser } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import ProfileBox from "@/components/ProfileBox";
import HalamanSayaJudul from "@/components/HalamanSayaJudul";
import Tracking from "@/components/Tracking";
import PenyewaanTracking from '@/components/PenyewaanTracking'

const HalamanSaya: React.FC = () => {
    const { user } = useUser();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <TopBar />
            <ProfileBox 
                text={user?.fullName || ""}
                imageUrl={user?.imageUrl}
            />
            <HalamanSayaJudul />
            <Tracking />
            
            <PenyewaanTracking/>  {/* This div allows the content to grow and push the footer down */}
            <div style={{ flexGrow: 1 }}/>
            <Footer />
        </div>
    );
};

export default HalamanSaya;
