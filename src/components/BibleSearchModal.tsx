import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Book, ChevronDown, BookOpen, Quote, Filter } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { useBibleSearch } from '../hooks/useBibleSearch';

interface BibleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

interface BookCategory {
  name: string;
  books: Array<{
    id: string;
    name: string;
    abbreviation: string;
    order: number;
  }>;
}

export default function BibleSearchModal({ isOpen, onClose, language }: BibleSearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [verseEnd, setVerseEnd] = useState('');
  const [showBooksList, setShowBooksList] = useState(false);
  const [searchMode, setSearchMode] = useState<'quick' | 'reference' | 'keyword'>('quick');
  const [selectedTranslation, setSelectedTranslation] = useState('');
  const [keywordQuery, setKeywordQuery] = useState('');
  const [resultLimit, setResultLimit] = useState(20);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const { 
    books, 
    translations,
    searchResult, 
    keywordResults,
    isLoading, 
    error, 
    searchVerse, 
    searchByReference,
    searchByKeyword,
    clearResults 
  } = useBibleSearch();

  // Organize books by categories
  const organizeBooksByCategories = (): BookCategory[] => {
    if (!books || !Array.isArray(books) || books.length === 0) {
      return [];
    }

    const categories: BookCategory[] = [];
    const categoryDefinitions = [
      {
        name: language === 'es' ? 'Pentateuco' : language === 'en' ? 'Pentateuch' : 'Pentateuchos',
        range: [1, 5]
      },
      {
        name: language === 'es' ? 'Históricos' : language === 'en' ? 'Historical' : 'Historici',
        range: [6, 16]
      },
      {
        name: language === 'es' ? 'Sapienciales' : language === 'en' ? 'Wisdom' : 'Sapientialia',
        range: [17, 23]
      },
      {
        name: language === 'es' ? 'Proféticos' : language === 'en' ? 'Prophetic' : 'Prophetici',
        range: [24, 46]
      },
      {
        name: language === 'es' ? 'Evangelios' : language === 'en' ? 'Gospels' : 'Evangelia',
        range: [47, 50]
      },
      {
        name: language === 'es' ? 'NT Cartas' : language === 'en' ? 'NT Letters' : 'Epistolae',
        range: [51, 72]
      },
      {
        name: language === 'es' ? 'Apocalipsis' : language === 'en' ? 'Revelation' : 'Apocalypsis',
        range: [73, 73]
      }
    ];

    categoryDefinitions.forEach(categoryDef => {
      const categoryBooks = books.filter(book => 
        book.order >= categoryDef.range[0] && book.order <= categoryDef.range[1]
      );

      if (categoryBooks.length > 0) {
        categories.push({
          name: categoryDef.name,
          books: categoryBooks
        });
      }
    });

    return categories;
  };

  const bookCategories = organizeBooksByCategories();

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
      const referencePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+\+?\d+:\d+(-\d+)?$/;
      if (referencePattern.test(query.trim())) {
        searchVerse(query, selectedTranslation || undefined);
      } else {
        searchByKeyword(query, resultLimit, selectedTranslation || undefined);
      }
    }
  };

  const handleReferenceSearch = () => {
    if (selectedBook && chapter) {
      const reference = verseEnd 
        ? `${selectedBook}+${chapter}:${verse}-${verseEnd}`
        : `${selectedBook}+${chapter}:${verse}`;
      searchByReference(reference, selectedTranslation || undefined);
    }
  };

  const handleKeywordSearch = () => {
    if (keywordQuery.trim()) {
      searchByKeyword(keywordQuery, resultLimit, selectedTranslation || undefined);
    }
  };

  const handleBookSelect = (bookName: string) => {
    setSelectedBook(bookName);
    setShowBooksList(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (searchMode === 'keyword') {
        handleKeywordSearch();
      } else if (searchMode === 'reference') {
        handleReferenceSearch();
      } else {
        handleQuickSearch();
      }
    }
  };

  const getTexts = () => {
    switch (language) {
      case 'en':
        return {
          title: 'Bible',
          quick: 'Quick',
          ref: 'Reference',
          word: 'Word',
          allTrans: 'All translations',
          selectBook: 'Book',
          chapter: 'Ch',
          verse: 'V',
          end: 'End',
          search: 'Search',
          clear: 'Clear',
          loading: 'Searching...',
          noResults: 'No results',
          showing: 'Showing',
          of: 'of',
          results: 'results'
        };
      case 'la':
        return {
          title: 'Biblia',
          quick: 'Celeriter',
          ref: 'Referentia',
          word: 'Verbum',
          allTrans: 'Omnes',
          selectBook: 'Liber',
          chapter: 'Cap',
          verse: 'V',
          end: 'Fin',
          search: 'Quaerere',
          clear: 'Purgare',
          loading: 'Quaerens...',
          noResults: 'Nihil',
          showing: 'Ostendere',
          of: 'ex',
          results: 'resultata'
        };
      default:
        return {
          title: 'Biblia',
          quick: 'Rápida',
          ref: 'Referencia',
          word: 'Palabra',
          allTrans: 'Todas',
          selectBook: 'Libro',
          chapter: 'Cap',
          verse: 'V',
          end: 'Fin',
          search: 'Buscar',
          clear: 'Limpiar',
          loading: 'Buscando...',
          noResults: 'Sin resultados',
          showing: 'Mostrando',
          of: 'de',
          results: 'resultados'
        };
    }
  };

  const texts = getTexts();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Ultra-compact Header */}
        <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-gray-900 dark:text-white" />
            <h2 className="text-base font-medium text-gray-900 dark:text-white">{texts.title}</h2>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Compact Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'quick' as const, label: texts.quick, icon: Search },
            { id: 'reference' as const, label: texts.ref, icon: Book },
            { id: 'keyword' as const, label: texts.word, icon: Filter }
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => setSearchMode(mode.id)}
              className={`flex items-center space-x-1 px-3 py-2 text-xs font-medium transition-colors ${
                searchMode === mode.id
                  ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <mode.icon className="w-3 h-3" />
              <span>{mode.label}</span>
            </button>
          ))}
        </div>

        {/* Ultra-compact Search Interface */}
        <div className="p-2 border-b border-gray-200 dark:border-gray-700 space-y-2">
          {/* Inline Translation Selector */}
          <select
            value={selectedTranslation}
            onChange={(e) => setSelectedTranslation(e.target.value)}
            className="w-full p-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-gray-900 dark:focus:ring-white"
          >
            <option value="">{texts.allTrans}</option>
            {translations.map((translation) => (
              <option key={translation.id} value={translation.id}>
                {translation.name.split(' ')[0]} {/* Show only first word */}
              </option>
            ))}
          </select>

          {searchMode === 'quick' && (
            <div className="flex space-x-1">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Juan 3:16 o amor"
                  className="w-full pl-6 pr-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1 focus:ring-gray-900 dark:focus:ring-white"
                />
              </div>
              <button
                onClick={handleQuickSearch}
                disabled={!query.trim() || isLoading}
                className="px-3 py-1.5 text-xs bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 transition-colors"
              >
                {texts.search}
              </button>
            </div>
          )}

          {searchMode === 'reference' && (
            <div className="space-y-1">
              <div className="relative">
                <button
                  onClick={() => setShowBooksList(!showBooksList)}
                  className="w-full flex items-center justify-between p-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500"
                >
                  <span className={selectedBook ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                    {selectedBook || texts.selectBook}
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                {showBooksList && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg max-h-40 overflow-y-auto z-10">
                    {bookCategories.map((category, categoryIndex) => (
                      <div key={categoryIndex}>
                        <div className="sticky top-0 bg-blue-600 dark:bg-blue-500 px-2 py-1">
                          <h4 className="text-xs font-bold text-white">{category.name}</h4>
                        </div>
                        {category.books.map((book) => (
                          <button
                            key={book.id}
                            onClick={() => handleBookSelect(book.name)}
                            className="w-full text-left px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-xs border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                          >
                            <div className="flex items-center justify-between">
                              <span>{book.name}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{book.abbreviation}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-5 gap-1">
                <input
                  type="number"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  placeholder={texts.chapter}
                  min="1"
                  className="w-full p-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1 focus:ring-gray-900 dark:focus:ring-white"
                />
                <input
                  type="number"
                  value={verse}
                  onChange={(e) => setVerse(e.target.value)}
                  placeholder={texts.verse}
                  min="1"
                  className="w-full p-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1 focus:ring-gray-900 dark:focus:ring-white"
                />
                <input
                  type="number"
                  value={verseEnd}
                  onChange={(e) => setVerseEnd(e.target.value)}
                  placeholder={texts.end}
                  min="1"
                  className="w-full p-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1 focus:ring-gray-900 dark:focus:ring-white"
                />
                <button
                  onClick={handleReferenceSearch}
                  disabled={!selectedBook || !chapter || !verse || isLoading}
                  className="col-span-2 p-1.5 text-xs bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 transition-colors"
                >
                  {texts.search}
                </button>
              </div>
            </div>
          )}

          {searchMode === 'keyword' && (
            <div className="flex space-x-1">
              <div className="flex-1 relative">
                <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                <input
                  type="text"
                  value={keywordQuery}
                  onChange={(e) => setKeywordQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="amor, paz, salvación"
                  className="w-full pl-6 pr-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1 focus:ring-gray-900 dark:focus:ring-white"
                />
              </div>
              <select
                value={resultLimit}
                onChange={(e) => setResultLimit(Number(e.target.value))}
                className="px-1 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-gray-900 dark:focus:ring-white"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <button
                onClick={handleKeywordSearch}
                disabled={!keywordQuery.trim() || isLoading}
                className="px-3 py-1.5 text-xs bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 transition-colors"
              >
                {texts.search}
              </button>
            </div>
          )}
        </div>

        {/* Compact Results */}
        <div className="flex-1 overflow-y-auto p-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-white"></div>
              <span className="ml-2 text-xs text-gray-600 dark:text-gray-300">{texts.loading}</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : keywordResults && keywordResults.verses && keywordResults.verses.length > 0 ? (
            <div className="space-y-2">
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-medium text-gray-900 dark:text-white flex items-center">
                    <Filter className="w-3 h-3 mr-1" />
                    "{keywordResults.keyword}"
                  </h3>
                  <button onClick={clearResults} className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    {texts.clear}
                  </button>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {texts.showing} {keywordResults.verses.length} {texts.of} {keywordResults.count}
                </p>
              </div>

              <div className="space-y-2">
                {keywordResults.verses.map((verse, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        {verse.book_name} {verse.chapter}:{verse.verse}
                      </span>
                    </div>
                    <p className="text-xs text-gray-900 dark:text-white leading-relaxed">{verse.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : searchResult && searchResult.verses && searchResult.verses.length > 0 ? (
            <div className="space-y-2">
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-medium text-gray-900 dark:text-white flex items-center">
                    <Quote className="w-3 h-3 mr-1" />
                    {searchResult.reference}
                  </h3>
                  <button onClick={clearResults} className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    {texts.clear}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {searchResult.verses.map((verse, index) => (
                  <div key={index} className="border-l-2 border-gray-300 dark:border-gray-600 pl-2">
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {verse.book_name} {verse.chapter}:{verse.verse}
                      </span>
                    </div>
                    <p className="text-xs text-gray-900 dark:text-white leading-relaxed">{verse.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">
                {language === 'es' ? 'Busca versículos o palabras' : language === 'en' ? 'Search verses or words' : 'Quaere versus vel verba'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}