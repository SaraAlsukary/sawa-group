import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationAr from "./locale/ar.json";
import translationEn from "./locale/en.json";
import translationJp from "./locale/ja.json";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

const resources = {
  en: { translation: translationEn },
  ar: { translation: translationAr },
  ja: { translation: translationJp },
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ["en", "ar", "ja"],
    fallbackLng: "en",
    debug: true,
    detection: {
      // تم إضافة "navigator" للكشف عن لغة متصفح/جهاز المستخدم
      order: ["path", "cookie", "navigator", "htmlTag", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
  });

export default i18n;