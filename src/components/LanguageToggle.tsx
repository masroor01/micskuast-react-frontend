import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../utils/translations';

interface LanguageToggleProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ variant = 'compact', className = '' }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div 
      className={`sp-language-toggle ${variant === 'full' ? 'sp-lang-full' : ''} ${className}`}
      role="group"
      aria-label={t('select_language', 'Select Language')}
    >
      <div className="sp-lang-capsule">
        <div className="sp-lang-icon-slot" title={t('select_language', 'Language')}>
          <Globe size={13} className="sp-lang-globe-icon" />
        </div>

        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code as SupportedLanguage)}
              className={`sp-lang-item ${isActive ? 'active' : ''} sp-lang-item-${lang.code}`}
              title={`${lang.label} (${lang.nativeName})`}
              aria-pressed={isActive}
            >
              <span className={`sp-lang-txt sp-lang-txt-${lang.code}`}>{lang.nativeName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};