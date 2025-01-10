"use client";

const PendaftaranAnalisis = () => {
  return (
    <section id="pendaftaran-analisis" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Gambar */}
          <div className="relative md:order-1 flex justify-center">
            <img
              src="/assets/3dlaser.png"
              alt="Pendaftaran Analisis"
              className="rounded-lg shadow-lg max-w-sm md:max-w-md w-full h-auto"
            />
          </div>
          {/* Konten Teks */}
          <div className="md:order-2">
            <h2 className="text-white md:text-4xl font-bold mb-4">
              Pendaftaran Analisis
            </h2>
            <p className="text-white text-sm md:text-base leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a
              href="#"
              className="mt-6 inline-block bg-secondary text-white px-6 py-3 rounded-md font-semibold transition-transform transform hover:scale-105"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PendaftaranAnalisis;