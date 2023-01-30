import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
let homepageFr = require('./lang/fr/homepage.json');
let homepageEn = require('./lang/en/homepage.json');

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				translations: { ...homepageEn }
			},
			fr: {
				translations: { ...homepageFr }
			}
		},
		fallbackLng: "en",
		debug: true,
		ns: ["translations"],
		defaultNS: "translations",
		keySeparator: false,
		interpolation: {
			escapeValue: false
		}
	});

export default i18n;
