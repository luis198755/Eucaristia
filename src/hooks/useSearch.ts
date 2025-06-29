import { useState, useEffect, useMemo } from 'react';
import { EucharistData } from '../types/eucharist';
import { Language } from './useLanguage';

export interface SearchResult {
  title: string;
  content: string;
  context?: string;
  section: string;
  sectionId: string;
  relevance: number;
}

export function useSearch(data: EucharistData, query: string, filters: string[], language: Language) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Create searchable content index
  const searchIndex = useMemo(() => {
    if (!data) return [];

    const index: Array<{
      title: string;
      content: string;
      section: string;
      sectionId: string;
      keywords: string[];
    }> = [];

    // Helper function to extract text content recursively
    const extractText = (obj: any): string => {
      if (typeof obj === 'string') return obj;
      if (Array.isArray(obj)) return obj.map(extractText).join(' ');
      if (typeof obj === 'object' && obj !== null) {
        return Object.values(obj).map(extractText).join(' ');
      }
      return '';
    };

    // Language-specific keywords
    const getKeywords = () => {
      switch (language) {
        case 'en':
          return ['eucharist', 'sacrament', 'jesus', 'christ', 'mass', 'communion', 'bread', 'wine', 'body', 'blood'];
        case 'la':
          return ['eucharistia', 'sacramentum', 'iesus', 'christus', 'missa', 'communio', 'panis', 'vinum', 'corpus', 'sanguis'];
        default: // 'es'
          return ['eucaristía', 'sacramento', 'jesús', 'cristo', 'misa', 'comunión', 'pan', 'vino', 'cuerpo', 'sangre'];
      }
    };

    const keywords = getKeywords();

    // Add hero section
    index.push({
      title: data.hero.title,
      content: `${data.hero.quote} ${data.hero.subtitle}`,
      section: language === 'es' ? 'Inicio' : language === 'en' ? 'Home' : 'Initium',
      sectionId: 'hero',
      keywords
    });

    // Add definition section
    index.push({
      title: data.definition.title,
      content: `${data.definition.subtitle} ${data.definition.cards.map(card => `${card.title} ${card.description}`).join(' ')}`,
      section: language === 'es' ? 'Definición' : language === 'en' ? 'Definition' : 'Definitio',
      sectionId: 'definition',
      keywords: [...keywords, language === 'es' ? 'definición' : language === 'en' ? 'definition' : 'definitio']
    });

    // Add history section
    data.history.timeline.forEach((item, idx) => {
      index.push({
        title: item.title,
        content: `${item.description} ${item.quote || ''} ${item.reference || ''}`,
        section: language === 'es' ? 'Historia' : language === 'en' ? 'History' : 'Historia',
        sectionId: 'history',
        keywords: [...keywords, language === 'es' ? 'historia' : language === 'en' ? 'history' : 'historia']
      });
    });

    // Add elements section
    data.elements.sections.forEach(section => {
      section.items.forEach(item => {
        index.push({
          title: item.title,
          content: item.description,
          section: language === 'es' ? 'Elementos' : language === 'en' ? 'Elements' : 'Elementa',
          sectionId: 'elements',
          keywords: [...keywords, language === 'es' ? 'elementos' : language === 'en' ? 'elements' : 'elementa']
        });
      });
    });

    // Add theology section
    data.theology.aspects.forEach(aspect => {
      index.push({
        title: aspect.title,
        content: aspect.description,
        section: language === 'es' ? 'Teología' : language === 'en' ? 'Theology' : 'Theologia',
        sectionId: 'theology',
        keywords: [...keywords, language === 'es' ? 'teología' : language === 'en' ? 'theology' : 'theologia']
      });
    });

    data.theology.effects.items.forEach(effect => {
      index.push({
        title: effect.title,
        content: effect.description,
        section: language === 'es' ? 'Teología' : language === 'en' ? 'Theology' : 'Theologia',
        sectionId: 'theology',
        keywords: [...keywords, language === 'es' ? 'efectos' : language === 'en' ? 'effects' : 'effectus']
      });
    });

    // Add symbols section
    data.symbols.items.forEach(symbol => {
      index.push({
        title: symbol.title,
        content: symbol.description,
        section: language === 'es' ? 'Símbolos' : language === 'en' ? 'Symbols' : 'Symbola',
        sectionId: 'symbols',
        keywords: [...keywords, language === 'es' ? 'símbolos' : language === 'en' ? 'symbols' : 'symbola']
      });
    });

    // Add prayers section
    data.prayers.sections.forEach(section => {
      section.prayers.forEach(prayer => {
        index.push({
          title: prayer.title,
          content: prayer.text,
          section: language === 'es' ? 'Oraciones' : language === 'en' ? 'Prayers' : 'Orationes',
          sectionId: 'prayers',
          keywords: [...keywords, language === 'es' ? 'oraciones' : language === 'en' ? 'prayers' : 'orationes']
        });
      });
    });

    // Add universal prayer
    index.push({
      title: data.prayers.universal.title,
      content: `${data.prayers.universal.text} ${data.prayers.universal.author}`,
      section: language === 'es' ? 'Oraciones' : language === 'en' ? 'Prayers' : 'Orationes',
      sectionId: 'prayers',
      keywords: [...keywords, language === 'es' ? 'oración universal' : language === 'en' ? 'universal prayer' : 'prex universalis']
    });

    // Add resources section
    data.resources.categories.forEach(category => {
      index.push({
        title: category.title,
        content: category.items.join(' '),
        section: language === 'es' ? 'Recursos' : language === 'en' ? 'Resources' : 'Fontes',
        sectionId: 'resources',
        keywords: [...keywords, language === 'es' ? 'recursos' : language === 'en' ? 'resources' : 'fontes']
      });
    });

    return index;
  }, [data, language]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    // Debounce search
    const timeoutId = setTimeout(() => {
      const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
      const searchResults: SearchResult[] = [];

      searchIndex.forEach(item => {
        // Skip if filters are applied and this item doesn't match
        if (filters.length > 0 && !filters.includes(item.sectionId)) {
          return;
        }

        const searchableText = `${item.title} ${item.content} ${item.keywords.join(' ')}`.toLowerCase();
        let relevance = 0;
        let matchedTerms = 0;

        searchTerms.forEach(term => {
          const titleMatch = item.title.toLowerCase().includes(term);
          const contentMatch = item.content.toLowerCase().includes(term);
          const keywordMatch = item.keywords.some(keyword => keyword.toLowerCase().includes(term));

          if (titleMatch) {
            relevance += 10; // Higher weight for title matches
            matchedTerms++;
          } else if (contentMatch) {
            relevance += 5; // Medium weight for content matches
            matchedTerms++;
          } else if (keywordMatch) {
            relevance += 3; // Lower weight for keyword matches
            matchedTerms++;
          }
        });

        // Only include results that match at least one search term
        if (matchedTerms > 0) {
          // Bonus for matching multiple terms
          relevance += matchedTerms * 2;

          // Extract context around the match
          const contextMatch = searchTerms.find(term => 
            item.content.toLowerCase().includes(term)
          );
          
          let context = '';
          if (contextMatch) {
            const contentLower = item.content.toLowerCase();
            const matchIndex = contentLower.indexOf(contextMatch);
            const start = Math.max(0, matchIndex - 50);
            const end = Math.min(item.content.length, matchIndex + contextMatch.length + 50);
            context = item.content.substring(start, end);
          }

          searchResults.push({
            title: item.title,
            content: item.content.length > 150 
              ? item.content.substring(0, 150) + '...' 
              : item.content,
            context: context || undefined,
            section: item.section,
            sectionId: item.sectionId,
            relevance
          });
        }
      });

      // Sort by relevance (highest first) and limit results
      const sortedResults = searchResults
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 20);

      setResults(sortedResults);
      setIsSearching(false);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      setIsSearching(false);
    };
  }, [query, filters, searchIndex]);

  return { results, isSearching };
}