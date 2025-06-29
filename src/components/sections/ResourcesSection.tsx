import React from 'react';
import { Book, Users, Heart } from 'lucide-react';
import { EucharistData } from '../../types/eucharist';

interface ResourcesSectionProps {
  data: EucharistData;
}

const iconMap = {
  Book,
  Users,
  Heart
};

export default function ResourcesSection({ data }: ResourcesSectionProps) {
  return (
    <section id="resources" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">{data.resources.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            {data.resources.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {data.resources.categories.map((category, index) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            return (
              <div key={index} className="text-center">
                <IconComponent className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">{category.title}</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-light">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center border-t border-gray-200 dark:border-gray-700 pt-16">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">{data.resources.deepening.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto font-light">
            {data.resources.deepening.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {data.resources.deepening.tags.map((tag, index) => (
              <span key={index} className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-light">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}