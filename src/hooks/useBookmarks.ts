import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem('eucharist-bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      }
    }
  }, []);

  const toggleBookmark = (sectionId: string) => {
    setBookmarks(prev => {
      const newBookmarks = prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId];
      
      // Save to localStorage
      localStorage.setItem('eucharist-bookmarks', JSON.stringify(newBookmarks));
      
      return newBookmarks;
    });
  };

  const clearBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem('eucharist-bookmarks');
  };

  const isBookmarked = (sectionId: string) => bookmarks.includes(sectionId);

  return {
    bookmarks,
    toggleBookmark,
    clearBookmarks,
    isBookmarked
  };
}