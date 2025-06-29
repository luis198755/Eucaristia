import { useState, useEffect } from 'react';
import { EucharistData } from '../types/eucharist';
import { Language } from './useLanguage';

export function useEucharistData(language: Language) {
  const [data, setData] = useState<EucharistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        let eucharistData;
        
        if (language === 'en') {
          eucharistData = await import('../data/eucharistData.en.json');
        } else if (language === 'la') {
          eucharistData = await import('../data/eucharistData.la.json');
        } else {
          eucharistData = await import('../data/eucharistData.json');
        }
        
        setData(eucharistData.default as EucharistData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [language]);

  return { data, loading, error };
}