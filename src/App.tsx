import React, { useState } from 'react';
import Navigation from './components/Navigation';
import SearchModal from './components/SearchModal';
import BibleSearchModal from './components/BibleSearchModal';
import BibleSearchButton from './components/BibleSearchButton';
import TableOfContents from './components/TableOfContents';
import ReadingProgressBar from './components/ReadingProgressBar';
import ReadingModePanel from './components/ReadingModePanel';
import SEOHead from './components/SEOHead';
import HeroSection from './components/sections/HeroSection';
import DefinitionSection from './components/sections/DefinitionSection';
import HistorySection from './components/sections/HistorySection';
import ElementsSection from './components/sections/ElementsSection';
import TheologySection from './components/sections/TheologySection';
import SymbolsSection from './components/sections/SymbolsSection';
import PrayersSection from './components/sections/PrayersSection';
import ResourcesSection from './components/sections/ResourcesSection';
import Footer from './components/Footer';
import { useScrollNavigation } from './hooks/useScrollNavigation';
import { useDarkMode } from './hooks/useDarkMode';
import { useLanguage } from './hooks/useLanguage';
import { useEucharistData } from './hooks/useEucharistData';
import { useReadingProgress } from './hooks/useReadingProgress';
import { useBookmarks } from './hooks/useBookmarks';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBibleSearchOpen, setIsBibleSearchOpen] = useState(false);
  const { activeSection, scrollToSection } = useScrollNavigation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { language, changeLanguage } = useLanguage();
  const { data, loading, error } = useEucharistData(language);
  const readingProgress = useReadingProgress();
  const { bookmarks, toggleBookmark } = useBookmarks();

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const handleBibleSearchOpen = () => {
    setIsBibleSearchOpen(true);
  };

  const handleBibleSearchClose = () => {
    setIsBibleSearchOpen(false);
  };

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setIsBibleSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'es' ? 'Cargando...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">
            {language === 'es' 
              ? `Error al cargar los datos: ${error}` 
              : `Error loading data: ${error}`
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEOHead data={data} language={language} currentSection={activeSection} />
      <ReadingProgressBar progress={readingProgress} />
      
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        scrollToSection={handleScrollToSection}
        data={data}
        language={language}
        changeLanguage={changeLanguage}
        onSearchOpen={handleSearchOpen}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={handleSearchClose}
        data={data}
        language={language}
        scrollToSection={handleScrollToSection}
      />

      <BibleSearchModal
        isOpen={isBibleSearchOpen}
        onClose={handleBibleSearchClose}
        language={language}
      />

      <TableOfContents
        data={data}
        language={language}
        activeSection={activeSection}
        scrollToSection={handleScrollToSection}
        readingProgress={readingProgress}
        bookmarks={bookmarks}
        toggleBookmark={toggleBookmark}
      />

      {/* Reading Mode Button - Left side below menu */}
      <div className="fixed left-6 top-36 z-40">
        <ReadingModePanel language={language} />
      </div>

      {/* Bible Search Button - Right side */}
      <div className="fixed right-6 top-20 z-40">
        <div className="flex flex-col space-y-2">
          <BibleSearchButton 
            onClick={handleBibleSearchOpen}
            language={language}
          />
        </div>
      </div>

      <main role="main">
        <HeroSection scrollToSection={handleScrollToSection} data={data} />
        <DefinitionSection data={data} />
        <HistorySection data={data} />
        <ElementsSection data={data} />
        <TheologySection data={data} />
        <SymbolsSection data={data} />
        <PrayersSection data={data} />
        <ResourcesSection data={data} />
      </main>
      
      <Footer data={data} />
    </div>
  );
}

export default App;