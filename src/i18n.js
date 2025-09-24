import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Load translations via HTTP
  .use(initReactI18next) // Bind react-i18next to i18n
  .init({
    fallbackLng: 'en', // Default language
    lng: 'en', // Initial language
    debug: false, // Set to true for console logs during dev
    interpolation: {
      escapeValue: false, // React already escapes
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to translation files
    },
  });

export default i18n;
