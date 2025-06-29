import React from 'react';
import { Cross, Heart, Users, Book } from 'lucide-react';

export default function TheologySection() {
  return (
    <section id="theology" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">Significado Teológico</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            El misterio profundo de la Eucaristía en la fe católica
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="text-center">
            <Cross className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Sacrificio</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              La Eucaristía actualiza de manera incruenta el sacrificio de Cristo en la cruz. 
              Es el mismo sacrificio, no una repetición.
            </p>
          </div>

          <div className="text-center">
            <Heart className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Comunión</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Es el banquete sagrado donde recibimos a Cristo como alimento espiritual, 
              uniéndonos íntimamente con Él.
            </p>
          </div>

          <div className="text-center">
            <Users className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Presencia</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Cristo está verdadera, real y sustancialmente presente bajo las especies 
              eucarísticas.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-12">Efectos de la Eucaristía</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-5 h-5 text-gray-900 dark:text-white" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Gracia Santificante</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-light">Aumenta la vida divina en el alma</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-5 h-5 text-gray-900 dark:text-white" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Unión con Cristo</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-light">Estrecha nuestra relación personal</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cross className="w-5 h-5 text-gray-900 dark:text-white" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Perdón de Pecados</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-light">Borra los pecados veniales</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-5 h-5 text-gray-900 dark:text-white" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Vida Eterna</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-light">Garantía de resurrección</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}