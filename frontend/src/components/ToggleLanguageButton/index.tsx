import React from "react";
import { Globe } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const languageNames = {
  es: "Español",
  en: "English",
  pt: "Português",
};

const ToggleLanguageButton: React.FC = () => {
  const { currentLanguage, changeLanguage, languages } = useTranslation();

  return (
    <div className="relative group">
      <button
        className="
          p-2 rounded-lg hover:bg-white/10 transition-all
        "
      >
        <Globe size={20} />
      </button>

      <div
        className="
          absolute
          right-0
          mt-2
          py-1
          min-w-[160px]
          rounded-sm
          bg-background/50
          backdrop-blur-md
          border border-white/20
          shadow-lg
          opacity-0
          invisible
          group-hover:opacity-100
          group-hover:visible
          transition-all
          duration-200
        "
      >
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`
              w-full
              px-4
              py-2
              text-left
              hover:bg-white/10
              transition-colors
              ${currentLanguage === lang ? "bg-white/20" : ""}
            `}
          >
            {languageNames[lang as keyof typeof languageNames]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToggleLanguageButton;
