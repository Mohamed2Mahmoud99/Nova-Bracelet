import { useEffect, useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");

  useEffect(() => {
    const onChange = (lng) => setLang(lng);
    i18n.on("languageChanged", onChange);
    return () => {
      i18n.off("languageChanged", onChange);
    };
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    // keep dir in sync (i18n.js may also handle this)
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  // preserve newlines from the translation string
  const renderParagraphWithBreaks = (key) =>
    t(key)
      .split("\n")
      .map((line, idx) => (
        <span key={idx}>
          {line}
          <br />
        </span>
      ));

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 px-3 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-900 transition z-0"
      >
        {lang === "en" ? "AR" : "EN"}
      </button>

      <RevealOnScroll>
        <div className="text-center z-10 px-4 relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#1d697e] to-[#0e5063] bg-clip-text text-transparent loading-right relative">
            {t("homeTitle")}
          </h1>

          <p className="text-white text-lg mb-8 max-w-lg mx-auto">
            {renderParagraphWithBreaks("homeParagraph")}
          </p>

          {/* use gap instead of space-x so spacing respects RTL; optional flex-row-reverse to mirror order */}
          <div className={`flex justify-center gap-4 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
            <a
              href="/about"
              className="bg-[#1d697e] text-black py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              {t("aboutProduct")}
            </a>

            <a
              href="/projects"
              className="border border-[#073542] text-white py-3 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-500/10"
            >
              {t("downloadApp")}
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
