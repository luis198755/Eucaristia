import React from 'react';
import { Cross, Heart } from 'lucide-react';

export default function ElementsSection() {
  return (
    <section id="elements" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">Elementos de la Misa</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            Las partes principales de la celebración eucarística
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8">Liturgia de la Palabra</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 border border-gray-400 dark:border-gray-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Primera Lectura</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-light">Generalmente del Antiguo Testamento</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 border border-gray-400 dark:border-gray-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Salmo Responsorial</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-light">Respuesta meditativa a la primera lectura</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 border border-gray-400 dark:border-gray-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Segunda Lectura</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-light">De las cartas apostólicas</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Cross className="w-3 h-3 text-white dark:text-gray-900" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Evangelio</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-light">La culminación de la Liturgia de la Palabra</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8">Liturgia Eucarística</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 border border-gray-400 dark:border-gray-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Presentación de las Ofrendas</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-light">Pan, vino y ofrendas de los fieles</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 border border-gray-400 dark:border-gray-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Plegaria Eucarística</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-light">Consagración del pan y del vino</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 border border-gray-400 dark:border-gray-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Padre Nuestro</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-light">La oración que nos enseñó Jesús</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="w-3 h-3 text-white dark:text-gray-900" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Comunión</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-light">Recepción del Cuerpo y Sangre de Cristo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}