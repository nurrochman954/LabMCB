import React from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import TopBar from "../../../components/TopBar";
import BoxPanduan from "../../../components/Panduan"

const Home = () => {
    return (
        <>
            <Header />
            <TopBar />      
            <div className="max-w-6xl mx-auto p-4">
                <h1 className="text-4xl font-bold text-center mb-4 mt-10 ">Daftar Panduan</h1>
            </div>

            {/* Content Section */}
            <BoxPanduan />
            <Footer />
        </>
    );
};

export default Home;
