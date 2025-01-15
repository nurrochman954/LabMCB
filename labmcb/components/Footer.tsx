const Footer = () => {
  return (
    <footer className="gradient-footer text-white py-1">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo dan Institusi */}
        <div className="flex items-center space-x-4">
          <img
            src="/assets/iha.png"
            alt="Indonesian Heritage Agency"
            className="h-12 pl-9"
          />
          <img
            src="/assets/kembud3.png"
            alt="Kementerian Pendidikan dan Kebudayaan"
            className="h-10 "
          />
          {/* Tulisan Kementerian */}
          <div className="text-left">
            <span
              className="block text-[7px] md:text-[8px] font-semibold"
              style={{ color: "#F3C7A0" }}
            >
              KEMENTERIAN<br />
              KEBUDAYAAN<br />
              REPUBLIK<br />
              INDONESIA
            </span>
          </div>

        </div>
        {/* Copyright */}
        <div
          className="flex justify-center items-center text-[18px] md:text-[14px] mt-4 md:mt-0"
          style={{ color: "#F3C7A0" }}
        >
          © 2025. All Rights Reserved.
        </div>
        {/* Kontak */}
        <div className="text-right text-[12px] md:text-[13px] mt-4 md:mt-0 pr-8">
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
