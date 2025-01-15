"use client";

import { useRouter } from "next/navigation";

const PenyewaanAlat = () => {
  const router = useRouter();

  const handleNavigateToPanduan = () => {
    router.push('/formulir-penyewaan-alat');
  };

  return (
    <div className="w-full py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Content Container */}
        <div className="flex flex-col gap-8">
          {/* Title - Left Aligned */}
          <h2 className="text-3xl font-bold text-right">
            Penyewaan Alat
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Text Content */}
            <div className="flex-1 flex items-center">
              <p className="text-gray-600 text-base leading-relaxed">
              Kami menyediakan layanan penyewaan alat berbasis proyek. Untuk melihat alat yang kami sediakan anda dapat memeriksa halaman daftar peralatan. <br /><br />
              <b>Penting! </b> Sebelum menyewakan alat, mohon pastikan terlebih dahulu ketersediaannya melalui kontak kami.
              </p>
            </div>

            {/* Image Card Container */}
            <div className="w-full md:w-[493px]">
              <div className="relative rounded-lg overflow-hidden h-[248px]">
                {/* Image */}
                <img
                  src="/assets/PenyewaanAlat.png"
                  alt="Uji Sampel"
                  className="w-full h-full object-cover rounded-lg"
                />
                
                {/* Button Overlay */}
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="bg-[#D9D9D9]/70 backdrop-blur-sm w-[492px] h-[77px]">
                    <button 
                      onClick={handleNavigateToPanduan}
                      className="w-full h-full px-6 flex items-center justify-between cursor-pointer hover:bg-black/10 transition-colors">
                      <span className="text-white font-medium text-xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        Cek Lebih Lanjut
                      </span>
                      <img
                        src="/assets/rightarrow.png"
                        alt="arrow icon"
                        className="ml-2 w-8 h-8 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PenyewaanAlat;
