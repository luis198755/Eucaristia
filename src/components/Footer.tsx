import React from 'react';
import { Cross } from 'lucide-react';
import { EucharistData } from '../types/eucharist';

interface FooterProps {
  data: EucharistData;
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <Cross className="w-8 h-8 text-white mx-auto mb-6" />
          <h3 className="text-xl font-medium mb-6">{data.footer.title}</h3>
          
          <p className="text-gray-300 dark:text-gray-400 mb-8 max-w-2xl mx-auto font-light">
            "{data.footer.quote}"
          </p>
          <p className="text-lg text-gray-400 dark:text-gray-500 font-light">{data.footer.reference}</p>
          
          <div className="border-t border-gray-700 dark:border-gray-800 mt-12 pt-8">
            <p className="text-gray-400 dark:text-gray-500 text-sm font-light">
              {data.footer.copyright} • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}