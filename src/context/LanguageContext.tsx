import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, translations, type SupportedLanguage } from '../utils/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('site_language');
    if (saved === 'hi' || saved === 'ur' || saved === 'en') {
      return saved as SupportedLanguage;
    }
    return 'en';
  });

  const currentOption = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];
  const dir = currentOption.dir;

  useEffect(() => {
    // Persist choice
    localStorage.setItem('site_language', language);
    
    // Update HTML attributes for accessibility & typography
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('data-lang', language);

    // Trigger custom event for external listeners
    window.dispatchEvent(new CustomEvent('language-changed', { detail: { language, dir } }));
  }, [language, dir]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English if translation missing in target language
    const enDict = translations['en'];
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback !== undefined ? fallback : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback gracefully if used outside provider
    return {
      language: 'en',
      setLanguage: () => {},
      t: (key: string, fallback?: string) => fallback || key,
      dir: 'ltr'
    };
  }
  return context;
};