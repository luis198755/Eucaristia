import React from 'react';
import { EucharistData } from '../../types/eucharist';

interface HistorySectionProps {
  data: EucharistData;
}

export default function HistorySection({ data }: HistorySectionProps) {
  return (
    <section id="history" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">{data.history.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            {data.history.subtitle}
          </p>
        </div>

        <div className="space-y-16">
          {data.history.timeline.map((item, index) => (
            <div key={index} className="flex items-start space-x-8">
              <div className="flex-shrink-0 w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
                <span className="text-gray-900 dark:text-white font-medium">{item.step}</span>
              </div>
              <div>
                <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-4">
                  {item.description}
                </p>
                {item.quote && (
                  <blockquote className="border-l-2 border-gray-300 dark:border-gray-600 pl-6 italic text-gray-500 dark:text-gray-400 font-light">
                    "{item.quote}" {item.reference && `- ${item.reference}`}
                  </blockquote>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}