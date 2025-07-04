import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Book, ChevronDown, ChevronRight, BookOpen, Quote } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { useBibleSearch } from '../hooks/useBibleSearch';

interface BibleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export default function BibleSearchModal({ isOpen, onClose, language }: BibleSearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [verseEnd, setVerseEnd] = useState('');
  const [showBooksList, setShowBooksList] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const { 
    books, 
    searchResult, 
    isLoading, 
    error, 
    searchVerse, 
    searchByReference,
    clearResults 
  } = useBibleSearch();

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleQuickSearch = () => {
    if (query.trim()) {
      searchVerse(query);
    }
  };

  const handleReferenceSearch = () => {
    if (selectedBook && chapter) {
      const reference = verseEnd 
        ? `${selectedBook}+${chapter}:${verse}-${verseEnd}`
        : `${selectedBook}+${chapter}:${verse}`;
      searchByReference(reference);
    }
  };

  const handleBookSelect = (bookName: string) => {
    setSelectedBook(bookName);
    setShowBooksList(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleQuickSearch();
    }
  };

  const getTexts = () => {
    switch (language) {
      case 'en':
        return {
          title: 'Bible Search',
          subtitle: 'Search in the Jerusalem Bible',
          quickSearch: 'Quick Search',
          quickSearchPlaceholder: 'e.g., "John 3:16" or "love"',
          advancedSearch: 'Advanced Search',
          selectBook: 'Select Book',
          chapter: 'Chapter',
          verse: 'Verse',
          verseEnd: 'End Verse',
          search: 'Search',
          clear: 'Clear',
          loading: 'Searching...',
          noResults: 'No results found',
          error: 'Error searching',
          reference: 'Reference',
          translation: 'Translation'
        };
      case 'la':
        return {
          title: 'Quaerere in Biblia',
          subtitle: 'Quaerere in Biblia Hierosolymitana',
          quickSearch: 'Quaerere Celeriter',
          quickSearchPlaceholder: 'e.g., "Ioannes 3:16" vel "amor"',
          advancedSearch: 'Quaerere Accuratius',
          selectBook: 'Eligere Librum',
          chapter: 'Capitulum',
          verse: 'Versus',
          verseEnd: 'Versus Finalis',
          search: 'Quaerere',
          clear: 'Purgare',
          loading: 'Quaerens...',
          noResults: 'Nihil inventum',
          error: 'Error quaerendi',
          reference: 'Referentia',
          translation: 'Translatio'
        };
      default: // 'es'
        return {
          title: 'Búsqueda Bíblica',
          subtitle: 'Buscar en la Biblia de Jerusalén',
          quickSearch: 'Búsqueda Rápida',
          quickSearchPlaceholder: 'ej. "Juan 3:16" o "amor"',
          advancedSearch: 'Búsqueda Avanzada',
          selectBook: 'Seleccionar Libro',
          chapter: 'Capítulo',
          verse: 'Versículo',
          verseEnd: 'Versículo Final',
          search: 'Buscar',
          clear: 'Limpiar',
          loading: 'Buscando...',
          noResults: 'No se encontraron resultados',
          error: 'Error al buscar',
          reference: 'Referencia',
          translation: 'Traducción'
        };
    }
  };

  const texts = getTexts();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-gray-900 dark:text-white" />
            <div>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                {texts.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {texts.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Interface */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          {/* Quick Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
              {texts.quickSearch}
            </label>
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={texts.quickSearchPlaceholder}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
                />
              </div>
              <button
                onClick={handleQuickSearch}
                disabled={!query.trim() || isLoading}
                className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {texts.search}
              </button>
            </div>
          </div>

          {/* Advanced Search */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
              {texts.advancedSearch}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {/* Book Selector */}
              <div className="md:col-span-2 relative">
                <button
                  onClick={() => setShowBooksList(!showBooksList)}
                  className="w-full flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                >
                  <span className={selectedBook ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                    {selectedBook || texts.selectBook}
                  </span>
                  {showBooksList ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                
                {showBooksList && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    {books.map((book) => (
                      <button
                        key={book.id}
                        onClick={() => handleBookSelect(book.name)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      >
                        {book.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Chapter */}
              <div>
                <input
                  type="number"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  placeholder={texts.chapter}
                  min="1"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
                />
              </div>

              {/* Verse */}
              <div>
                <input
                  type="number"
                  value={verse}
                  onChange={(e) => setVerse(e.target.value)}
                  placeholder={texts.verse}
                  min="1"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
                />
              </div>

              {/* Search Button */}
              <div>
                <button
                  onClick={handleReferenceSearch}
                  disabled={!selectedBook || !chapter || !verse || isLoading}
                  className="w-full p-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {texts.search}
                </button>
              </div>
            </div>

            {/* Optional End Verse */}
            <div className="mt-3">
              <input
                type="number"
                value={verseEnd}
                onChange={(e) => setVerseEnd(e.target.value)}
                placeholder={`${texts.verseEnd} (${language === 'es' ? 'opcional' : language === 'en' ? 'optional' : 'optionale'})`}
                min="1"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-300">{texts.loading}</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400">{texts.error}: {error}</p>
            </div>
          ) : searchResult ? (
            <div className="space-y-6">
              {/* Reference Info */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                    <Quote className="w-5 h-5 mr-2" />
                    {searchResult.reference}
                  </h3>
                  <button
                    onClick={clearResults}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {texts.clear}
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {texts.translation}: {searchResult.translation_name}
                  {searchResult.translation_note && ` - ${searchResult.translation_note}`}
                </p>
              </div>

              {/* Verses */}
              <div className="space-y-4">
                {searchResult.verses.map((verse, index) => (
                  <div key={index} className="border-l-4 border-gray-300 dark:border-gray-600 pl-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {verse.book_name} {verse.chapter}:{verse.verse}
                      </span>
                    </div>
                    <p className="text-gray-900 dark:text-white leading-relaxed text-lg">
                      {verse.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Full Text (if different from individual verses) */}
              {searchResult.text && searchResult.verses.length > 1 && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {language === 'es' ? 'Texto completo' : language === 'en' ? 'Full text' : 'Textus completus'}
                  </h4>
                  <p className="text-gray-900 dark:text-white leading-relaxed text-lg italic">
                    "{searchResult.text}"
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{language === 'es' ? 'Realiza una búsqueda para ver los resultados' : language === 'en' ? 'Perform a search to see results' : 'Quaere ut resultata videas'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}