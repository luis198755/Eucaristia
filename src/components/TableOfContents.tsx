import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Menu, Bookmark, BookmarkCheck, Eye, EyeOff } from 'lucide-react';
import { EucharistData } from '../types/eucharist';
import { Language } from '../hooks/useLanguage';

interface TableOfContentsProps {
  data: EucharistData;
  language: Language;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  readingProgress: number;
  bookmarks: string[];
  toggleBookmark: (sectionId: string) => void;
}

export default function TableOfContents({
  data,
  language,
  activeSection,
  scrollToSection,
  readingProgress,
  bookmarks,
  toggleBookmark
}: TableOfContentsProps) {
  const [isVisible, setIsVisible] = useState(false); // Siempre inicia oculto
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sections = data.navigation.items.filter(item => item.id !== 'hero');

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if no input is focused
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case 'j':
        case 'ArrowDown':
          if (isVisible) { // Solo funciona si ya está visible
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, sections.length - 1));
          }
          break;
        case 'k':
        case 'ArrowUp':
          if (isVisible) { // Solo funciona si ya está visible
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
          }
          break;
        case 'Enter':
        case ' ':
          if (isVisible) { // Solo funciona si ya está visible
            e.preventDefault();
            scrollToSection(sections[selectedIndex].id);
          }
          break;
        case 'b':
          if (isVisible) { // Solo funciona si ya está visible
            e.preventDefault();
            toggleBookmark(sections[selectedIndex].id);
          }
          break;
        case 't':
          e.preventDefault();
          setIsVisible(!isVisible); // Toggle manual
          break;
        case 'm':
          if (isVisible) { // Solo funciona si ya está visible
            e.preventDefault();
            setIsMinimized(!isMinimized);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sections, selectedIndex, scrollToSection, toggleBookmark, isVisible, isMinimized]);

  // Update selected index based on active section
  useEffect(() => {
    const activeIndex = sections.findIndex(section => section.id === activeSection);
    if (activeIndex !== -1) {
      setSelectedIndex(activeIndex);
    }
  }, [activeSection, sections]);

  // NO auto-hide, NO auto-show - completamente manual
  const handleManualToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleMinimizeToggle = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSectionClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  const handleBookmarkToggle = (sectionId: string) => {
    toggleBookmark(sectionId);
  };

  // Botón flotante para mostrar el índice cuando está oculto - Moved to top
  if (!isVisible) {
    return (
      <div className="fixed left-6 top-20 z-40">
        <button
          onClick={handleManualToggle}
          className="reading-mode-menu-button bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          title={language === 'es' ? 'Mostrar índice (T)' : 'Show index (T)'}
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
          {bookmarks.length > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center">
              <span className="text-xs text-white dark:text-gray-900 font-bold">
                {bookmarks.length}
              </span>
            </div>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed left-6 top-20 z-40 transition-all duration-300 table-of-contents">
      <div className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg transition-all duration-300 ${
        isMinimized ? 'w-12' : 'w-64'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          {!isMinimized && (
            <div className="flex items-center space-x-2">
              <Menu className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {language === 'es' ? 'Índice' : 'Contents'}
              </span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <button
              onClick={handleMinimizeToggle}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title={isMinimized ? (language === 'es' ? 'Expandir (M)' : 'Expand (M)') : (language === 'es' ? 'Minimizar (M)' : 'Minimize (M)')}
            >
              {isMinimized ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            <button
              onClick={handleManualToggle}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title={language === 'es' ? 'Ocultar (T)' : 'Hide (T)'}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Reading Progress */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'es' ? 'Progreso' : 'Progress'}
                </span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {Math.round(readingProgress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gray-900 dark:bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>
            </div>

            {/* Navigation Items */}
            <div className="max-h-96 overflow-y-auto">
              {sections.map((section, index) => {
                const isActive = section.id === activeSection;
                const isSelected = index === selectedIndex;
                const isBookmarked = bookmarks.includes(section.id);

                return (
                  <div
                    key={section.id}
                    className={`group relative transition-all duration-200 ${
                      isActive ? 'bg-gray-100 dark:bg-gray-800' : ''
                    } ${
                      isSelected ? 'ring-2 ring-gray-900 dark:ring-white ring-inset' : ''
                    }`}
                  >
                    <button
                      onClick={() => handleSectionClick(section.id)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full transition-colors ${
                          isActive 
                            ? 'bg-gray-900 dark:bg-white' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`} />
                        <span className={`text-sm transition-colors ${
                          isActive 
                            ? 'text-gray-900 dark:text-white font-medium' 
                            : 'text-gray-600 dark:text-gray-300'
                        }`}>
                          {section.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {isBookmarked && (
                          <BookmarkCheck className="w-3 h-3 text-gray-900 dark:text-white" />
                        )}
                        <ChevronRight className={`w-3 h-3 transition-transform ${
                          isActive ? 'rotate-90' : ''
                        } text-gray-400`} />
                      </div>
                    </button>

                    {/* Bookmark toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmarkToggle(section.id);
                      }}
                      className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title={isBookmarked 
                        ? (language === 'es' ? 'Quitar marcador (B)' : 'Remove bookmark (B)')
                        : (language === 'es' ? 'Agregar marcador (B)' : 'Add bookmark (B)')
                      }
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-3 h-3 text-gray-900 dark:text-white" />
                      ) : (
                        <Bookmark className="w-3 h-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Keyboard shortcuts help */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <details className="group">
                <summary className="text-xs text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                  {language === 'es' ? 'Atajos de teclado' : 'Keyboard shortcuts'}
                </summary>
                <div className="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>↑/↓ o j/k</span>
                    <span>{language === 'es' ? 'Navegar' : 'Navigate'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Enter/Space</span>
                    <span>{language === 'es' ? 'Ir a sección' : 'Go to section'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>b</span>
                    <span>{language === 'es' ? 'Marcador' : 'Bookmark'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>t</span>
                    <span>{language === 'es' ? 'Mostrar/Ocultar' : 'Toggle'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>m</span>
                    <span>{language === 'es' ? 'Minimizar' : 'Minimize'}</span>
                  </div>
                </div>
              </details>
            </div>
          </>
        )}

        {isMinimized && (
          <div className="p-3">
            <div className="space-y-2">
              <div className="w-6 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <div 
                  className="bg-gray-900 dark:bg-white h-1 rounded-full transition-all duration-300"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>
              {bookmarks.length > 0 && (
                <div className="flex justify-center">
                  <div className="relative">
                    <BookmarkCheck className="w-4 h-4 text-gray-900 dark:text-white" />
                    <span className="absolute -top-1 -right-1 text-xs bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full w-3 h-3 flex items-center justify-center font-bold">
                      {bookmarks.length}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}