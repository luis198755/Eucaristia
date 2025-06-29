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
    <section id="theology" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">{data.theology.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            {data.theology.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {data.theology.aspects.map((aspect, index) => {
            const IconComponent = iconMap[aspect.icon as keyof typeof iconMap];
            return (
              <div key={index} className="text-center">
                <IconComponent className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">{aspect.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                  {aspect.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-12">{data.theology.effects.title}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.theology.effects.items.map((effect, index) => {
              const IconComponent = iconMap[effect.icon as keyof typeof iconMap];
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-5 h-5 text-gray-900 dark:text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">{effect.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-light">{effect.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}