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
    <section 
      id="elements" 
      className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      itemScope 
      itemType="https://schema.org/CreativeWork"
      aria-labelledby="elements-title"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-20">
          <h2 
            id="elements-title"
            className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6"
          >
            {data.elements.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            {data.elements.subtitle}
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-16">
          {data.elements.sections.map((section, sectionIndex) => (
            <article key={sectionIndex} itemScope itemType="https://schema.org/ItemList">
              <h3 
                className="text-2xl font-medium text-gray-900 dark:text-white mb-8"
                itemProp="name"
              >
                {section.title}
              </h3>
              <ol className="space-y-6" itemProp="itemListElement">
                {section.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex} 
                    className="flex items-start space-x-4"
                    itemScope 
                    itemType="https://schema.org/ListItem"
                    itemProp="itemListElement"
                  >
                    <div className={`w-6 h-6 ${item.icon ? 'bg-gray-900 dark:bg-white' : 'border border-gray-400 dark:border-gray-500'} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                      {item.icon ? (
                        (() => {
                          const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                          return <IconComponent className="w-3 h-3 text-white dark:text-gray-900" aria-hidden="true" />;
                        })()
                      ) : (
                        <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">{item.number}</span>
                      )}
                    </div>
                    <div>
                      <h4 
                        className="font-medium text-gray-900 dark:text-white mb-1"
                        itemProp="name"
                      >
                        {item.title}
                      </h4>
                      <p 
                        className="text-gray-600 dark:text-gray-300 text-sm font-light"
                        itemProp="description"
                      >
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}