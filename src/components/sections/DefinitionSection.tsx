import React from 'react';
import { Heart, Cross, Users } from 'lucide-react';
import { EucharistData } from '../../types/eucharist';

interface DefinitionSectionProps {
  data: EucharistData;
}

const iconMap = {
  Heart,
  Cross,
  Users
};

export default function DefinitionSection({ data }: DefinitionSectionProps) {
  return (
    <section 
      id="definition" 
      className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      itemScope 
      itemType="https://schema.org/DefinedTerm"
      aria-labelledby="definition-title"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-20">
          <h2 
            id="definition-title"
            className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6"
            itemProp="name"
          >
            {data.definition.title}
          </h2>
          <p 
            className="text-xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto"
            itemProp="description"
          >
            {data.definition.subtitle}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-12" role="list">
          {data.definition.cards.map((card, index) => {
            const IconComponent = iconMap[card.icon as keyof typeof iconMap];
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
                  aria-label={`Icono representativo de ${card.title}`}
                  role="img"
                />
                <h3 
                  className="text-xl font-medium text-gray-900 dark:text-white mb-4"
                  itemProp="name"
                >
                  {card.title}
                </h3>
                <p 
                  className="text-gray-600 dark:text-gray-300 leading-relaxed font-light"
                  itemProp="description"
                >
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}