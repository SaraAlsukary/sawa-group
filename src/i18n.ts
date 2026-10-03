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
    
    // 1. إجبار المكتبة على أخذ رمز اللغة فقط (تحويل en-US إلى en)
    load: "languageOnly", 

    debug: true,
    detection: {
      // 2. الترتيب الصحيح: الكوكيز أولاً (إذا اختار المستخدم لغة سابقاً)، ثم لغة الجهاز
      order: ["cookie", "navigator", "path", "htmlTag"],
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