"use client";

import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div 
      className="max-w-7xl mx-auto px-4 py-8 animate-pulse"
      role="status"
      aria-label="診断結果を読み込み中"
      aria-busy="true"
    >
      {/* ヘッダースケルトン */}
      <div className="bg-gradient-to-r from-blue-600/30 to-blue-800/30 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-white/20 rounded" aria-hidden="true" />
          <div className="h-6 w-32 bg-white/20 rounded-full" aria-hidden="true" />
        </div>
        <div 
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"
          aria-label="スコア概要のプレースホルダー"
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/10 rounded-lg p-4" aria-hidden="true">
              <div className="h-6 w-32 bg-white/20 rounded mb-2" />
              <div className="h-8 w-16 bg-white/20 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* チャートスケルトン */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        aria-label="分析チャートのプレースホルダー"
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6" aria-hidden="true">
            <div className="h-6 w-40 bg-gray-200 rounded mb-6" />
            <div className="aspect-square bg-gray-100 rounded-lg" />
          </div>
        ))}
      </div>

      {/* キャリア適性スケルトン */}
      <div 
        className="mb-12"
        aria-label="キャリア適性分析のプレースホルダー"
      >
        <div className="h-8 w-48 bg-gray-200 rounded mb-6" aria-hidden="true" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6" aria-hidden="true">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-6 w-32 bg-gray-200 rounded" />
                <div className="h-6 w-24 bg-gray-200 rounded-full" />
              </div>
              <div className="h-4 w-full bg-gray-200 rounded mb-4" />
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-6 w-20 bg-gray-200 rounded-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 詳細分析スケルトン */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        aria-label="詳細分析のプレースホルダー"
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} aria-hidden="true">
            <div className="h-8 w-40 bg-gray-200 rounded mb-6" />
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-8 w-8 bg-gray-200 rounded-full" />
                <div>
                  <div className="h-8 w-24 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="flex-1 h-4 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* スクリーンリーダー用の読み上げテキスト */}
      <div className="sr-only" aria-live="polite">
        診断結果の分析中です。しばらくお待ちください。
      </div>
    </div>
  );
} 