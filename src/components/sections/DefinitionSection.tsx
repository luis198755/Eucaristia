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
    <section id="definition" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">{data.definition.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto">
            {data.definition.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {data.definition.cards.map((card, index) => {
            const IconComponent = iconMap[card.icon as keyof typeof iconMap];
            return (
              <div key={index} className="text-center">
                <IconComponent className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}