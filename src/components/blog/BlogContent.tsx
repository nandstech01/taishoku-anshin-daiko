'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// 広告バナーを動的にインポート
const AdBanner = dynamic(() => import('./AdBanner'), { ssr: false });

interface BlogContentProps {
  content: string;
}

export default function BlogContentProcessor({ content }: BlogContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adPositions, setAdPositions] = useState<number[]>([]);
  const [isContentProcessed, setIsContentProcessed] = useState(false);

  // コンテンツの初期処理
  useEffect(() => {
    if (!containerRef.current) return;

    // 初期コンテンツを設定
    containerRef.current.innerHTML = content;

    // h3とh4の数字を非表示にする処理
    const headings = containerRef.current.querySelectorAll('h3:not(.blog-toc-title), h4:not(.blog-toc-title)');
    headings.forEach(heading => {
      const text = heading.textContent || '';
      // 数字パターン（例：5-1. や 4-1-1.）にマッチする正規表現
      const match = text.match(/^(\d+[-\.]\d+(?:[-\.]\d+)?\.)\s*(.+)$/);
      if (match) {
        const [, number, title] = match;
        heading.innerHTML = `<span class="hidden">${number}</span>${title}`;
      }
    });

    // h2要素を探す（blog-toc-titleクラスを持たないh2要素のみを対象とする）
    const h2Elements = Array.from(
      containerRef.current.querySelectorAll('h2:not(.blog-toc-title)')
    );
    
    // h2要素が少なくとも3つ以上ある場合のみ広告を挿入
    if (h2Elements.length >= 3) {
      // ランダムに広告を挿入する位置を選択（最初と最後のh2は除外）
      const availableIndices = Array.from({ length: h2Elements.length - 2 }, (_, i) => i + 1);
      
      // 記事の長さに応じて挿入する広告の数を決定
      const numAdsToInsert = h2Elements.length >= 6 ? 2 : 1;
      
      // ランダムに広告を挿入する位置を選択
      const selectedIndices = [];
      for (let i = 0; i < numAdsToInsert && availableIndices.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableIndices.length);
        selectedIndices.push(availableIndices[randomIndex]);
        availableIndices.splice(randomIndex, 1);
      }
      
      // 選択された位置を状態として保存
      setAdPositions(selectedIndices);
    }
    
    setIsContentProcessed(true);
  }, [content]);

  // 広告バナーを挿入する処理
  useEffect(() => {
    if (!containerRef.current || !isContentProcessed || adPositions.length === 0) return;

    const h2Elements = Array.from(
      containerRef.current.querySelectorAll('h2:not(.blog-toc-title)')
    );

    // 各広告位置にマーカーを挿入
    adPositions.forEach(index => {
      if (index < h2Elements.length) {
        const h2 = h2Elements[index];
        
        // すでにマーカーが挿入されていないか確認
        const prevElement = h2.previousElementSibling;
        if (prevElement && prevElement.classList.contains('ad-banner-marker')) {
          return;
        }
        
        // 広告マーカーを挿入
        const marker = document.createElement('div');
        marker.className = 'ad-banner-marker';
        marker.dataset.position = index.toString();
        h2.parentNode?.insertBefore(marker, h2);
      }
    });
  }, [isContentProcessed, adPositions]);

  return (
    <div className="blog-content-processor">
      <div ref={containerRef} className="blog-content-html" />
      
      {/* 広告バナーをReactコンポーネントとしてレンダリング */}
      {isContentProcessed && adPositions.map((position, index) => (
        <AdBannerRenderer key={`ad-${position}`} position={position} />
      ))}
    </div>
  );
}

// 広告バナーをレンダリングするコンポーネント
function AdBannerRenderer({ position }: { position: number }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // クライアントサイドでのみレンダリング
  if (!mounted) return null;
  
  // マーカー要素を探す
  const marker = document.querySelector(`.ad-banner-marker[data-position="${position}"]`);
  if (!marker) return null;
  
  // ランダムにバリエーションを選択
  const variant = Math.random() > 0.5 ? 'horizontal' : 'vertical';
  
  // ReactPortalを使用してマーカー位置に広告を挿入
  return (
    <div className="my-8">
      <AdBanner variant={variant} />
    </div>
  );
}