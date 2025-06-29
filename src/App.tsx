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

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeSection, scrollToSection } = useScrollNavigation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        scrollToSection={handleScrollToSection}
      />

      <HeroSection scrollToSection={handleScrollToSection} />
      <DefinitionSection />
      <HistorySection />
      <ElementsSection />
      <TheologySection />
      <SymbolsSection />
      <PrayersSection />
      <ResourcesSection />
      <Footer />
    </div>
  );
}

export default App;