import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslations from "./assets/locales/en/translations.json";
import frTranslations from "./assets/locales/fr/translations.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: enTranslations,
      fr: frTranslations
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    react: {
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["b", "strong", "0i", "em", "u", "s", "li", "ul"],
    }
  });