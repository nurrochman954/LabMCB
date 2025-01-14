"use client";

import React from 'react';

const HalamanSayaJudul = () => {
    return (
        <div
            style={{
                padding: '20px',
                width: '750px',
                margin: '50px auto', // Centers the container with top/bottom margin
                maxWidth: '900px', // Memastikan konten tidak melebihi lebar
                display: 'flex', // Menggunakan flexbox
                flexDirection: 'column', // Mengatur arah elemen dalam kolom
            }}
        >
            <div>
                <h1 className="text-[24px] font-bold mb-2">Halaman Saya</h1>
            </div>

            {/* Tracking Section */}
            <div>
                <h2 className="text-[18px] font-semibold mb-3">
                    Tracking Permohonan Uji Sampel dan Penyewaan Alat
                </h2>

                {/* Legend */}
                <div className="flex flex-col gap-2 mb-1">
                    <div className="flex items-center gap-2">
                        <div className="w-[16px] h-[16px] bg-green-500"></div>
                        <span className="text-[14px]">Tahapan berhasil dilakukan</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-[16px] h-[16px] bg-red-500"></div>
                        <span className="text-[14px]">Tahapan gagal dilakukan</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HalamanSayaJudul;
