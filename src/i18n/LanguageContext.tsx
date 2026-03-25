import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { translations, type Language, type TranslationKeys } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const defaultContext: LanguageContextType = {
  language: "it",
  setLanguage: () => {},
  t: translations.it,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("userLanguage") as Language;
    if (stored && translations[stored]) return stored;
    const legacy = localStorage.getItem("lang") as Language;
    if (legacy && translations[legacy]) {
      localStorage.setItem("userLanguage", legacy);
      localStorage.removeItem("lang");
      return legacy;
    }
    return "it"; // Default: Italiano
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("userLanguage", lang);
  }, []);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
