import React from 'react';
import { EucharistData } from '../../types/eucharist';

interface PrayersSectionProps {
  data: EucharistData;
}

export default function PrayersSection({ data }: PrayersSectionProps) {
  return (
    <section id="prayers" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">{data.prayers.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            {data.prayers.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {data.prayers.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8 text-center">{section.title}</h3>
              
              <div className="space-y-8">
                {section.prayers.map((prayer, prayerIndex) => (
                  <div key={prayerIndex} className="border-l-2 border-gray-300 dark:border-gray-600 pl-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">{prayer.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed font-light">
                      "{prayer.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center border-t border-gray-200 dark:border-gray-700 pt-16">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8">{data.prayers.universal.title}</h3>
          <blockquote className="text-xl italic text-gray-600 dark:text-gray-300 leading-relaxed font-light max-w-3xl mx-auto">
            "{data.prayers.universal.text}"
          </blockquote>
          <p className="text-gray-500 dark:text-gray-400 mt-6 font-light">- {data.prayers.universal.author} -</p>
        </div>
      </div>
    </section>
  );
}