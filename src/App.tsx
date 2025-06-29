import React, { useState } from 'react';
import Navigation from './components/Navigation';
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
import { useEucharistData } from './hooks/useEucharistData';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeSection, scrollToSection } = useScrollNavigation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { data, loading, error } = useEucharistData();

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">Error al cargar los datos: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        scrollToSection={handleScrollToSection}
        data={data}
      />

      <HeroSection scrollToSection={handleScrollToSection} data={data} />
      <DefinitionSection data={data} />
      <HistorySection data={data} />
      <ElementsSection data={data} />
      <TheologySection data={data} />
      <SymbolsSection data={data} />
      <PrayersSection data={data} />
      <ResourcesSection data={data} />
      <Footer data={data} />
    </div>
  );
}

export default App;