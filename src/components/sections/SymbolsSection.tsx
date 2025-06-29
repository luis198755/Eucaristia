import React from 'react';
import { Cross, Users, Heart } from 'lucide-react';
import { EucharistData } from '../../types/eucharist';

interface SymbolsSectionProps {
  data: EucharistData;
}

const iconMap = {
  Cross,
  Users,
  Heart
};

export default function SymbolsSection({ data }: SymbolsSectionProps) {
  const renderSymbol = (item: any) => {
    if (item.icon) {
      const IconComponent = iconMap[item.icon as keyof typeof iconMap];
      return <IconComponent className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />;
    }
    
    switch (item.symbol) {
      case 'circle':
        return (
          <div className="w-16 h-16 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center mb-6 mx-auto">
            <div className="w-6 h-6 bg-gray-900 dark:bg-white rounded-full"></div>
          </div>
        );
      case 'circle-gray':
        return (
          <div className="w-16 h-16 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center mb-6 mx-auto">
            <div className="w-6 h-6 bg-gray-600 dark:bg-gray-400 rounded-full"></div>
          </div>
        );
      case 'light':
        return (
          <div className="w-8 h-8 border border-gray-400 dark:border-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="symbols" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">{data.symbols.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            {data.symbols.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {data.symbols.items.map((item, index) => (
            <div key={index} className="text-center">
              {renderSymbol(item)}
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}