import { useEffect, useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

export const About = () => {
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");

  useEffect(() => {
    const onChange = (lng) => setLang(lng);
    i18n.on("languageChanged", onChange);
    return () => i18n.off("languageChanged", onChange);
  }, [i18n]);

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
      id="about"
      className="min-h-screen flex items-center justify-center py-20 text-black"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-stretch">
          {/* Left side: Swiper */}
          <div className="flex items-center justify-center">
            <div className="w-[300px] md:w-[500px] mx-auto mt-6 h-auto">
              <Swiper
  key={lang}
  spaceBetween={20}
  slidesPerView={1}
  pagination={{ clickable: true }}
  modules={[Pagination]}
  className="relative rounded-2xl shadow-2xl"
>
  <SwiperSlide>
    <div className="w-full h-[420px] md:h-[520px] lg:h-[640px] flex items-center justify-center bg-black rounded-2xl overflow-hidden shadow-lg">
      <img
        src="/NOVA.png"
        alt="Smartwatch 1"
        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
      />
    </div>
  </SwiperSlide>
  <SwiperSlide>
    <div className="w-full h-[420px] md:h-[520px] lg:h-[640px] flex items-center justify-center bg-black rounded-2xl overflow-hidden shadow-lg">
      <img
        src="/ChatGPT Image Aug 16, 2025, 02_42_08 PM.png"
        alt="Smartwatch 2"
        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
      />
    </div>
  </SwiperSlide>
  <SwiperSlide>
    <div className="w-full h-[420px] md:h-[520px] lg:h-[640px] flex items-center justify-center bg-black rounded-2xl overflow-hidden shadow-lg">
      <img
        src="/ChatGPT Image Aug 16, 2025, 02_42_03 PM.png"
        alt="Smartwatch 3"
        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
      />
    </div>
  </SwiperSlide>
</Swiper>
              {/* Fix bullet positioning */}
              <style>
                {`
                  .swiper-pagination {
                    bottom: -25px !important;
                  }
                  .swiper-pagination-bullet {
                    background: #1d697e !important;
                    opacity: 0.6;
                  }
                  .swiper-pagination-bullet-active {
                    background: #0e5063 !important;
                    opacity: 1;
                    transform: scale(1.2);
                  }
                `}
              </style>
            </div>
          </div>

          {/* Right side: About Text */}
          <div className="flex flex-col justify-center">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-black">
              <span className="bg-gradient-to-r from-[#1d697e] to-[#0e5063] bg-clip-text text-transparent">
                {t("aboutHeading")}
              </span>
            </h3>

            <p className="text-white text-lg mb-10 leading-relaxed">
              {renderParagraphWithBreaks("aboutParagraph")}
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};




/*import { useEffect, useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

export const About = () => {
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");

  useEffect(() => {
    const onChange = (lng) => setLang(lng);
    i18n.on("languageChanged", onChange);
    return () => i18n.off("languageChanged", onChange);
  }, [i18n]);

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
      id="about"
      className="min-h-screen flex items-center justify-center py-20 text-black"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-stretch">
          <div className="flex items-center justify-center">
            <div className="w-[300px] md:w-[500px] mx-auto mt-6 h-auto md:h-[520px] lg:h-[640px]">
              <Swiper
                key={lang}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                style={{ height: "95%" }}
              >
                <SwiperSlide>
                  <img
                    src="/NOVA.png"
                    alt="Smartwatch 1"
                    className="rounded-2xl shadow-lg w-full h-full object-contain"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/ChatGPT Image Aug 16, 2025, 02_42_08 PM.png"
                    alt="Smartwatch 2"
                    className="rounded-2xl shadow-lg w-full h-full object-contain"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/ChatGPT Image Aug 16, 2025, 02_42_03 PM.png"
                    alt="Smartwatch 3"
                    className="rounded-2xl shadow-lg w-full h-full object-contain"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-black">
              <span className="bg-gradient-to-r from-[#1d697e] to-[#0e5063] bg-clip-text text-transparent">
                {t("aboutHeading")}
              </span>
            </h3>

            <p className="text-white text-lg mb-10 leading-relaxed">
              {renderParagraphWithBreaks("aboutParagraph")}
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};*/