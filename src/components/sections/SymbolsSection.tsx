import React from 'react';
import { Cross, Users, Heart } from 'lucide-react';

export default function SymbolsSection() {
  return (
    <section id="symbols" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">Símbolos Eucarísticos</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            Los signos sagrados que nos ayudan a comprender el misterio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <div className="w-6 h-6 bg-gray-900 dark:bg-white rounded-full"></div>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Pan</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Símbolo del alimento básico, representa a Cristo como el pan de vida que sostiene 
              nuestra existencia espiritual.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <div className="w-6 h-6 bg-gray-600 dark:bg-gray-400 rounded-full"></div>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Vino</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Representa la sangre de Cristo derramada por nosotros. Es símbolo de alegría 
              y de la nueva alianza.
            </p>
          </div>

          <div className="text-center">
            <Cross className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Cruz</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              El símbolo central del cristianismo, presente en cada Eucaristía como recordatorio 
              del sacrificio redentor.
            </p>
          </div>

          <div className="text-center">
            <Users className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Asamblea</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              La comunidad reunida representa el Cuerpo de Cristo, unida en la celebración 
              del misterio eucarístico.
            </p>
          </div>

          <div className="text-center">
            <div className="w-8 h-8 border border-gray-400 dark:border-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full"></div>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Luz</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Las velas representan a Cristo como luz del mundo, 
              que ilumina las tinieblas del pecado.
            </p>
          </div>

          <div className="text-center">
            <Heart className="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Corazón</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Símbolo del amor infinito de Cristo, que se entrega completamente 
              en cada Eucaristía.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}