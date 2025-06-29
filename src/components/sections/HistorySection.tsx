import React from 'react';

export default function HistorySection() {
  return (
    <section id="history" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">Historia</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            Desde la Última Cena hasta nuestros días
          </p>
        </div>

        <div className="space-y-16">
          <div className="flex items-start space-x-8">
            <div className="flex-shrink-0 w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
              <span className="text-gray-900 dark:text-white font-medium">1</span>
            </div>
            <div>
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">La Última Cena</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-4">
                Jesús instituyó la Eucaristía durante la Última Cena con sus apóstoles, tomando pan y vino y diciendo: 
                "Esto es mi cuerpo... Esta es mi sangre". Les mandó hacerlo en memoria suya.
              </p>
              <blockquote className="border-l-2 border-gray-300 dark:border-gray-600 pl-6 italic text-gray-500 dark:text-gray-400 font-light">
                "Haced esto en conmemoración mía" - Lucas 22:19
              </blockquote>
            </div>
          </div>

          <div className="flex items-start space-x-8">
            <div className="flex-shrink-0 w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
              <span className="text-gray-900 dark:text-white font-medium">2</span>
            </div>
            <div>
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">La Iglesia Primitiva</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-4">
                Los primeros cristianos celebraban la "fracción del pan" siguiendo el mandato de Jesús. 
                San Pablo describe esta práctica en sus cartas.
              </p>
              <blockquote className="border-l-2 border-gray-300 dark:border-gray-600 pl-6 italic text-gray-500 dark:text-gray-400 font-light">
                "Porque yo recibí del Señor lo que os he enseñado" - 1 Corintios 11:23
              </blockquote>
            </div>
          </div>

          <div className="flex items-start space-x-8">
            <div className="flex-shrink-0 w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
              <span className="text-gray-900 dark:text-white font-medium">3</span>
            </div>
            <div>
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">Desarrollo Litúrgico</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                A lo largo de los siglos, la celebración eucarística se desarrolló en diferentes tradiciones litúrgicas, 
                manteniendo siempre los elementos esenciales establecidos por Cristo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}