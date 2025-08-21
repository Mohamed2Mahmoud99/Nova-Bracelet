import { useEffect, useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { useTranslation } from "react-i18next";

export const Projects = () => {
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");

  useEffect(() => {
    const onChange = (lng) => setLang(lng);
    i18n.on("languageChanged", onChange);
    return () => i18n.off("languageChanged", onChange);
  }, [i18n]);

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
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* TEXT LEFT (will align right in Arabic) */}
          <div className={lang === "ar" ? "text-right" : "text-left"}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-[#1d697e] to-[#0e5063] bg-clip-text text-transparent">
                {t("downloadTitle")}
              </span>
            </h2>

            <p className="text-white text-lg mb-10 leading-relaxed">
              {renderParagraphWithBreaks("downloadText")}
            </p>

            <a
              href="#"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[#17586A] text-white font-semibold shadow-md hover:bg-[#0f3f4a] transition"
            >
              {t("downloadButton")}
            </a>
          </div>

          {/* IMAGE RIGHT */}
          <div className="flex justify-center w-[300px] md:w-[500px] mx-auto mt-10">
            <img
              src="public\\IMG_1101.png"
              alt="Nova Care App"
              className="rounded-2xl shadow-lg max-w-full"
            />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};