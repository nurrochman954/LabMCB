import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-900 text-white relative">
      <div className="flex items-center justify-between">
        {/* Kotak FAQ */}
        <a
          href="/faq"
          className="font-semibold bg-green-600 text-white px-4 py-2 hover:bg-green-500"
          style={{ marginLeft: 0 }}
        >
          FAQ
        </a>
        {/* Navigasi Kanan */}
        <a
          href="/sign-in"
          className="font-semibold text-white hover:text-blue-400 mr-4"
        >
          Masuk
        </a>
      </div>
    </header>
  );
};

export default Header;
