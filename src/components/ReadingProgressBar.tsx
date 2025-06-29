import React from 'react';

interface ReadingProgressBarProps {
  progress: number;
}

export default function ReadingProgressBar({ progress }: ReadingProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800">
      <div 
        className="h-full bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}