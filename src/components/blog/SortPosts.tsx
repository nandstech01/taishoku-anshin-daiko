'use client';

import React from 'react';
import type { SortOption } from '@/types/blog';
import { SORT_OPTIONS } from '@/types/blog';

interface SortPostsProps {
  value: SortOption;
  onChange: (option: SortOption) => void;
}

export function SortPosts({ value, onChange }: SortPostsProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        並び替え
      </label>
      <select
        id="sort"
        value={value.value}
        onChange={(e) => {
          const option = SORT_OPTIONS.find((opt) => opt.value === e.target.value);
          if (option) {
            onChange(option);
          }
        }}
        className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
} 