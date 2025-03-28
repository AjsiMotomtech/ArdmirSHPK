import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../locales/en.json";
import sqTranslation from "../locales/sq.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      sq: {
        translation: sqTranslation,
      },
    },
    lng: "sq", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
