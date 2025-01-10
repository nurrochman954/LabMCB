"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const menus = [
  { name: "beranda", href: "/" },
  { name: "pengenalan", href: "/pengenalan" },
  { name: "daftar peralatan", href: "/daftar-peralatan" },
  { name: "panduan", href: "/panduan" },
  { name: "halaman saya", href: "/halaman-saya" },
];

const TopBar = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [hoveringMenu, setHoveringMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 40;
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

    menus.forEach((menu) => {
      const element = document.getElementById(menu.name);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [menus]);

  return (
    <header
      className={`z-50 fixed left-0 right-0 transition-all duration-300 ${
        isSticky ? "top-0" : "top-[40px]"
      } py-1 ${
        hoveringMenu
          ? "bg-white bg-opacity-100"
          : "bg-black bg-opacity-25"
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
        } justify-center items-center gap-3 sm:gap-5 lg:gap-10 sm:flex-row flex-col mt-1 sm:mt-0`}
      >
        {menus.map((menu, i) => (
          <Link key={i} href={menu.href} passHref>
            <div
              onMouseEnter={() => setHoveringMenu(menu.name)}
              onMouseLeave={() => setHoveringMenu(null)}
              className={`w-full sm:w-auto capitalize text-base text-center sm:px-3 lg:px-5 py-1 sm:py-1 rounded-2xl transition-all ease-linear ${
                activeSection === menu.name
                  ? "bg-gray-800 text-white shadow-md"
                  : hoveringMenu === menu.name
                  ? "font-bold underline text-black"
                  : `text-${hoveringMenu ? 'black' : 'white'}`
              }`}
            >
              {menu.name}
            </div>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default TopBar;
