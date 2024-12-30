'use client';

import React from 'react';

const MAX_HISTORY_ITEMS = 10;
const SEARCH_HISTORY_KEY = 'blog_search_history';

interface SearchHistoryProps {
  onSelect: (keyword: string) => void;
}

export function saveSearchKeyword(keyword: string) {
  if (!keyword.trim()) return;
  
  try {
    const historyJson = localStorage.getItem(SEARCH_HISTORY_KEY);
    const history: string[] = historyJson ? JSON.parse(historyJson) : [];
    
    // 重複を削除して先頭に追加
    const newHistory = [
      keyword,
      ...history.filter(k => k !== keyword)
    ].slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('Failed to save search history:', error);
  }
}

export function SearchHistory({ onSelect }: SearchHistoryProps) {
  const history: string[] = (() => {
    try {
      const historyJson = localStorage.getItem(SEARCH_HISTORY_KEY);
      return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
      console.error('Failed to load search history:', error);
      return [];
    }
  })();

  if (history.length === 0) {
    return null;
  }

  const handleClear = () => {
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
      // 強制的に再レンダリング
      window.location.reload();
    } catch (error) {
      console.error('Failed to clear search history:', error);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-700">検索履歴</h4>
        <button
          onClick={handleClear}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          履歴を削除
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((keyword: string, index: number) => (
          <button
            key={index}
            onClick={() => onSelect(keyword)}
            className="text-sm bg-gray-100 text-gray-700 rounded-full px-3 py-1 hover:bg-gray-200 transition-colors"
          >
            {keyword}
          </button>
        ))}
      </div>
    </div>
  );
} 