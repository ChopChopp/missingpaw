import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en.json';
import de from './locales/de.json';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from "@react-native-async-storage/async-storage";

const resources = {
    en: {translation: en},
    de: {translation: de}
};

const LANGUAGE_KEY = 'userLanguage';

const languageDetector: any = {
    type: 'languageDetector',
    async: true,
    detect: async (callback: any) => {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (savedLanguage) {
            return callback(savedLanguage);
        }
        const deviceLanguage = RNLocalize.getLocales()[0].languageCode;
        return callback(deviceLanguage);
    },
    init: () => {},
    cacheUserLanguage: async (language: any) => {
        await AsyncStorage.setItem(LANGUAGE_KEY, language);
    },
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
