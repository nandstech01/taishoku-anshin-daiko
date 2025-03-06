'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';

// コンポーネントを動的にインポート
const AdBanner = dynamic(() => import('./AdBanner'), { ssr: false });
const ReviewSection = dynamic(() => import('./ReviewSection'), { ssr: false });
// 比較表コンポーネントを再定義
const ComparisonTable = dynamic(() => import('./ComparisonTable'), { 
  ssr: false,
  loading: () => <div className="h-20 w-full animate-pulse bg-gray-100"></div>
});

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
  const [reviewMarker, setReviewMarker] = useState<HTMLElement | null>(null);
  const [comparisonTableMarkers, setComparisonTableMarkers] = useState<HTMLElement[]>([]);

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
    const comparisonMarkersArray: HTMLElement[] = [];
    
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
    
    // 口コミセクションを5個目のh2タイトルの前に挿入
    if (h2Elements.length >= 5) {
      const fifthH2 = h2Elements[4]; // 5個目（インデックスは4）
      
      // 口コミセクションのマーカーを挿入
      const reviewMarkerElement = document.createElement('div');
      reviewMarkerElement.className = 'review-section-marker';
      reviewMarkerElement.style.margin = '3rem 0';
      
      // h2の前に口コミセクションのマーカーを挿入
      if (fifthH2.parentNode) {
        fifthH2.parentNode.insertBefore(reviewMarkerElement, fifthH2);
        setReviewMarker(reviewMarkerElement);
        console.log(`Inserted review section marker before 5th h2: ${fifthH2.textContent}`);
      }
    }
    
    // 比較表を2個目のh2タイトルの前に挿入
    if (h2Elements.length >= 2) {
      const secondH2 = h2Elements[1]; // 2個目（インデックスは1）
      
      // 比較表のマーカーを挿入
      const comparisonMarkerElement = document.createElement('div');
      comparisonMarkerElement.className = 'comparison-table-marker';
      comparisonMarkerElement.dataset.position = '1'; // 位置を識別するためのデータ属性
      comparisonMarkerElement.style.margin = '3rem 0';
      
      // h2の前に比較表のマーカーを挿入
      if (secondH2.parentNode) {
        secondH2.parentNode.insertBefore(comparisonMarkerElement, secondH2);
        comparisonMarkersArray.push(comparisonMarkerElement);
        console.log(`Inserted comparison table marker before 2nd h2: ${secondH2.textContent}`);
      }
    }
    
    // 比較表を7個目のh2タイトルの前にも挿入
    if (h2Elements.length >= 7) {
      const seventhH2 = h2Elements[6]; // 7個目（インデックスは6）
      
      // 比較表のマーカーを挿入
      const comparisonMarkerElement = document.createElement('div');
      comparisonMarkerElement.className = 'comparison-table-marker';
      comparisonMarkerElement.dataset.position = '6'; // 位置を識別するためのデータ属性
      comparisonMarkerElement.style.margin = '3rem 0';
      
      // h2の前に比較表のマーカーを挿入
      if (seventhH2.parentNode) {
        seventhH2.parentNode.insertBefore(comparisonMarkerElement, seventhH2);
        comparisonMarkersArray.push(comparisonMarkerElement);
        console.log(`Inserted comparison table marker before 7th h2: ${seventhH2.textContent}`);
      }
    }
    
    // 選択された位置を状態として保存
    setAdPositions(adPositionsToInsert);
    setAdMarkers(markersArray);
    setComparisonTableMarkers(comparisonMarkersArray);
    
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
      
      {/* 口コミセクションをReactコンポーネントとしてレンダリング */}
      {isContentProcessed && reviewMarker && createPortal(
        <ReviewSection key="review-section" />,
        reviewMarker
      )}
      
      {/* 比較表をReactコンポーネントとしてレンダリング */}
      {isContentProcessed && comparisonTableMarkers.map((marker, index) => {
        return createPortal(
          <ComparisonTable key={`comparison-table-${index}`} />,
          marker
        );
      })}
    </div>
  );
}