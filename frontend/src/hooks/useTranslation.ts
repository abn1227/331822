import { fallbackLng, Language, supportedLngs } from "@/locales/i18n";
import { Namespace } from "i18next";
import { useCallback, useEffect } from "react";
import { useTranslation as useI18nTranslation } from "react-i18next";

interface UseTranslationOptions {
  ns: Namespace | Namespace[];
}

const useTranslation = (
  options: UseTranslationOptions = {
    ns: "common",
  }
) => {
  const { t, i18n } = useI18nTranslation(
    options.ns as string | readonly string[]
  );

  const changeLanguage = useCallback(
    async (lang: Language) => {
      if (supportedLngs.includes(lang)) {
        await i18n.changeLanguage(lang);
        document.documentElement.lang = lang;
        localStorage.setItem("preferred-language", lang);
      }
    },
    [i18n]
  );

  const loadNamespaces = useCallback(
    async (namespaces: Namespace[]) => {
      await i18n.loadNamespaces(namespaces as string[]);
    },
    [i18n]
  );

  useEffect(() => {
    changeLanguage(localStorage.getItem("preferred-language") || fallbackLng);
  }, []);

  const currentLanguage = i18n.language as Language;

  return {
    t,
    i18n,
    languages: supportedLngs,
    changeLanguage,
    currentLanguage,
    loadNamespaces,
  };
};

export default useTranslation;
