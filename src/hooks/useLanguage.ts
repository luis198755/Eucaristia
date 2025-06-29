import { useState, useEffect } from 'react';

export type Language = 'es' | 'en' | 'la';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    // Check for saved language preference or default to Spanish
    const savedLanguage = localStorage.getItem('language') as Language;
    const browserLanguage = navigator.language.startsWith('en') ? 'en' : 'es';
    
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en' || savedLanguage === 'la')) {
      setLanguage(savedLanguage);
    } else {
      setLanguage(browserLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return { language, changeLanguage };
}