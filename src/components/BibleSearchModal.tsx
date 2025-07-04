import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Book, ChevronDown, ChevronRight, BookOpen, Quote, Filter } from 'lucide-react';
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
  const [keywordQuery, setKeywordQuery] = useState('');
  const [resultLimit, setResultLimit] = useState(20);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const { 
    books, 
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
    // Return empty array if books is not available yet
    if (!books || !Array.isArray(books)) {
      return [];
    }

    const categories: BookCategory[] = [];

    // Define book categories with their order ranges
    const categoryDefinitions = [
      {
        name: language === 'es' ? 'Pentateuco' : language === 'en' ? 'Pentateuch' : 'Pentateuchos',
        range: [1, 5] // Genesis to Deuteronomy
      },
      {
        name: language === 'es' ? 'Libros Históricos' : language === 'en' ? 'Historical Books' : 'Libri Historici',
        range: [6, 16] // Joshua to Esther
      },
      {
        name: language === 'es' ? 'Libros Sapienciales' : language === 'en' ? 'Wisdom Books' : 'Libri Sapientialia',
        range: [17, 23] // Job to Sirach
      },
      {
        name: language === 'es' ? 'Libros Proféticos' : language === 'en' ? 'Prophetic Books' : 'Libri Prophetici',
        range: [24, 46] // Isaiah to Malachi
      },
      {
        name: language === 'es' ? 'Evangelios' : language === 'en' ? 'Gospels' : 'Evangelia',
        range: [47, 50] // Matthew to John
      },
      {
        name: language === 'es' ? 'Hechos y Cartas' : language === 'en' ? 'Acts and Letters' : 'Actus et Epistolae',
        range: [51, 72] // Acts to Jude
      },
      {
        name: language === 'es' ? 'Apocalipsis' : language === 'en' ? 'Revelation' : 'Apocalypsis',
        range: [73, 73] // Revelation
      }
    ];

    // Deuterocanonical books (scattered throughout)
    const deuterocanonicalOrders = [12, 13, 14, 15, 16, 20, 21, 22, 23, 40, 41, 42, 43, 44, 45, 46];

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

    // Add Deuterocanonical books as a separate category
    const deuterocanonicalBooks = books.filter(book => 
      deuterocanonicalOrders.includes(book.order)
    ) || [];

    if (deuterocanonicalBooks.length > 0) {
      // Insert Deuterocanonical after Historical Books
      const insertIndex = categories.findIndex(cat => 
        cat.name.includes('Históricos') || cat.name.includes('Historical') || cat.name.includes('Historici')
      ) + 1;

      categories.splice(insertIndex, 0, {
        name: language === 'es' ? 'Libros Deuterocanónicos' : language === 'en' ? 'Deuterocanonical Books' : 'Libri Deuterocanonicos',
        books: deuterocanonicalBooks
      });
    }

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
      // Detect if it's a reference or keyword search
      const referencePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+\+?\d+:\d+(-\d+)?$/;
      if (referencePattern.test(query.trim())) {
        searchVerse(query);
      } else {
        // It's a keyword search
        searchByKeyword(query, resultLimit);
      }
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

  const handleKeywordSearch = () => {
    if (keywordQuery.trim()) {
      searchByKeyword(keywordQuery, resultLimit);
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
      } else {
        handleQuickSearch();
      }
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
          referenceSearch: 'Reference Search',
          keywordSearch: 'Keyword Search',
          keywordPlaceholder: 'e.g., "love", "peace", "salvation"',
          selectBook: 'Select Book',
          chapter: 'Chapter',
          verse: 'Verse',
          verseEnd: 'End Verse',
          resultLimit: 'Result Limit',
          search: 'Search',
          clear: 'Clear',
          loading: 'Searching...',
          noResults: 'No results found',
          error: 'Error searching',
          reference: 'Reference',
          translation: 'Translation',
          resultsFound: 'results found',
          showingResults: 'Showing',
          of: 'of'
        };
      case 'la':
        return {
          title: 'Quaerere in Biblia',
          subtitle: 'Quaerere in Biblia Hierosolymitana',
          quickSearch: 'Quaerere Celeriter',
          quickSearchPlaceholder: 'e.g., "Ioannes 3:16" vel "amor"',
          referenceSearch: 'Quaerere per Referentiam',
          keywordSearch: 'Quaerere per Verbum',
          keywordPlaceholder: 'e.g., "amor", "pax", "salus"',
          selectBook: 'Eligere Librum',
          chapter: 'Capitulum',
          verse: 'Versus',
          verseEnd: 'Versus Finalis',
          resultLimit: 'Numerus Resultatum',
          search: 'Quaerere',
          clear: 'Purgare',
          loading: 'Quaerens...',
          noResults: 'Nihil inventum',
          error: 'Error quaerendi',
          reference: 'Referentia',
          translation: 'Translatio',
          resultsFound: 'resultata inventa',
          showingResults: 'Ostendere',
          of: 'ex'
        };
      default: // 'es'
        return {
          title: 'Búsqueda Bíblica',
          subtitle: 'Buscar en la Biblia de Jerusalén',
          quickSearch: 'Búsqueda Rápida',
          quickSearchPlaceholder: 'ej. "Juan 3:16" o "amor"',
          referenceSearch: 'Búsqueda por Referencia',
          keywordSearch: 'Búsqueda por Palabra Clave',
          keywordPlaceholder: 'ej. "amor", "paz", "salvación"',
          selectBook: 'Seleccionar Libro',
          chapter: 'Capítulo',
          verse: 'Versículo',
          verseEnd: 'Versículo Final',
          resultLimit: 'Límite de Resultados',
          search: 'Buscar',
          clear: 'Limpiar',
          loading: 'Buscando...',
          noResults: 'No se encontraron resultados',
          error: 'Error al buscar',
          reference: 'Referencia',
          translation: 'Traducción',
          resultsFound: 'resultados encontrados',
          showingResults: 'Mostrando',
          of: 'de'
        };
    }
  };

  const texts = getTexts();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
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

        {/* Search Mode Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'quick' as const, label: texts.quickSearch, icon: Search },
            { id: 'reference' as const, label: texts.referenceSearch, icon: Book },
            { id: 'keyword' as const, label: texts.keywordSearch, icon: Filter }
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => setSearchMode(mode.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
                searchMode === mode.id
                  ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <mode.icon className="w-4 h-4" />
              <span>{mode.label}</span>
            </button>
          ))}
        </div>

        {/* Search Interface */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          {searchMode === 'quick' && (
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
          )}

          {searchMode === 'reference' && (
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
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-80 overflow-y-auto z-10">
                    {bookCategories.map((category, categoryIndex) => (
                      <div key={categoryIndex}>
                        {/* Category Header - Enhanced styling */}
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 px-4 py-3 border-b border-blue-500 dark:border-blue-400">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                            {category.name}
                          </h4>
                        </div>
                        
                        {/* Books in Category */}
                        {category.books.map((book) => (
                          <button
                            key={book.id}
                            onClick={() => handleBookSelect(book.name)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                          >
                            <div className="flex items-center justify-between">
                              <span>{book.name}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {book.abbreviation}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
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

              {/* Optional End Verse - Full Width */}
              <div className="md:col-span-5">
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
          )}

          {searchMode === 'keyword' && (
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={keywordQuery}
                    onChange={(e) => setKeywordQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={texts.keywordPlaceholder}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
                  />
                </div>
                <select
                  value={resultLimit}
                  onChange={(e) => setResultLimit(Number(e.target.value))}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <button
                  onClick={handleKeywordSearch}
                  disabled={!keywordQuery.trim() || isLoading}
                  className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {texts.search}
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {texts.resultLimit}: {resultLimit} {texts.resultsFound}
              </p>
            </div>
          )}
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
          ) : keywordResults ? (
            <div className="space-y-6">
              {/* Keyword Results Header */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    "{keywordResults.keyword}"
                  </h3>
                  <button
                    onClick={clearResults}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {texts.clear}
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {texts.showingResults} {keywordResults.verses.length} {texts.of} {keywordResults.count} {texts.resultsFound}
                </p>
              </div>

              {/* Keyword Results */}
              <div className="space-y-4">
                {keywordResults.verses.map((verse, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        {verse.book_name} {verse.chapter}:{verse.verse}
                      </span>
                    </div>
                    <p className="text-gray-900 dark:text-white leading-relaxed">
                      {verse.text}
                    </p>
                  </div>
                ))}
              </div>
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