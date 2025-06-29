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
    let title = data.site.title;
    
    if (currentSection && currentSection !== 'hero') {
      const section = data.navigation.items.find(item => item.id === currentSection);
      if (section) {
        title = `${section.label} - ${data.site.title}`;
      }
    }
    
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', data.site.description);
    }
    
    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    // Update Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }
    
    // Update language attribute
    document.documentElement.lang = language;
    
    // Update canonical URL based on language
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const baseUrl = 'https://eucaristia.guide';
      const url = language === 'en' ? `${baseUrl}/en/` : `${baseUrl}/`;
      canonical.setAttribute('href', url);
    }
    
  }, [data, language, currentSection]);

  return null; // This component doesn't render anything
}