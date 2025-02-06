'use client'
import React, { useState } from 'react';
import ButtonDU from "@/components/TombolDU";
import Filter from '@/components/Filter';
import Overview from '@/components/Overview';
import AdminTracking from '@/components/AdminTracking';
import AdminTrackingSewaAlat from '@/components/AdminTrackingSewaAlat';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface SearchResults {
  [key: string]: number;
}

const AdminPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults>({});

  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  const handleSearchResults = (results: SearchResults) => {
    setSearchResults(results);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <Overview setIsFilterOpen={handleOpenFilter} /> 
        {isFilterOpen && (
          <Filter 
            onClose={handleCloseFilter} 
            onSearch={handleSearchResults}
          />
        )}
        <AdminTracking />
        <AdminTrackingSewaAlat />
      </div>
      <Footer />
    </>
  );
};

export default AdminPage;