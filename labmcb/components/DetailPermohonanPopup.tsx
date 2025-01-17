import React from 'react';

const DetailPermohonan: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[600px]">

                <div className="space-y-2">
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Nama Lengkap</div>
                        <div className="w-2">:</div>
                        <div className="w-2/3 text-left">Putri</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Email</div>
                        <div className="w-2">:</div>
                        <div className="w-2/3 text-left">
                            <a href="mailto:Putri@gmail.com" className="text-blue-500 underline">
                                Putri@gmail.com
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">No Telepon</div>
                        <div className="w-2">:</div>
                        <div className="w-2/3 text-left">082323423423</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Alamat</div>
                        <div className="w-2">:</div>
                        <div className="w-2/3 text-left">Jl Indah Raya 22</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Asal Instansi</div>
                        <div className="w-2">:</div>
                        <div className="w-2/3 text-left">Presiden</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Metode Pengirim</div>
                        <div className="w-2">:</div>
                        <div className="w-2/3 text-left">Jasa Ekspedisi - 712783138473204</div>
                    </div>

                    <hr className="border-gray-300 my-4" />

                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Nama Sampel</div>
                        <div className="w-2">:</div>
                        <div className="w-2/3 text-left">Batu Alam</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Jumlah Sampel</div>
                        <div className="w-2">:</div>
                        <div className="w-2/3 text-left">5</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Bentuk Sampel</div>
                        <div className="w-2">:</div>
                        <div className="w-2/3 text-left">Padat</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Jenis Sampel</div>
                        <div className="w-2">:</div>
                        <div className="w-2/3 text-left">XRF, SEM</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3 font-bold">Catatan Tambahan</div>
                        <div className="w-2">:</div>
                        <div className="w-2/3 text-left">-</div>
                    </div>
                </div>

                <hr className="border-gray-300 my-4" />

                <div className="mt-6 text-center">
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-md flex items-center justify-center">
                        <span className="mr-2">↓</span>
                        Unduh Surat Pengantar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailPermohonan;
