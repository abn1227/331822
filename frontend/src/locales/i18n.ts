import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import {
  common as commonEs,
  profile as profileEs,
  navbar as navbarEs,
  handymanManagement as handymanManagementEs,
  categories as categoriesEs,
  jobPetitionManagement as jobPetitionManagementEs,
  landing as landingEs,
  auth as authEs,
} from "./es";
import {
  common as commonEn,
  profile as profileEn,
  navbar as navbarEn,
  handymanManagement as handymanManagementEn,
  categories as categoriesEn,
  jobPetitionManagement as jobPetitionManagementEn,
  landing as landingEn,
  auth as authEn,
} from "./en";

export type Namespace =
  | "common"
  | "auth"
  | "dashboard"
  | "settings"
  | "notifications"
  | "forms";

const defaultNS: Namespace = "common";
export const fallbackLng = "es";
export const supportedLngs = ["es", "en"];
export type Language = (typeof supportedLngs)[number];

export const defaultLanguage = fallbackLng;

const resources = {
  es: {
    common: commonEs,
    profile: profileEs,
    navbar: navbarEs,
    handyManManagement: handymanManagementEs,
    categories: categoriesEs,
    jobPetitionManagement: jobPetitionManagementEs,
    landing: landingEs,
    auth: authEs,
  },
  en: {
    common: commonEn,
    profile: profileEn,
    navbar: navbarEn,
    handyManManagement: handymanManagementEn,
    categories: categoriesEn,
    jobPetitionManagement: jobPetitionManagementEn,
    landing: landingEn,
    auth: authEn,
  },
};

export const getOptions = (language = fallbackLng) => ({
  supportedLngs,
  fallbackLng,
  lng: language,
  defaultNS,
  fallbackNs: defaultNS,
  ns: Object.keys(resources[fallbackLng]) as Namespace[],
  resources,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
});

void i18n.use(LanguageDetector).use(initReactI18next).init(getOptions());

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof commonEs;
      profile: typeof profileEs;
      navbar: typeof navbarEs;
      handyManManagement: typeof handymanManagementEs;
      categories: typeof categoriesEs;
      jobPetitionManagement: typeof jobPetitionManagementEs;
      landing: typeof landingEs;
      auth: typeof authEs;
    };
  }
}

export default i18n;
