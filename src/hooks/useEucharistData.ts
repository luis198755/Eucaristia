import { useState, useEffect } from 'react';
import { EucharistData } from '../types/eucharist';
import eucharistData from '../data/eucharistData.json';

export function useEucharistData() {
  const [data, setData] = useState<EucharistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setData(eucharistData as EucharistData);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
}