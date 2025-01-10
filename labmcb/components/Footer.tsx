const Footer = () => {
  return (
    <footer className="gradient-footer text-white py-1">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo dan Institusi */}
        <div className="flex items-center space-x-4">
          <img
            src="/assets/iha.png"
            alt="Indonesian Heritage Agency"
            className="h-16"
          />
          <img
            src="/assets/kembud.png"
            alt="Kementerian Pendidikan dan Kebudayaan"
            className="h-20"
          />
        </div>
        {/* Copyright */}
        <div
          className="text-center text-xs md:text-sm mt-4 md:mt-0"
          style={{ color: "#F3C7A0" }}
        >
          © 2025. All rights reserved.
        </div>
        {/* Kontak */}
        <div className="text-right text-xs md:text-sm mt-4 md:mt-0">
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
