import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { EucharistData } from '../types/eucharist';
import { Language } from '../hooks/useLanguage';
import { useSearch } from '../hooks/useSearch';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: EucharistData;
  language: Language;
  scrollToSection: (sectionId: string) => void;
}

export default function SearchModal({ isOpen, onClose, data, language, scrollToSection }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const { results, isSearching } = useSearch(data, query, selectedFilters, language);

  const filters = [
    { id: 'definition', label: language === 'es' ? 'Definición' : 'Definition' },
    { id: 'history', label: language === 'es' ? 'Historia' : 'History' },
    { id: 'elements', label: language === 'es' ? 'Elementos' : 'Elements' },
    { id: 'theology', label: language === 'es' ? 'Teología' : 'Theology' },
    { id: 'symbols', label: language === 'es' ? 'Símbolos' : 'Symbols' },
    { id: 'prayers', label: language === 'es' ? 'Oraciones' : 'Prayers' },
    { id: 'resources', label: language === 'es' ? 'Recursos' : 'Resources' }
  ];

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

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const handleResultClick = (sectionId: string) => {
    scrollToSection(sectionId);
    onClose();
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            {language === 'es' ? 'Buscar contenido' : 'Search content'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={language === 'es' 
                ? 'Buscar en oraciones, historia, teología...' 
                : 'Search in prayers, history, theology...'
              }
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="mt-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>{language === 'es' ? 'Filtros' : 'Filters'}</span>
              {showFilters ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              {selectedFilters.length > 0 && (
                <span className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded-full">
                  {selectedFilters.length}
                </span>
              )}
            </button>

            {showFilters && (
              <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex flex-wrap gap-2 mb-3">
                  {filters.map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => toggleFilter(filter.id)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        selectedFilters.includes(filter.id)
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-white'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
                {selectedFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {language === 'es' ? 'Limpiar filtros' : 'Clear filters'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
          ) : query.trim() === '' ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{language === 'es' 
                ? 'Comienza a escribir para buscar contenido' 
                : 'Start typing to search content'
              }</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <p>{language === 'es' 
                ? 'No se encontraron resultados' 
                : 'No results found'
              }</p>
              <p className="text-sm mt-2">
                {language === 'es' 
                  ? 'Intenta con diferentes palabras clave o ajusta los filtros' 
                  : 'Try different keywords or adjust filters'
                }
              </p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {language === 'es' 
                  ? `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}` 
                  : `${results.length} result${results.length !== 1 ? 's' : ''} found`
                }
              </p>
              
              {results.map((result, index) => (
                <div
                  key={index}
                  onClick={() => handleResultClick(result.sectionId)}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {highlightText(result.title, query)}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                      {result.section}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {highlightText(result.content, query)}
                  </p>
                  {result.context && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                      ...{highlightText(result.context, query)}...
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}