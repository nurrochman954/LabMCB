import React from 'react';
import UnduhSurat from "./UnduhSuratButton";

const BoxPanduan = () => {
  return (
    <>
      <div
        className="w-full h-[400px] shadow-md gradient-box flex items-center"
        style={{
          margin: '10px auto',
          padding: '20px 20px 20px 0',
          color: '#000',
          fontFamily: 'Lato, sans-serif',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
          marginBottom: '30px',
        }}
      >
        <div
          className="w-[400px] h-[250px] bg-[#FED9B7] flex items-center justify-center"
          style={{
            borderTopRightRadius: '150px',
            borderBottomRightRadius: '150px',
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            fontWeight: 'bold',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          <p className="text-2xl text-left leading-loose">
            Panduan <br />Analisis <br />Permohonan
          </p>
        </div>

        <div
          className="flex items-center justify-center"
          style={{
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div className="flex-1 p-10 text-sm pt-5 pb-5">
            <ol className="list-decimal space-y-1">
              <li>Customer mengunduh File Surat Pengantar</li>
              <li>Customer mengisi Formulir Permohonan Analisis</li>
              <li>Customer mengirimkan sampel kepada Admin Laboratorium. Pengiriman sampel bisa secara langsung datang ke Balai Konservasi Borobudur atau diantar dengan jasa ekspedisi</li>
              <li>Untuk memantau proses analisis/uji sampel customer dapat mengecek secara berkala pada page “Halaman Saya” dan fitur “Tracking Permohonan Analisis dan Penyewaan Alat”</li>
              <li>Admin Laboratorium akan memberikan jawaban apakah Supervisor menyetujui atau tidak pada proses analisis/uji sampel</li>
              <li>Apabila proses Analisis/uji sampel telah di selesaikan oleh Laboran, customer akan mendapatkan invoice/faktur untuk segera melunaskan pembayaran dan mengunggah bukti pembayaran.</li>
              <li>Setelah bukti pembayaran diterima, Admin Laboratorium akan mengirimkan Laporan Analisis/Uji sampel</li>
              <li>Untuk informasi lebih lanjut, dapat menghubungi nomor dibawah ini</li>
            </ol>
          </div>
          <div className="flex justify-end w-full">
            <UnduhSurat />
          </div>
        </div>
      </div>

      <div
        className="w-full h-[340px] shadow-md gradient-box flex items-center"
        style={{
          margin: '10px auto',
          padding: '20px 20px 20px 0',
          color: '#000',
          fontFamily: 'Lato, sans-serif',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
          marginBottom: '30px',
        }}
      >
        <div
          className="w-[400px] h-[250px] bg-[#FED9B7] flex items-center justify-center "
          style={{
            borderTopRightRadius: '150px',
            borderBottomRightRadius: '150px',
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            fontWeight: 'bold',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          <p className="text-2xl text-left leading-loose">
            Panduan<br />Penyewaan <br />Alat
          </p>
        </div>

        <div
          className="flex items-center justify-center p-10 text-sm pt-5 pb-5"
          style={{
            flexDirection: 'column',
            height: '100%',
          }}
        >
            <ol className="list-decimal space-y-1">
              <li>Customer mengunduh File Surat Pengantar</li>
              <li>Customer mengisi Formulir Permohonan Analisis</li>
              <li>Customer mengirimkan sampel kepada Admin Laboratorium. Pengiriman sampel bisa secara langsung datang ke Balai Konservasi Borobudur atau diantar dengan jasa ekspedisi</li>
              <li>Untuk memantau proses analisis/uji sampel customer dapat mengecek secara berkala pada page “Halaman Saya” dan fitur “Tracking Permohonan Analisis dan Penyewaan Alat”</li>
              <li>Admin Laboratorium akan memberikan jawaban apakah Supervisor menyetujui atau tidak pada proses analisis/uji sampel</li>
              <li>Apabila proses Analisis/uji sampel telah di selesaikan oleh Laboran, customer akan mendapatkan invoice/faktur untuk segera melunaskan pembayaran dan mengunggah bukti pembayaran.</li>
              <li>Setelah bukti pembayaran diterima, Admin Laboratorium akan mengirimkan Laporan Analisis/Uji sampel</li>
              <li>Untuk informasi lebih lanjut, dapat menghubungi nomor dibawah ini</li>
            </ol>
        </div>
      </div>
    </>
  );
};

export default BoxPanduan;
