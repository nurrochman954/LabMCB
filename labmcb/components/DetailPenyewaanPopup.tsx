import React from 'react';
import ButtonDU from './TombolDU';

const DetailPenyewaan: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[600px] relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-black text-xl font-bold mr-4"
                >
                    ×
                </button>

                {/* Content */}
                <div className="space-y-4 mt-4">
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Ini sewa</div>
                        <div className="w-auto px-2">:</div>
                        <div className="w-2/3 text-left">Putri</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Email</div>
                        <div className="w-auto px-2">:</div>
                        <div className="w-2/3 text-left">
                            <a href="mailto:Putri@gmail.com" className="text-blue-500 underline">
                                Putri@gmail.com
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">No Telepon</div>
                        <div className="w-2 px-2">:</div>
                        <div className="w-2/3 text-left">082323423423</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Alamat</div>
                        <div className="w-2 px-2">:</div>
                        <div className="w-2/3 text-left">Jl Indah Raya 22</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Asal Instansi</div>
                        <div className="w-2 px-2">:</div>
                        <div className="w-2/3 text-left">Presiden</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Tanggal Penyewaan</div>
                        <div className="w-2 px-2">:</div>
                        <div className="w-2/3 text-left">12 November 2024 - 15 Januari 2025</div>
                    </div>

                    <hr className="border-gray-300 my-4" />

                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Nama Alat</div>
                        <div className="w-2 px-2">:</div>
                        <div className="w-2/3 text-left">XRF</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Kuantitas</div>
                        <div className="w-2 px-2">:</div>
                        <div className="w-2/3 text-left">2</div>
                    </div>
                </div>

                <hr className="border-gray-300 my-4" />

                <div className="mt-6 text-center">
                    <ButtonDU variant='secondary' text='unduh surat pengantar'  onClick={() => alert("Button clicked!")} />
                </div>
            </div>
        </div>
    );
};

export default DetailPenyewaan;
