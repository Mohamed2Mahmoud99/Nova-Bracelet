// src/components/Navbar.jsx
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 relative">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 bg-[#1d697e] text-white rounded text-sm hover:bg-[#0e5063] transition"
            >
              {i18n.language === "en" ? "AR" : "EN"}
            </button>

            <Link to="/" className="font-mono text-xl font-bold text-white">
              <span className="text-[#5ccae9]">NOVA</span>
            </Link>
          </div>

          {!menuOpen && (
            <div
              className="w-7 h-5 relative cursor-pointer z-50 md:hidden text-white text-2xl"
              onClick={() => setMenuOpen(true)}
            >
              &#9776;
            </div>
          )}

          <div className="hidden md:flex items-center gap-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              {t("home")}
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              {t("about")}
            </Link>
            <Link to="/projects" className="text-gray-300 hover:text-white transition-colors">
              {t("download")}
            </Link>
            <Link to="/chat" className="text-gray-300 hover:text-white transition-colors">
              {t("chat")}
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
              {t("contact")}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};