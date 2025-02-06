'use client';
import React, { useEffect, useState } from 'react';

const Overview: React.FC<{ setIsFilterOpen: () => void }> = ({ setIsFilterOpen }) => {
    const [sampleCount, setSampleCount] = useState(0);
    const [rentalCount, setRentalCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Fetch sample test count
                const sampleResponse = await fetch('/api/sample-test');
                const sampleData = await sampleResponse.json();
                const sampleTests = Array.isArray(sampleData) ? sampleData : sampleData.data || [];
                setSampleCount(sampleTests.length);

                // Fetch equipment rental count
                const rentalResponse = await fetch('/api/equipment-rental');
                const rentalData = await rentalResponse.json();
                const rentals = Array.isArray(rentalData) ? rentalData : rentalData.data || [];
                setRentalCount(rentals.length);
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="flex justify-center items-center">
            <div className="w-3/5 px-6 py-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-4">Overview</h2>
                    <div 
                        className='text-right text-gray-400 underline cursor-pointer' 
                        style={{ fontSize: '15px' }} 
                        onClick={setIsFilterOpen} 
                    >
                        lakukan pencarian
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="flex items-center p-1 gradient-box rounded-lg shadow-md w-[400px]">
                        <div className="flex items-center pb-2 pl-5 bg-white rounded-lg shadow-md w-full">
                            <div className="flex justify-center items-center bg-[#F59986] rounded-full h-16 w-16">
                                <img src="/assets/sampleIcon.png" alt="Uji Icon" className="h-8 w-8" />
                            </div>
                            <div className="ml-4">
                                <h3 className="font-bold" style={{ fontSize: '60px' }}>{sampleCount}</h3>
                                <p style={{ fontSize: '18px' }}>Jumlah Uji Sampel</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center p-1 gradient-box rounded-lg shadow-md w-[400px]">
                        <div className="flex items-center pb-2 pl-5 bg-white rounded-lg shadow-md w-full">
                            <div className="flex justify-center items-center bg-[#F59986] rounded-full h-16 w-16">
                                <img src="/assets/deviceIcon.png" alt="Alat Icon" className="h-8 w-8" />
                            </div>
                            <div className="ml-4">
                                <h3 className="font-bold" style={{ fontSize: '60px' }}>{rentalCount}</h3>
                                <p style={{ fontSize: '18px' }}>Jumlah Peminjaman Alat</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;