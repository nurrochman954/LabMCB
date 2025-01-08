import React from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import TopBar from "../../../components/TopBar";

const Home = () => {
    return (
        <>
            <Header />
            <div className="flex min-h-screen bg-[#f8f8f8]">
                {/* Sidebar */}
                <TopBar />

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <h1 className="text-4xl font-bold text-center mb-10 text-[#000000]">
                        Daftar Panduan
                    </h1>

                    {/* Content Section */}
                    <div className="space-y-10">

                        {/* Panduan Permohonan Analisis */}
                        <div className="bg-[#FFF3DB] border-[#FFF3DB] p-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start">
                            {/* Judul di Kiri */}
                            <h2 className="text-xl font-bold text-[#000000] mb-4 md:mb-0 text-left">
                                Panduan Permohonan Analisis
                            </h2>
                            {/* Isi Panduan dan Tombol */}
                            <div className="relative">
                                {/* Isi Panduan */}
                                <ol className="list-decimal ml-0 md:ml-6 text-gray-700 text-lg space-y-2">
                                    <li>Customer mengirim surat dan sampel kepada Admin Laboratorium</li>
                                    <li>Customer mendapatkan informasi dari Admin Laboratorium mengenai persetujuan analisis sampel</li>
                                    <li>Admin Laboratorium mengonfirmasi pembayaran dan pengiriman invoice jika disetujui</li>
                                    <li>Customer dapat memilih</li>
                                </ol>
                                {/* Tombol di Kanan Bawah */}
                                <button className="absolute bottom-0 right-0 bg-[#1F3274] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#14244d]">
                                    <svg className="inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.707 10.293a1 1 0 00-1.414 0L11 14.586V3a1 1 0 10-2 0v11.586L4.707 10.293a1 1 0 00-1.414 1.414l6 6a1 1 0 001.414 0l6-6a1 1 0 000-1.414z" />
                                    </svg>
                                    Unduh File Surat Pengantar
                                </button>
                            </div>
                        </div>

                        {/* Panduan Pembayaran */}
                        <div className="bg-[#FFFDF5] border-[#FFFDF5] p-8 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-4 items-start">
                            {/* Isi Panduan */}
                            <div className="relative pb-12"> {/* Tambahkan padding-bottom di sini */}
                                <ol className="list-decimal ml-0 md:ml-6 text-gray-700 text-lg space-y-2">
                                <li>Customer menerima invoice dari Admin Laboratorium</li>
                                <li>Customer melakukan pembayaran sesuai dengan invoice</li>
                                <li>Customer mengirimkan bukti pembayaran kepada Admin Laboratorium</li>
                                <li>Admin Laboratorium mengonfirmasi penerimaan pembayaran</li>
                                </ol>

                                {/* Tombol di Bawah Kiri */}
                                <button className="absolute bottom-0 left-0 bg-[#1F3274] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#14244d]">
                                <svg
                                    className="inline-block w-5 h-5 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M16.707 10.293a1 1 0 00-1.414 0L11 14.586V3a1 1 0 10-2 0v11.586L4.707 10.293a1 1 0 00-1.414 1.414l6 6a1 1 0 001.414 0l6-6a1 1 0 000-1.414z" />
                                </svg>
                                Unduh File Template
                                </button>
                            </div>

                            {/* Judul di Kanan */}
                            <h2 className="text-xl font-bold text-[#000000] mb-4 md:mb-0 text-right">
                                Panduan Pembayaran
                            </h2>
                        </div>



                        {/* Panduan Penyewaan Alat */}
                        <div className="bg-[#FFF3DB] border-[#FFF3DB] p-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start">
                            {/* Judul di Kiri */}
                            <h2 className="text-xl font-bold text-[#000000] mb-4 md:mb-0 text-left">
                                Panduan Penyewaan Alat
                            </h2>
                            {/* Isi Panduan dan Tombol */}
                            <div className="relative">
                                {/* Isi Panduan */}
                                <ol className="list-decimal ml-0 md:ml-6 text-gray-700 text-lg space-y-2">
                                    <li>Customer mengajukan permohonan penyewaan alat melalui Admin Laboratorium</li>
                                    <li>Admin Laboratorium menginformasikan ketersediaan alat dan persyaratan penyewaan</li>
                                    <li>Customer menyetujui syarat dan ketentuan penyewaan alat</li>
                                    <li>Admin Laboratorium menyerahkan alat kepada Customer setelah pembayaran diterima</li>
                                </ol>
                                {/* Tombol di Kanan Bawah */}
                                <button className="absolute bottom-0 right-0 bg-[#1F3274] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#14244d]">
                                    <svg className="inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.707 10.293a1 1 0 00-1.414 0L11 14.586V3a1 1 0 10-2 0v11.586L4.707 10.293a1 1 0 00-1.414 1.414l6 6a1 1 0 001.414 0l6-6a1 1 0 000-1.414z" />
                                    </svg>
                                    Unduh Template Penyewaan
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
