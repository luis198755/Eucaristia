import React from 'react';
import { Cross, Heart } from 'lucide-react';
import { EucharistData } from '../../types/eucharist';

interface ElementsSectionProps {
  data: EucharistData;
}

const iconMap = {
  Cross,
  Heart
};

export default function ElementsSection({ data }: ElementsSectionProps) {
  return (
    <section id="elements" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">{data.elements.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            {data.elements.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {data.elements.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8">{section.title}</h3>
              <div className="space-y-6">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start space-x-4">
                    <div className={`w-6 h-6 ${item.icon ? 'bg-gray-900 dark:bg-white' : 'border border-gray-400 dark:border-gray-500'} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                      {item.icon ? (
                        (() => {
                          const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                          return <IconComponent className="w-3 h-3 text-white dark:text-gray-900" />;
                        })()
                      ) : (
                        <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">{item.number}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm font-light">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}