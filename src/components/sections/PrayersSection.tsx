import React from 'react';
import { EucharistData } from '../../types/eucharist';

interface PrayersSectionProps {
  data: EucharistData;
}

export default function PrayersSection({ data }: PrayersSectionProps) {
  return (
    <section 
      id="prayers" 
      className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300"
      itemScope 
      itemType="https://schema.org/CreativeWork"
      aria-labelledby="prayers-title"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-20">
          <h2 
            id="prayers-title"
            className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6"
            itemProp="headline"
          >
            {data.prayers.title}
          </h2>
          <p 
            className="text-xl text-gray-600 dark:text-gray-300 font-light"
            itemProp="description"
          >
            {data.prayers.subtitle}
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-16">
          {data.prayers.sections.map((section, sectionIndex) => (
            <article key={sectionIndex} itemScope itemType="https://schema.org/ItemList">
              <h3 
                className="text-2xl font-medium text-gray-900 dark:text-white mb-8 text-center"
                itemProp="name"
              >
                {section.title}
              </h3>
              
              <div className="space-y-8" itemProp="itemListElement">
                {section.prayers.map((prayer, prayerIndex) => (
                  <div 
                    key={prayerIndex} 
                    className="border-l-2 border-gray-300 dark:border-gray-600 pl-6"
                    itemScope 
                    itemType="https://schema.org/CreativeWork"
                  >
                    <h4 
                      className="font-medium text-gray-900 dark:text-white mb-3"
                      itemProp="name"
                    >
                      {prayer.title}
                    </h4>
                    <blockquote 
                      className="text-gray-600 dark:text-gray-300 italic leading-relaxed font-light"
                      itemProp="text"
                    >
                      "{prayer.text}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 text-center border-t border-gray-200 dark:border-gray-700 pt-16">
          <article itemScope itemType="https://schema.org/CreativeWork">
            <h3 
              className="text-2xl font-medium text-gray-900 dark:text-white mb-8"
              itemProp="name"
            >
              {data.prayers.universal.title}
            </h3>
            <blockquote 
              className="text-xl italic text-gray-600 dark:text-gray-300 leading-relaxed font-light max-w-3xl mx-auto"
              itemProp="text"
            >
              "{data.prayers.universal.text}"
            </blockquote>
            <p 
              className="text-gray-500 dark:text-gray-400 mt-6 font-light"
              itemProp="author"
              itemScope 
              itemType="https://schema.org/Person"
            >
              - <span itemProp="name">{data.prayers.universal.author}</span> -
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}