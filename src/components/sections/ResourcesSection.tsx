import React from 'react';
import { Book, Users, Heart } from 'lucide-react';

export default function ResourcesSection() {
  return (
    <section id="resources" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">Recursos Adicionales</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            Materiales para profundizar en el conocimiento de la Eucaristía
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <Book className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Documentos Oficiales</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-light">
              <li>Catecismo de la Iglesia Católica</li>
              <li>Concilio Vaticano II</li>
              <li>Encíclica Ecclesia de Eucharistia</li>
              <li>Instrucción General del Misal</li>
            </ul>
          </div>

          <div className="text-center">
            <Users className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Santos Eucarísticos</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-light">
              <li>Santo Tomás de Aquino</li>
              <li>San Tarsicio</li>
              <li>Santa Juliana de Cornillon</li>
              <li>San Juan María Vianney</li>
              <li>Santa Teresa de Ávila</li>
            </ul>
          </div>

          <div className="text-center">
            <Heart className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Devociones</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-light">
              <li>Adoración Eucarística</li>
              <li>Corpus Christi</li>
              <li>Hora Santa</li>
              <li>Primera Comunión</li>
              <li>Comunión espiritual</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center border-t border-gray-200 dark:border-gray-700 pt-16">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">¿Deseas profundizar más?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto font-light">
            La Eucaristía es un misterio inagotable. Te invitamos a continuar tu formación 
            espiritual y teológica sobre este sacramento central de nuestra fe.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-light">
              Catequesis parroquial
            </span>
            <span className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-light">
              Lecturas espirituales
            </span>
            <span className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-light">
              Adoración Eucarística
            </span>
            <span className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-light">
              Dirección espiritual
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}