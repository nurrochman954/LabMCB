import React, { useState } from 'react';
import ButtonDU from "@/components/TombolDU";


interface FilterProps {
    onClose: () => void;
}

const Filter: React.FC<FilterProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[800px]">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Filter</h2>
                    <ButtonDU text="Cari" variant="primary" onClick={() => console.log('Clicked')} showIcon={false} />
                </div>

                <hr className="border-t border-gray-300 my-4" />
                
                {/* Date Range Filter */}
                <div className="mb-6">
                    <label className="block text-gray-700">Tanggal Pencarian</label>
                    <div className="flex items-center space-x-2 mt-1">
                        <input
                            type="date"
                            className="border rounded-md px-2 py-1 w-full"
                        />
                        <span>s.d.</span>
                        <input
                            type="date"
                            className="border rounded-md px-2 py-1 w-full"
                        />
                    </div>
                </div>
                
                {/* Service Type Filter */}
                <div className="mb-4">
                    <label className="block text-gray-700">Tipe Layanan</label>
                    <div className="flex items-center space-x-4 mt-1">
                        <label>
                            <input type="radio" name="tipeLayanan" value="uji" />
                            Uji Sampel
                        </label>
                        <label>
                            <input type="radio" name="tipeLayanan" value="pinjam" />
                            Peminjaman Alat
                        </label>
                    </div>
                </div>

                {/* Horizontal Line */}
                <hr className="border-t border-gray-300 my-4" />

                {/* Pencarian Ditemukan Section */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Pencarian ditemukan:</h3>
                    <div className="grid grid-cols-1 gap-y-2 ml-10 mt-2">
                        <div className="flex space-x-2">
                            <div className="w-1/4 text-left">XRF (X-ray Fluorescence)</div>
                            <div className="w-1/60 text-center">:</div>
                            <div className="w-1/8 text-right">3</div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-1/4 text-left">XRD (X-ray Diffraction)</div>
                            <div className="w-1/60 text-center">:</div>
                            <div className="w-1/8 text-right">4</div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-1/4 text-left">Video Scope</div>
                            <div className="w-1/60 text-center">:</div>
                            <div className="w-1/8 text-right">2</div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-1/4 text-left">Laser Scanner</div>
                            <div className="w-1/60 text-center">:</div>
                            <div className="w-1/8 text-right">0</div>
                        </div>
                    </div>



                </div>

                {/* Close Button */}
                <ButtonDU text="Tutup" variant="secondary" onClick={onClose} showIcon={false} />
            </div>
        </div>
    );
};

export default Filter;
