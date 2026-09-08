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
    if (saved === 'ur') {
      return 'ur';
    }
    return 'en';
  });

  const currentOption = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];
  const dir = currentOption.dir;

  const syncGoogleTranslate = (targetLang: SupportedLanguage) => {
    try {
      const host = window.location.hostname;
      const cookieVal = targetLang === 'en' ? '' : `/en/${targetLang}`;

      if (targetLang === 'en') {
        const past = 'Thu, 01 Jan 1970 00:00:00 UTC';
        document.cookie = `googtrans=; expires=${past}; path=/;`;
        document.cookie = `googtrans=; expires=${past}; path=/; domain=${host};`;
        document.cookie = `googtrans=; expires=${past}; path=/; domain=.${host};`;
        document.cookie = `googtrans=/en/en; path=/;`;
      } else {
        document.cookie = `googtrans=${cookieVal}; path=/;`;
        document.cookie = `googtrans=${cookieVal}; path=/; domain=${host};`;
        document.cookie = `googtrans=${cookieVal}; path=/; domain=.${host};`;
      }

      const triggerSelect = () => {
        const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
        if (combo) {
          if (combo.value !== targetLang) {
            combo.value = targetLang;
            combo.dispatchEvent(new Event('change', { bubbles: true }));
          }
          return true;
        }
        return false;
      };

      if (!triggerSelect()) {
        let attempts = 0;
        const timer = setInterval(() => {
          attempts++;
          if (triggerSelect() || attempts > 12) {
            clearInterval(timer);
          }
        }, 300);
      }
    } catch (e) {
      console.warn('Google Translate sync error:', e);
    }
  };

  useEffect(() => {
    // Persist choice
    localStorage.setItem('site_language', language);
    
    // Update HTML attributes for accessibility & typography
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('data-lang', language);

    // Sync full-page translation via Google Translate Bridge
    syncGoogleTranslate(language);

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