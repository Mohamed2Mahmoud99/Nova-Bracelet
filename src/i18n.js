// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Navbar labels
          home: "Home",
          about: "About",
          download: "Download",
          chat: "Chat",
          contact: "Contact",

          // Home section (keeps your exact wording)
          homeTitle: "Nova Bracelet",
          homeParagraph: `Welcome to Nova Care
Your health journey starts here.
At Nova Care, we make health simple and smart. The Nova Bracelet combines style with technology to give you real-time health insights, instant alerts in emergencies, and personalized wellness tracking.
Stay safe, stay connected, and take control of your well-being — all from your wrist.`,
          aboutProduct: "About Product",
          downloadApp: "Download App",

          // About section
          aboutHeading: "About Nova Bracelet",
          aboutParagraph: `Nova Care is your smart health companion, seamlessly connected to a wearable band that tracks your vital signs around the clock.
It provides real-time insights on heart rate, blood pressure, and oxygen levels, along with daily and monthly reports.
In emergencies, an SOS feature instantly shares your location with emergency services or trusted contacts.
Powered by AI, Nova Care analyzes your health data, predicts risks, and offers preventive guidance.
It also helps you set and achieve personalized health and fitness goals with tailored plans.`,

          // Projects / Download section
          downloadTitle: "Download App",
          downloadText: `Nova Care brings you the future of personal health right at your fingertips. 
With real-time monitoring, instant emergency alerts, and smart AI insights, 
it helps you stay safe, informed, and in control of your well-being. 
Download now and make Nova Care your trusted partner in living a healthier, smarter life.`,
          downloadButton: "⬇ Download for free",

          // Chat
           chatTitle: "Nova Chat",
           chatSubtitle: "Smart assistant for your Nova Bracelet",
           export: "Export",
           clear: "Clear",
           sending: "Sending…",
           retry: "Retry",
           copy: "Copy",
           failed: "Failed",
           pending: "Pending",
           thinking: "Thinking…",
           placeholder: "Ask me anything about Nova Bracelet...",
           send: "Send",
           sendingBtn: "Sending...",
           clearInput: "Clear",
           tip: "Tip: use Ctrl/Cmd + Enter to send",
           
          // Contact section
         contactTitle: "Contact Nova",
          contactIntro: "For professional inquiries or collaboration opportunities, I would be glad to connect. You can reach me directly at",
          contactEmail:"Hello@NovaCare.is-an.app",
          contactOutro:"I look forward to hearing from you and discussing how we can work together.",
          contactMessageSent: "Message Sent!",
          contactMessageError: "Oops! Something went wrong. Please try again.",
          namePlaceholder: "Name...",
          emailPlaceholder: "example@gmail.com",
          messagePlaceholder: "Your Message...",
          sendButton: "Send Message",
          copyright: "© copyright team Nova.co - 2026"
        },
      },
      ar: {
        translation: {
          // Navbar labels
          home: "الرئيسية",
          about: "حول",
          download: "تحميل",
          chat: "محادثة",
          contact: "اتصال",

          // Home section (Arabic version of the same wording)
          homeTitle: "سوار نوفا",
          homeParagraph: `مرحباً بك في نوفا كير
رحلتك الصحية تبدأ من هنا.
في نوفا كير، نجعل الصحة سهلة وذكية. سوار نوفا يجمع بين الأناقة والتكنولوجيا ليمنحك بيانات صحية فورية، وتنبيهات في حالات الطوارئ، ومتابعة شخصية لرفاهيتك.
ابق آمناً، متصلاً، وتحكم بصحتك — مباشرة من معصمك.`,
          aboutProduct: "حول المنتج",
          downloadApp: "تحميل التطبيق",

          // About section
         aboutHeading: "عن سوار نوفا",
          aboutParagraph: `نوفا كير هو رفيقك الصحي الذكي، متصل بسلاسة بفرقة قابلة للارتداء تتتبع علامتك الحيوية على مدار الساعة.
يوفر رؤى فورية عن معدل ضربات القلب وضغط الدم ومستويات الأكسجين، إلى جانب تقارير يومية وشهرية.
في حالات الطوارئ، تُشارك ميزة SOS موقعك فوراً مع خدمات الطوارئ أو جهات الاتصال الموثوقة.
مدعوم بالذكاء الاصطناعي، يحلل نوفا كير بياناتك الصحية، ويتنبأ بالمخاطر، ويقدّم إرشادات وقائية.
كما يساعدك في وضع وتحقيق أهداف صحية ولياقية شخصية من خلال خطط مخصصة.`,

          // Projects / Download section
          downloadTitle: "تحميل التطبيق",
          downloadText: `يقدّم لك نوفا كير مستقبل الصحة الشخصية في متناول يدك.
مع المراقبة الفورية، وتنبيهات الطوارئ الفورية، وتحليلات ذكية بالذكاء الاصطناعي،
يساعدك على البقاء آمناً ومطلعاً ومسؤولا عن رفاهيتك.
قم بالتحميل الآن واجعل نوفا كير شريكك الموثوق لحياة أكثر صحة وذكاءً.`,
          downloadButton: "⬇ التحميل مجاني",

          // Chat
          chatTitle: "دردشة نوفا",
          chatSubtitle: "مساعد ذكي لسوار نوفا",
          export: "تصدير",
          clear: "مسح",
          sending: "جارٍ الإرسال…",
          retry: "إعادة المحاولة",
          copy: "نسخ",
          failed: "فشل",
          pending: "قيد الإرسال",
          thinking: "يفكر…",
          placeholder: "اسألني أي شيء عن سوار نوفا...",
          send: "إرسال",
          sendingBtn: "جارٍ الإرسال...",
          clearInput: "مسح",
          tip: "تلميح: استخدم Ctrl/Cmd + Enter للإرسال",

          // Contact section
          contactTitle: "تواصل مع نوفا",
          contactIntro: "للاستفسارات المهنية أو فرص التعاون، يسعدني التواصل معك. يمكنك الوصول إلي مباشرة على",
          contactEmail: "Hello@NovaCare.is-an.app",
          contactOutro: "أتطلع لسماعك ومناقشة كيف يمكننا العمل معًا.",
          contactMessageSent: "تم إرسال الرسالة!",
          contactMessageError: "عفوًا! حدث خطأ. حاول مرة أخرى.",
          namePlaceholder: "الاسم...",
          emailPlaceholder: "example@gmail.com",
          messagePlaceholder: "رسالتك...",
          sendButton: "إرسال",
          copyright: "© حقوق النشر فريق Nova.co - 2026"

        },
      },
    },

    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

// keep document dir in sync
document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
i18n.on("languageChanged", (lng) => {
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
});

export default i18n;
