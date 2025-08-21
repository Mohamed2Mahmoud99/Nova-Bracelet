




import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const { t } = useTranslation();

  const itemBase =
    "text-2xl font-semibold text-white my-4 transform transition-transform duration-300";

  return (
    <div
      className={`fixed top-0 left-0 w-full z-30 flex flex-col items-center justify-center bg-[rgba(10,10,10,0.8)]
        transition-all duration-300 ease-in-out
        ${
          menuOpen
            ? "h-screen opacity-100 pointer-events-auto"
            : "h-0 opacity-0 pointer-events-none"
        }
      `}
    >
      {menuOpen && (
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-white text-3xl focus:outline-none cursor-pointer z-40"
          aria-label={t("closeMenu") ?? "Close Menu"}
        >
          &times;
        </button>
      )}

      <Link
        to="/"
        onClick={() => setMenuOpen(false)}
        className={`${itemBase} ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {t("home")}
      </Link>

      <Link
        to="/about"
        onClick={() => setMenuOpen(false)}
        className={`${itemBase} ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {t("about")}
      </Link>

      <Link
        to="/projects"
        onClick={() => setMenuOpen(false)}
        className={`${itemBase} ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {t("download")}
      </Link>
      
      <Link
        to="/chat"
        onClick={() => setMenuOpen(false)}
        className={`${itemBase} ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {t("chat")}
      </Link>

      <Link
        to="/contact"
        onClick={() => setMenuOpen(false)}
        className={`${itemBase} ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {t("contact")}
      </Link>
    </div>
  );
};