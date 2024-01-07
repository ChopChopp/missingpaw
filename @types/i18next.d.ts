import "i18next";
import en from "../app/i18n/locales/en.json";
import de from "../app/i18n/locales/de.json";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "en";
        resources: {
            en: typeof en;
            de: typeof de;
        };
    }
}