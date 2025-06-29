import React from 'react';

export default function PrayersSection() {
  return (
    <section id="prayers" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">Oraciones Eucarísticas</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            Oraciones tradicionales para antes y después de la comunión
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8 text-center">Antes de la Comunión</h3>
            
            <div className="space-y-8">
              <div className="border-l-2 border-gray-300 dark:border-gray-600 pl-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Oración de Preparación</h4>
                <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed font-light">
                  "Señor, no soy digno de que entres en mi casa, pero una palabra tuya bastará 
                  para sanarme. Prepara mi corazón para reciberte con fe, esperanza y caridad."
                </p>
              </div>

              <div className="border-l-2 border-gray-300 dark:border-gray-600 pl-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Acto de Fe</h4>
                <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed font-light">
                  "Señor mío Jesucristo, creo firmemente que estás presente en este Sacramento, 
                  verdadero Dios y verdadero hombre."
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8 text-center">Después de la Comunión</h3>
            
            <div className="space-y-8">
              <div className="border-l-2 border-gray-300 dark:border-gray-600 pl-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Acción de Gracias</h4>
                <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed font-light">
                  "Te doy gracias, Señor Jesucristo, por haberme alimentado con tu Cuerpo y Sangre. 
                  Que esta comunión sea para mí fuente de vida eterna."
                </p>
              </div>

              <div className="border-l-2 border-gray-300 dark:border-gray-600 pl-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Ofrenda Personal</h4>
                <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed font-light">
                  "Alma de Cristo, santifícame. Cuerpo de Cristo, sálvame. Sangre de Cristo, embriágame. 
                  Dentro de tus llagas, escóndeme."
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center border-t border-gray-200 dark:border-gray-700 pt-16">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8">Plegaria Universal</h3>
          <blockquote className="text-xl italic text-gray-600 dark:text-gray-300 leading-relaxed font-light max-w-3xl mx-auto">
            "Oh Dios, que en este Sacramento admirable nos dejaste el memorial de tu Pasión, 
            te pedimos nos concedas venerar de tal modo los sagrados misterios de tu Cuerpo y de tu Sangre, 
            que experimentemos constantemente en nosotros el fruto de tu redención."
          </blockquote>
          <p className="text-gray-500 dark:text-gray-400 mt-6 font-light">- Oración de Santo Tomás de Aquino -</p>
        </div>
      </div>
    </section>
  );
}