import React from 'react';
import { Cross, Heart, Users, Book } from 'lucide-react';
import { EucharistData } from '../../types/eucharist';

interface TheologySectionProps {
  data: EucharistData;
}

const iconMap = {
  Cross,
  Heart,
  Users,
  Book
};

export default function TheologySection({ data }: TheologySectionProps) {
  return (
    <section 
      id="theology" 
      className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300"
      itemScope 
      itemType="https://schema.org/ScholarlyArticle"
      aria-labelledby="theology-title"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-20">
          <h2 
            id="theology-title"
            className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6"
            itemProp="headline"
          >
            {data.theology.title}
          </h2>
          <p 
            className="text-xl text-gray-600 dark:text-gray-300 font-light"
            itemProp="description"
          >
            {data.theology.subtitle}
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12 mb-20" role="list">
          {data.theology.aspects.map((aspect, index) => {
            const IconComponent = iconMap[aspect.icon as keyof typeof iconMap];
            return (
              <article 
                key={index} 
                className="text-center"
                itemScope 
                itemType="https://schema.org/Thing"
                role="listitem"
              >
                <IconComponent 
                  className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" 
                  aria-hidden="true"
                />
                <h3 
                  className="text-xl font-medium text-gray-900 dark:text-white mb-4"
                  itemProp="name"
                >
                  {aspect.title}
                </h3>
                <p 
                  className="text-gray-600 dark:text-gray-300 leading-relaxed font-light"
                  itemProp="description"
                >
                  {aspect.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="text-center">
          <h3 
            className="text-2xl font-medium text-gray-900 dark:text-white mb-12"
            itemProp="about"
          >
            {data.theology.effects.title}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            {data.theology.effects.items.map((effect, index) => {
              const IconComponent = iconMap[effect.icon as keyof typeof iconMap];
              return (
                <article 
                  key={index} 
                  className="text-center"
                  itemScope 
                  itemType="https://schema.org/Thing"
                  role="listitem"
                >
                  <div className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent 
                      className="w-5 h-5 text-gray-900 dark:text-white" 
                      aria-hidden="true"
                    />
                  </div>
                  <h4 
                    className="font-medium text-gray-900 dark:text-white mb-2"
                    itemProp="name"
                  >
                    {effect.title}
                  </h4>
                  <p 
                    className="text-sm text-gray-600 dark:text-gray-300 font-light"
                    itemProp="description"
                  >
                    {effect.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}