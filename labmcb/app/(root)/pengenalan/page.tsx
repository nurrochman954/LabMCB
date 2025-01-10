"use client";

import React from "react";
import Header from "@/components/Header";
import TopBar from "../../../components/TopBar";
import LabProfile from "@/components/LabProfile";
import Footer from "@/components/Footer";

const Pengenalan: React.FC = () => {
  return (
    <>
      <Header/>
      <TopBar />
      <LabProfile
      imageUrl="https://lingkar.co/wp-content/uploads/2021/03/candi-borobudur-magelang-jawa-tengah.jpg" 
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
      />
      <Footer/>
    </>
  );
};

export default Pengenalan;
