'use client';

import React, { useState, useEffect } from 'react';

// 初期表示用の静的コンテンツ（シンプル化）
const LoadingContent = () => (
  <div className="w-full h-screen bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
    <div className="text-white text-center max-w-4xl mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        退職代行サービス
        <span className="block text-2xl md:text-3xl mt-2">
          業界最安値2,980円で即日対応
        </span>
      </h2>
      <p className="text-xl mt-4">
        弁護士監修であんしん退職をサポート
      </p>
    </div>
  </div>
);

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // 初期表示時間を大幅に短縮（800ms）
    const timer = setTimeout(() => {
      // フェードアウト効果開始
      setOpacity(0);
      
      // アニメーション後に非表示に（300msでフェードアウト）
      setTimeout(() => {
        setShow(false);
      }, 300);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none transition-opacity duration-300 ease-out"
      style={{ opacity }}
      aria-hidden="true"
    >
      <LoadingContent />
    </div>
  );
} 