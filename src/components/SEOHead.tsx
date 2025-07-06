import React from 'react';
import { EucharistData } from '../types/eucharist';
import { Language } from '../hooks/useLanguage';

interface SEOHeadProps {
  data: EucharistData;
  language: Language;
  currentSection?: string;
}

export default function SEOHead({ data, language, currentSection }: SEOHeadProps) {
  React.useEffect(() => {
    // Update document title based on current section
    let title = "La Eucaristía: Guía Completa del Sacramento Central";
    
    if (currentSection && currentSection !== 'hero') {
      const section = data.navigation.items.find(item => item.id === currentSection);
      if (section) {
        title = `${section.label} - La Eucaristía: Guía Completa`;
      }
    }
    
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const descriptions = {
        'definition': 'Descubre qué es la Eucaristía: sacramento central católico, presencia real de Cristo y fuente de vida espiritual.',
        'history': 'Historia de la Eucaristía desde la Última Cena hasta hoy: desarrollo litúrgico y tradición de la Iglesia.',
        'elements': 'Elementos de la Misa católica: Liturgia de la Palabra y Liturgia Eucarística explicados paso a paso.',
        'theology': 'Teología eucarística: significado del sacrificio, comunión y presencia real de Cristo en el sacramento.',
        'symbols': 'Símbolos eucarísticos: pan, vino, cruz y otros signos sagrados que revelan el misterio de la Eucaristía.',
        'prayers': 'Oraciones eucarísticas tradicionales: preparación, acción de gracias y plegarias para la comunión.',
        'resources': 'Recursos para profundizar en la Eucaristía: documentos oficiales, santos y devociones eucarísticas.'
      };
      
      const description = descriptions[currentSection as keyof typeof descriptions] || 
        'Descubre la Eucaristía: historia, teología, elementos de la Misa y oraciones. Guía completa del sacramento central católico con búsqueda bíblica integrada.';
      
      metaDescription.setAttribute('content', description);
    }
    
    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    // Update Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && metaDescription) {
      ogDescription.setAttribute('content', metaDescription.getAttribute('content') || '');
    }
    
    // Update Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }
    
    // Update Twitter description
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription && metaDescription) {
      twitterDescription.setAttribute('content', metaDescription.getAttribute('content') || '');
    }
    
    // Update language attribute
    document.documentElement.lang = language;
    
    // Update canonical URL based on language
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const baseUrl = 'https://eucaristia.guide';
      const url = language === 'en' ? `${baseUrl}/en/` : 
                  language === 'la' ? `${baseUrl}/la/` : `${baseUrl}/`;
      canonical.setAttribute('href', url);
    }
    
  }, [data, language, currentSection]);

  return null; // This component doesn't render anything
}