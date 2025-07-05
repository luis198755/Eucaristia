import { useState, useEffect } from 'react';

interface Book {
  id: string;
  name: string;
  abbreviation: string;
  order: number;
}

interface Verse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

interface BibleSearchResult {
  reference: string;
  verses: Verse[];
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
}

interface KeywordSearchResult {
  keyword: string;
  verses: Verse[];
  count: number;
}

const API_BASE_URL = 'https://apibible.luissalberto.com';

export function useBibleSearch() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchResult, setSearchResult] = useState<BibleSearchResult | null>(null);
  const [keywordResults, setKeywordResults] = useState<KeywordSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load books on mount
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/books`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Sort books by canonical order using the 'order' field
        const sortedBooks = (data.books || []).sort((a: Book, b: Book) => a.order - b.order);
        setBooks(sortedBooks);
      } catch (err) {
        console.error('Error loading books:', err);
        setError(err instanceof Error ? err.message : 'Error loading books');
      }
    };

    loadBooks();
  }, []);

  const searchVerse = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setKeywordResults(null);

    try {
      // Clean and format the query for the API
      const cleanQuery = query.trim().replace(/\s+/g, '+');
      const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(cleanQuery)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No se encontraron versículos para esta referencia');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle null verses in response
      if (!data.verses || data.verses === null) {
        throw new Error('No se encontraron versículos para esta referencia');
      }
      
      setSearchResult(data);
    } catch (err) {
      console.error('Error searching verse:', err);
      setError(err instanceof Error ? err.message : 'Error al buscar versículo');
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const searchByReference = async (reference: string) => {
    if (!reference.trim()) return;

    setIsLoading(true);
    setError(null);
    setKeywordResults(null);

    try {
      const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(reference)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No se encontraron versículos para esta referencia');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle null verses in response
      if (!data.verses || data.verses === null) {
        throw new Error('No se encontraron versículos para esta referencia');
      }
      
      setSearchResult(data);
    } catch (err) {
      console.error('Error searching by reference:', err);
      setError(err instanceof Error ? err.message : 'Error al buscar por referencia');
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const searchByKeyword = async (keyword: string, limit: number = 20) => {
    if (!keyword.trim()) return;

    setIsLoading(true);
    setError(null);
    setSearchResult(null);

    try {
      const params = new URLSearchParams({
        q: keyword.trim(),
        limit: limit.toString()
      });
      
      const response = await fetch(`${API_BASE_URL}/search?${params}`);
      
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Parámetros de búsqueda inválidos');
        }
        if (response.status === 404) {
          throw new Error('No se encontraron versículos con esta palabra clave');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle null verses in keyword search response
      if (!data.verses || data.verses === null || data.count === 0) {
        throw new Error(`No se encontraron versículos con la palabra "${keyword}"`);
      }
      
      // Ensure verses is always an array
      const processedData = {
        ...data,
        verses: Array.isArray(data.verses) ? data.verses : [],
        count: data.count || 0
      };
      
      setKeywordResults(processedData);
    } catch (err) {
      console.error('Error searching by keyword:', err);
      setError(err instanceof Error ? err.message : 'Error al buscar por palabra clave');
      setKeywordResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setSearchResult(null);
    setKeywordResults(null);
    setError(null);
  };

  return {
    books,
    searchResult,
    keywordResults,
    isLoading,
    error,
    searchVerse,
    searchByReference,
    searchByKeyword,
    clearResults
  };
}