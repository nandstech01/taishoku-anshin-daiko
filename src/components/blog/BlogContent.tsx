'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';

// 広告バナーを動的にインポート
const AdBanner = dynamic(() => import('./AdBanner'), { ssr: false });

interface BlogContentProps {
  content: string;
}

// バナーの種類を型として定義
type BannerVariant = 'horizontal' | 'vertical';

// 広告位置の型を定義
interface AdPosition {
  position: number;
  variant: BannerVariant;
}

export default function BlogContentProcessor({ content }: BlogContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adPositions, setAdPositions] = useState<AdPosition[]>([]);
  const [isContentProcessed, setIsContentProcessed] = useState(false);
  const [adMarkers, setAdMarkers] = useState<HTMLElement[]>([]);

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
    
    console.log(`Found ${h2Elements.length} h2 elements`);
    
    // 広告バナーを表示する位置を決定
    const adPositionsToInsert: AdPosition[] = [];
    const markersArray: HTMLElement[] = [];
    
    // 横長バナー（horizontal）: 4個目と8個目のh2タイトルの上に表示
    if (h2Elements.length >= 4) {
      adPositionsToInsert.push({ position: 3, variant: 'horizontal' as BannerVariant }); // 4個目（インデックスは3）
    }
    
    if (h2Elements.length >= 8) {
      adPositionsToInsert.push({ position: 7, variant: 'horizontal' as BannerVariant }); // 8個目（インデックスは7）
    }
    
    // 縦長バナー（vertical）: 6個目と10個目のh2タイトルの上に表示
    if (h2Elements.length >= 6) {
      adPositionsToInsert.push({ position: 5, variant: 'vertical' as BannerVariant }); // 6個目（インデックスは5）
    }
    
    if (h2Elements.length >= 10) {
      adPositionsToInsert.push({ position: 9, variant: 'vertical' as BannerVariant }); // 10個目（インデックスは9）
    }
    
    // 各広告位置にマーカーを挿入
    adPositionsToInsert.forEach(({ position, variant }) => {
      if (position < h2Elements.length) {
        const h2 = h2Elements[position];
        
        // 広告マーカーを挿入
        const marker = document.createElement('div');
        marker.className = `ad-banner-marker ad-banner-${variant}`;
        marker.dataset.position = position.toString();
        marker.dataset.variant = variant;
        marker.style.margin = '2rem 0';
        
        // h2の前に広告マーカーを挿入
        if (h2.parentNode) {
          h2.parentNode.insertBefore(marker, h2);
          markersArray.push(marker);
          console.log(`Inserted ${variant} banner marker before h2: ${h2.textContent}`);
        }
      }
    });
    
    // 選択された位置を状態として保存
    setAdPositions(adPositionsToInsert);
    setAdMarkers(markersArray);
    
    setIsContentProcessed(true);
  }, [content]);

  return (
    <div className="blog-content-processor">
      <div ref={containerRef} className="blog-content-html" />
      
      {/* 広告バナーをReactコンポーネントとしてレンダリング */}
      {isContentProcessed && adMarkers.map((marker, index) => {
        const variant = marker.dataset.variant as BannerVariant;
        return createPortal(
          <AdBanner key={`ad-${index}`} variant={variant} />,
          marker
        );
      })}
    </div>
  );
}