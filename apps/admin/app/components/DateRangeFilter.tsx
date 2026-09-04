"use client";

import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

export function DateRangeFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Last 7 Days');

  const options = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month', 'Year to Date'];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-brand-purple)] transition-colors"
      >
        <Calendar size={16} className="text-gray-400" />
        {selected}
        <ChevronDown size={16} className="text-gray-400 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  selected === option ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                role="menuitem"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
