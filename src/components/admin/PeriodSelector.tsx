'use client';

import React from 'react';

interface PeriodSelectorProps {
  value: number;
  onChange: (days: number) => void;
}

const PERIOD_OPTIONS = [
  { label: '7日間', value: 7 },
  { label: '30日間', value: 30 },
  { label: '90日間', value: 90 }
];

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-500">期間:</span>
      <div className="flex rounded-md shadow-sm">
        {PERIOD_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              px-4 py-2 text-sm font-medium
              ${value === option.value
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
              }
              ${option.value === PERIOD_OPTIONS[0].value && 'rounded-l-md'}
              ${option.value === PERIOD_OPTIONS[PERIOD_OPTIONS.length - 1].value && 'rounded-r-md'}
              border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
} 