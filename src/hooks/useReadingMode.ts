import { useState, useEffect } from 'react';

export interface ReadingSettings {
  fontSize: number;
  lineHeight: number;
  isHighContrast: boolean;
  isNightMode: boolean;
  fontFamily: string;
  maxWidth: number;
}

const DEFAULT_SETTINGS: ReadingSettings = {
  fontSize: 16,
  lineHeight: 1.6,
  isHighContrast: false,
  isNightMode: false,
  fontFamily: 'system',
  maxWidth: 800
};

export function useReadingMode() {
  const [settings, setSettings] = useState<ReadingSettings>(DEFAULT_SETTINGS);
  const [isReadingMode, setIsReadingMode] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('reading-settings');
    const savedReadingMode = localStorage.getItem('reading-mode') === 'true';
    
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      } catch (error) {
        console.error('Error loading reading settings:', error);
      }
    }
    
    setIsReadingMode(savedReadingMode);
  }, []);

  useEffect(() => {
    // Apply settings to document
    const root = document.documentElement;
    
    if (isReadingMode) {
      root.style.setProperty('--reading-font-size', `${settings.fontSize}px`);
      root.style.setProperty('--reading-line-height', settings.lineHeight.toString());
      root.style.setProperty('--reading-max-width', `${settings.maxWidth}px`);
      
      // Font family
      let fontFamily = '';
      switch (settings.fontFamily) {
        case 'serif':
          fontFamily = 'Georgia, "Times New Roman", Times, serif';
          break;
        case 'sans':
          fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          break;
        case 'mono':
          fontFamily = '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace';
          break;
        case 'dyslexic':
          fontFamily = '"OpenDyslexic", "Comic Sans MS", cursive';
          break;
        default:
          fontFamily = 'system-ui, -apple-system, sans-serif';
      }
      root.style.setProperty('--reading-font-family', fontFamily);
      
      // High contrast mode
      if (settings.isHighContrast) {
        root.classList.add('high-contrast');
      } else {
        root.classList.remove('high-contrast');
      }
      
      // Night mode (enhanced dark mode)
      if (settings.isNightMode) {
        root.classList.add('night-mode');
        root.classList.add('dark');
      } else {
        root.classList.remove('night-mode');
      }
      
      root.classList.add('reading-mode');
    } else {
      root.classList.remove('reading-mode', 'high-contrast', 'night-mode');
      // Reset CSS variables
      root.style.removeProperty('--reading-font-size');
      root.style.removeProperty('--reading-line-height');
      root.style.removeProperty('--reading-max-width');
      root.style.removeProperty('--reading-font-family');
    }
  }, [settings, isReadingMode]);

  const updateSettings = (newSettings: Partial<ReadingSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('reading-settings', JSON.stringify(updated));
  };

  const toggleReadingMode = () => {
    const newMode = !isReadingMode;
    setIsReadingMode(newMode);
    localStorage.setItem('reading-mode', newMode.toString());
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('reading-settings');
  };

  const increaseFontSize = () => {
    if (settings.fontSize < 24) {
      updateSettings({ fontSize: settings.fontSize + 1 });
    }
  };

  const decreaseFontSize = () => {
    if (settings.fontSize > 12) {
      updateSettings({ fontSize: settings.fontSize - 1 });
    }
  };

  const increaseLineHeight = () => {
    if (settings.lineHeight < 2.5) {
      updateSettings({ lineHeight: Math.round((settings.lineHeight + 0.1) * 10) / 10 });
    }
  };

  const decreaseLineHeight = () => {
    if (settings.lineHeight > 1.2) {
      updateSettings({ lineHeight: Math.round((settings.lineHeight - 0.1) * 10) / 10 });
    }
  };

  return {
    settings,
    isReadingMode,
    updateSettings,
    toggleReadingMode,
    resetSettings,
    increaseFontSize,
    decreaseFontSize,
    increaseLineHeight,
    decreaseLineHeight
  };
}