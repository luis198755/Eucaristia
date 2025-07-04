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

const API_BASE_URL = 'https://apigo.luissalberto.com';

export function useBibleSearch() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchResult, setSearchResult] = useState<BibleSearchResult | null>(null);
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
        setBooks(data.books || []);
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

    try {
      const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(reference)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No se encontraron versículos para esta referencia');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSearchResult(data);
    } catch (err) {
      console.error('Error searching by reference:', err);
      setError(err instanceof Error ? err.message : 'Error al buscar por referencia');
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setSearchResult(null);
    setError(null);
  };

  return {
    books,
    searchResult,
    isLoading,
    error,
    searchVerse,
    searchByReference,
    clearResults
  };
}