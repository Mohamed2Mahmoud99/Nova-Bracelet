import { useEffect, useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // keep component in sync with language changes so it re-renders
  useEffect(() => {
    const onChange = (lng) => setLang(lng);
    i18n.on("languageChanged", onChange);
    return () => i18n.off("languageChanged", onChange);
  }, [i18n]);

  const SERVICE_ID = "service_89qbb0u";
  const TEMPLATE_ID = "template_3l4db0b";
  const PUBLIC_KEY = "oT7MBC4fxj48jOVMD";

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
      .then(() => {
        alert(t("contactMessageSent"));
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => alert(t("contactMessageError")));
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-20"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
            <span className="bg-gradient-to-r from-[#1d697e] to-[#0e5063] bg-clip-text text-transparent">
              {t("contactTitle")}
            </span>
          </h2>
         
          <div className="rounded-xl p-8 border-white/10 border hover:-translate-y-1 transition-all">
            <p className="text-white mb-6">
              {t("contactIntro")}
              <strong> {t("contactEmail")}</strong>.
              {" "}{t("contactOutro")}
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="from_name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-black transition focus:outline-none focus:border-[#17586A] focus:bg-blue-500/5"
                placeholder={t("namePlaceholder")}
              />
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                name="reply_to"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-black transition focus:outline-none focus:border-[#17586A] focus:bg-blue-500/5"
                placeholder={t("emailPlaceholder")}
              />
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-black transition focus:outline-none focus:border-[#17586A] focus:bg-blue-500/5"
                placeholder={t("messagePlaceholder")}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#17586A] text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              {t("sendButton")}
            </button>
          </form>

          <footer className="mt-20 text-center text-white text-lg font-semibold">
            {t("copyright")}
          </footer>
        </div>
      </RevealOnScroll>
    </section>
  );
};