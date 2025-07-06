import React, { useState } from 'react';
import { 
  BookOpen, 
  Type, 
  AlignLeft, 
  Eye, 
  Moon, 
  Sun, 
  Settings, 
  RotateCcw, 
  Plus, 
  Minus,
  X,
  Palette,
  Monitor
} from 'lucide-react';
import { useReadingMode } from '../hooks/useReadingMode';
import { Language } from '../hooks/useLanguage';

interface ReadingModePanelProps {
  language: Language;
}

export default function ReadingModePanel({ language }: ReadingModePanelProps) {
  const {
    settings,
    isReadingMode,
    updateSettings,
    toggleReadingMode,
    resetSettings,
    increaseFontSize,
    decreaseFontSize,
    increaseLineHeight,
    decreaseLineHeight
  } = useReadingMode();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'font' | 'spacing' | 'appearance'>('font');

  const fontFamilies = [
    { id: 'system', name: language === 'es' ? 'Sistema' : 'System', preview: 'Aa' },
    { id: 'serif', name: language === 'es' ? 'Serif' : 'Serif', preview: 'Aa' },
    { id: 'sans', name: language === 'es' ? 'Sans Serif' : 'Sans Serif', preview: 'Aa' },
    { id: 'mono', name: language === 'es' ? 'Monospace' : 'Monospace', preview: 'Aa' },
    { id: 'dyslexic', name: language === 'es' ? 'Dislexia' : 'Dyslexic', preview: 'Aa' }
  ];

  const maxWidths = [
    { value: 600, label: language === 'es' ? 'Estrecho' : 'Narrow' },
    { value: 800, label: language === 'es' ? 'Normal' : 'Normal' },
    { value: 1000, label: language === 'es' ? 'Ancho' : 'Wide' },
    { value: 1200, label: language === 'es' ? 'Muy ancho' : 'Very Wide' }
  ];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.altKey && e.key === 'r') {
      e.preventDefault();
      toggleReadingMode();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getReadingModeLabel = () => {
    switch (language) {
      case 'en':
        return 'Reading';
      case 'la':
        return 'Lectio';
      default:
        return 'Lectura';
    }
  };

  const getSettingsLabel = () => {
    switch (language) {
      case 'en':
        return 'Settings';
      case 'la':
        return 'Optiones';
      default:
        return 'Ajustes';
    }
  };

  return (
    <>
      {/* Reading Mode Toggle Button */}
      <button
        onClick={toggleReadingMode}
        className={`group relative p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
          isReadingMode
            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
            : 'bg-white/90 dark:bg-gray-900/90 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        } backdrop-blur-sm border border-gray-200 dark:border-gray-700`}
        title={language === 'es' 
          ? `${isReadingMode ? 'Desactivar' : 'Activar'} modo lectura (Alt+R)` 
          : `${isReadingMode ? 'Disable' : 'Enable'} reading mode (Alt+R)`
        }
      >
        <Eye className="w-5 h-5" />
        
        {/* Discrete label behind the icon */}
        <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-900/80 dark:bg-white/80 text-white dark:text-gray-900 text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          {getReadingModeLabel()}
        </span>
      </button>

      {/* Settings Button (only visible when reading mode is active) */}
      {isReadingMode && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 bg-white/90 dark:bg-gray-900/90 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white backdrop-blur-sm border border-gray-200 dark:border-gray-700"
          title={language === 'es' ? 'Configurar lectura' : 'Reading settings'}
        >
          <Settings className="w-5 h-5" />
          
          {/* Discrete label behind the icon */}
          <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-900/80 dark:bg-white/80 text-white dark:text-gray-900 text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {getSettingsLabel()}
          </span>
        </button>
      )}

      {/* Reading Mode Settings Panel */}
      {isOpen && isReadingMode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-2xl my-8 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Eye className="w-6 h-6 text-gray-900 dark:text-white" />
                <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                  {language === 'es' ? 'Configuración de Lectura' : 'Reading Settings'}
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {[
                { id: 'font' as const, icon: Type, label: language === 'es' ? 'Fuente' : 'Font' },
                { id: 'spacing' as const, icon: AlignLeft, label: language === 'es' ? 'Espaciado' : 'Spacing' },
                { id: 'appearance' as const, icon: Palette, label: language === 'es' ? 'Apariencia' : 'Appearance' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 flex-1 overflow-y-auto">
              {activeTab === 'font' && (
                <div className="space-y-6">
                  {/* Font Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                      {language === 'es' ? 'Tamaño de fuente' : 'Font size'}
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={decreaseFontSize}
                        disabled={settings.fontSize <= 12}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="flex-1 text-center">
                        <span className="text-lg font-medium text-gray-900 dark:text-white">
                          {settings.fontSize}px
                        </span>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {language === 'es' ? 'Tamaño actual' : 'Current size'}
                        </div>
                      </div>
                      <button
                        onClick={increaseFontSize}
                        disabled={settings.fontSize >= 24}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Font Family */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                      {language === 'es' ? 'Tipo de fuente' : 'Font family'}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {fontFamilies.map(font => (
                        <button
                          key={font.id}
                          onClick={() => updateSettings({ fontFamily: font.id })}
                          className={`p-3 border rounded-lg text-left transition-colors ${
                            settings.fontFamily === font.id
                              ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800'
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {font.name}
                            </span>
                            <span className="text-lg text-gray-600 dark:text-gray-400">
                              {font.preview}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'spacing' && (
                <div className="space-y-6">
                  {/* Line Height */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                      {language === 'es' ? 'Altura de línea' : 'Line height'}
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={decreaseLineHeight}
                        disabled={settings.lineHeight <= 1.2}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="flex-1 text-center">
                        <span className="text-lg font-medium text-gray-900 dark:text-white">
                          {settings.lineHeight}
                        </span>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {language === 'es' ? 'Espaciado actual' : 'Current spacing'}
                        </div>
                      </div>
                      <button
                        onClick={increaseLineHeight}
                        disabled={settings.lineHeight >= 2.5}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Max Width */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                      {language === 'es' ? 'Ancho de columna' : 'Column width'}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {maxWidths.map(width => (
                        <button
                          key={width.value}
                          onClick={() => updateSettings({ maxWidth: width.value })}
                          className={`p-3 border rounded-lg text-center transition-colors ${
                            settings.maxWidth === width.value
                              ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800'
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                          }`}
                        >
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {width.label}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {width.value}px
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  {/* High Contrast */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {language === 'es' ? 'Alto contraste' : 'High contrast'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {language === 'es' 
                            ? 'Mejora la legibilidad con colores más contrastados' 
                            : 'Improves readability with higher contrast colors'
                          }
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSettings({ isHighContrast: !settings.isHighContrast })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.isHighContrast ? 'bg-gray-900 dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-900 transition-transform ${
                          settings.isHighContrast ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Night Mode */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {language === 'es' ? 'Modo nocturno' : 'Night mode'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {language === 'es' 
                            ? 'Colores optimizados para lectura nocturna' 
                            : 'Colors optimized for night reading'
                          }
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSettings({ isNightMode: !settings.isNightMode })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.isNightMode ? 'bg-gray-900 dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-900 transition-transform ${
                          settings.isNightMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Preview */}
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      {language === 'es' ? 'Vista previa' : 'Preview'}
                    </div>
                    <div 
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                      style={{
                        fontSize: `${settings.fontSize}px`,
                        lineHeight: settings.lineHeight,
                        fontFamily: settings.fontFamily === 'serif' ? 'Georgia, serif' : 
                                   settings.fontFamily === 'mono' ? 'monospace' : 'sans-serif'
                      }}
                    >
                      {language === 'es' 
                        ? 'La Eucaristía es el sacramento central de la fe católica, donde Cristo se hace presente bajo las especies del pan y del vino.'
                        : 'The Eucharist is the central sacrament of the Catholic faith, where Christ becomes present under the species of bread and wine.'
                      }
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={resetSettings}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{language === 'es' ? 'Restablecer' : 'Reset'}</span>
              </button>
              
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
                {language === 'es' ? 'Alt+R para activar/desactivar' : 'Alt+R to toggle'}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}