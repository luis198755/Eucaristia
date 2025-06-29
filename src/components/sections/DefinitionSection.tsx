import React from 'react';
import { Heart, Cross, Users } from 'lucide-react';

export default function DefinitionSection() {
  return (
    <section id="definition" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">Definición</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto">
            La Eucaristía es el sacramento instituido por Jesucristo en la Última Cena
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <Heart className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Sacramento Central</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Fuente y cumbre de toda la vida cristiana, donde Cristo se hace presente bajo las especies del pan y del vino.
            </p>
          </div>

          <div className="text-center">
            <Cross className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Presencia Real</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Cristo está verdaderamente presente bajo las apariencias del pan y del vino. No es solo un símbolo.
            </p>
          </div>

          <div className="text-center">
            <Users className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Comunión</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Nos une en comunión con Cristo y entre nosotros como miembros del Cuerpo de Cristo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}