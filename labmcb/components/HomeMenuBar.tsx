"use client";

import { useEffect, useState } from "react";

const menus = ["beranda", "pengenalan", "daftar peralatan", "panduan", "halaman saya"];

const HomeMenuBar = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 50; // Tinggi header "FAQ" dan "Masuk"
      setIsSticky(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    };

    const observer = new IntersectionObserver((entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    menus.forEach((menu: string) => {
      const element = document.getElementById(menu);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [menus]);

  return (
    <header
      className={`z-50 fixed left-0 right-0 transition-all duration-300 ${
        isSticky ? "top-0 bg-black bg-opacity-75 py-4" : "top-[50px] bg-transparent"
      }`}
    >
      <div className="px-4 flex justify-end sm:hidden">
        <button
          className="cursor-pointer"
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 246.42 246.04"
            className="fill-white w-8 h-8"
          >
            <rect
              x="0.79"
              y="30.22"
              width="245.63"
              height="23.36"
              rx="11.68"
            />
            <rect
              x="0.39"
              y="111.32"
              width="245.63"
              height="23.36"
              rx="11.68"
            />
            <rect
              y="192.42"
              width="245.63"
              height="23.36"
              rx="11.68"
            />
          </svg>
        </button>
      </div>
      <nav
        className={`${
          toggleMenu ? "flex" : "hidden sm:flex"
        } justify-center items-center gap-3 sm:gap-5 lg:gap-10 sm:flex-row flex-col mt-2 sm:mt-0`}
      >
        {menus.map((menu: string, i: number) => (
          <a
            key={i}
            href={`#${menu}`}
            className={`w-full sm:w-auto uppercase font-semibold text-base text-white text-center sm:px-3 lg:px-5 py-2 sm:py-1 rounded-2xl transition-all ease-linear hover:bg-green hover:shadow-md ${
              activeSection == menu ? "bg-green shadow-md" : ""
            }`}
          >
            {menu}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default HomeMenuBar;
