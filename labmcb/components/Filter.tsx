import React, { useState } from 'react';

interface FilterProps {
    onClose: () => void;
}

const Filter: React.FC<FilterProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[400px]">
                <h2 className="text-xl font-semibold mb-4">Filter</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Tanggal Pencarian</label>
                    <div className="flex items-center space-x-2">
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
                <div className="mb-4">
                    <label className="block text-gray-700">Tipe Layanan</label>
                    <div className="flex items-center space-x-4">
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
                <button
                    onClick={onClose}
                    className="mt-4 bg-softsec text-white px-4 py-2 rounded-md"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
};

export default Filter;
