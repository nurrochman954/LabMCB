import React from "react";

const Header = () => {
  return (
    <header className="bg-primary text-white relative">
      <div className="flex items-center justify-between">
        {/* Navigasi Kiri */}
        <div></div> {/* Kosongkan area ini untuk sisi kiri */}

        {/* Navigasi Kanan */}
        <a
          href="/sign-in"
          className="font-semibold bg-secondary text-white px-4 py-2 hover:bg-green-500"
        >
          Masuk
        </a>
      </div>
    </header>
  );
};

export default Header;
