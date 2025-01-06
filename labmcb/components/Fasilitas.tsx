"use client";

const Fasilitas = () => {
  return (
    <section id="fasilitas-kami" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Fasilitas Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Item Fasilitas 1 */}
          <div className="relative group rounded-lg overflow-hidden flex justify-center items-center h-64">
            <img
              src="/assets/3dlaser.png"
              alt="Pengenalan Alat"
              className="w-auto h-full object-contain transition-transform transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-white text-lg font-bold">Pengenalan Alat</h3>
            </div>
          </div>
          {/* Item Fasilitas 2 */}
          <div className="relative group rounded-lg overflow-hidden flex justify-center items-center h-64">
            <img
              src="/assets/3dlaser.png"
              alt="Penyewaan Alat"
              className="w-auto h-full object-contain transition-transform transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-white text-lg font-bold">Penyewaan Alat</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fasilitas;
