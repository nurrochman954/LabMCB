const Footer = () => {
  return (
    <footer className="gradient-footer text-white py-1">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo dan Institusi */}
        <div className="flex items-center space-x-4">
          <img
            src="/assets/iha.png"
            alt="Indonesian Heritage Agency"
            className="h-14"
          />
          <img
            src="/assets/kembud3.png"
            alt="Kementerian Pendidikan dan Kebudayaan"
            className="h-14"
          />
          {/* Tulisan Kementerian */}
          <div className="text-left ml-4">
            <span
              className="block text-[8px] md:text-[10px] font-semibold"
              style={{ color: "#F3C7A0" }}
            >
              KEMENTERIAN
            </span>
            <span
              className="block text-[8px] md:text-[10px] font-semibold"
              style={{ color: "#F3C7A0" }}
            >
              KEBUDAYAAN
            </span>
            <span
              className="block text-[8px] md:text-[10px] font-semibold"
              style={{ color: "#F3C7A0" }}
            >
              REPUBLIK
            </span>
            <span
              className="block text-[8px] md:text-[10px] font-semibold"
              style={{ color: "#F3C7A0" }}
            >
              INDONESIA
            </span>
          </div>
        </div>
        {/* Copyright */}
        <div
          className="flex justify-center items-center text-[14px] md:text-[12px] mt-4 md:mt-0"
          style={{ color: "#F3C7A0" }}
        >
          © 2025. All Rights Reserved.
        </div>
        {/* Kontak */}
        <div className="text-right text-[8px] md:text-[11px] mt-4 md:mt-0">
          <span className="block font-semibold" style={{ color: "#F3C7A0" }}>
            Contact:
          </span>
          <div
            className="w-35 h-px mx-auto mt-1 mb-2"
            style={{
              backgroundColor: "#F3C7A0",
            }}
          ></div>
          <a
            href="mailto:bkbborobudur@gmail.com"
            className="block hover:underline"
            style={{ color: "#F3C7A0" }}
          >
            bkbborobudur@gmail.com
          </a>
          <a
            href="tel:+6281234567890"
            className="hover:underline"
            style={{ color: "#F3C7A0" }}
          >
            +62-812-3456-7890
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
