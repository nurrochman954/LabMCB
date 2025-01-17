import React from 'react';
import ButtonDU from "@/components/TombolDU";

interface DetailProps {
    onClose: () => void;
}

const DetailPermohonan: React.FC<DetailProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[600px]">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Detail Permohonan</h2>
                    <button onClick={onClose} className="text-black text-xl font-bold">×</button>
                </div>

                <div className="space-y-4">
                    <div className="flex">
                        <div className="w-1/3 font-medium">Nama Lengkap</div>
                        <div className="w-2/3">: Putri</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 font-medium">Email</div>
                        <div className="w-2/3">: <a href="mailto:Putri@gmail.com" className="text-blue-500 underline">Putri@gmail.com</a></div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 font-medium">No Telepon</div>
                        <div className="w-2/3">: 082323423423</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 font-medium">Alamat</div>
                        <div className="w-2/3">: Jl Indah Raya 22</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 font-medium">Asal Instansi</div>
                        <div className="w-2/3">: Presiden</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 font-medium">Metode Pengirim</div>
                        <div className="w-2/3">: Jasa Ekspedisi - 712783138473204</div>
                    </div>

                    <hr className="border-gray-300 my-4" />

                    <div className="flex">
                        <div className="w-1/3 font-medium">Nama Sampel</div>
                        <div className="w-2/3">: Batu Alam</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 font-medium">Jumlah Sampel</div>
                        <div className="w-2/3">: 5</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 font-medium">Bentuk Sampel</div>
                        <div className="w-2/3">: Padat</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 font-medium">Jenis Sampel</div>
                        <div className="w-2/3">: XRF, SEM</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 font-medium">Catatan Tambahan</div>
                        <div className="w-2/3">: -</div>
                    </div>
                </div>

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
