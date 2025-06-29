import React from 'react';
import { Cross, ChevronRight } from 'lucide-react';
import { EucharistData } from '../../types/eucharist';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
  data: EucharistData;
}

export default function HeroSection({ scrollToSection, data }: HeroSectionProps) {
  return (
    <section 
      id="hero" 
      className="pt-16 min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300"
      itemScope 
      itemType="https://schema.org/WebPageElement"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <Cross className="w-12 h-12 text-gray-900 dark:text-white mx-auto mb-8" aria-hidden="true" />
        
        <h1 
          className="text-5xl md:text-7xl font-light text-gray-900 dark:text-white mb-8 tracking-tight"
          itemProp="headline"
        >
          {data.hero.title}
        </h1>
        
        <blockquote 
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 font-light max-w-3xl mx-auto leading-relaxed"
          itemProp="citation"
          cite="https://www.vatican.va/archive/bible/nova_vulgata/documents/nova-vulgata_nt_evangelium-secundum-ioannem_lt.html#6"
        >
          "{data.hero.quote}"
          <cite className="block text-sm mt-2 text-gray-500 dark:text-gray-400">Juan 6:51</cite>
        </blockquote>
        
        <p 
          className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto font-light"
          itemProp="description"
        >
          {data.hero.subtitle}
        </p>
        
        <button
          onClick={() => scrollToSection('definition')}
          className="inline-flex items-center space-x-2 text-gray-900 dark:text-white border border-gray-900 dark:border-white px-8 py-3 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
          aria-label="Explorar información sobre la Eucaristía"
        >
          <span className="font-medium">{data.hero.cta}</span>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}