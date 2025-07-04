import React from 'react';
import { BookOpen } from 'lucide-react';
import { Language } from '../hooks/useLanguage';

interface BibleSearchButtonProps {
  onClick: () => void;
  language: Language;
}

export default function BibleSearchButton({ onClick, language }: BibleSearchButtonProps) {
  const getTooltip = () => {
    switch (language) {
      case 'en':
        return 'Search Bible (Ctrl+B)';
      case 'la':
        return 'Quaerere in Biblia (Ctrl+B)';
      default:
        return 'Buscar en la Biblia (Ctrl+B)';
    }
  };

  return (
    <button
      onClick={onClick}
      className="p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 bg-white/90 dark:bg-gray-900/90 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white backdrop-blur-sm border border-gray-200 dark:border-gray-700"
      title={getTooltip()}
    >
      <BookOpen className="w-5 h-5" />
    </button>
  );
}