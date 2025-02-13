'use client';

import { useEffect, useCallback } from 'react';
import type { TableOfContentsItem } from '../utils/markdown';

// カスタムイベントを定義
const HEADINGS_PROCESSED_EVENT = 'headingsProcessed';

export default function HeadingProcessor() {
  // 見出し処理関数をメモ化
  const processH2Headings = useCallback(() => {
    const h2Elements = document.querySelectorAll('.blog-content .prose h2');
    const processedHeadings: TableOfContentsItem[] = [];
    
    console.log('Found h2 elements:', h2Elements.length);
    
    h2Elements.forEach((h2, index) => {
      const text = h2.textContent || '';
      console.log('Processing section with h2:', text);
      
      let id;
      const match = text.match(/^(\d+)\.\s*(.*)/);
      
      if (match) {
        const [, number] = match;
        id = `section-${number}`;
      } else {
        // 番号なしの見出しの場合、インデックスを使用
        id = `section-${index + 1}`;
      }
      
      h2.id = id;
      processedHeadings.push({
        id,
        text,
        level: 2
      });
    });

    // 処理完了を通知
    window.dispatchEvent(new CustomEvent(HEADINGS_PROCESSED_EVENT, {
      detail: { headings: processedHeadings }
    }));

    return processedHeadings;
  }, []);

  // H3とH4の処理を1つの関数にまとめる
  const processSubHeadings = useCallback(() => {
    // H3の処理
    document.querySelectorAll('.blog-content .prose h3').forEach((h3, index) => {
      const text = h3.textContent || '';
      const match = text.match(/^\d+[-\.]\d+\.\s*(.*)/);
      if (match) {
        const [, mainText] = match;
        h3.innerHTML = mainText;
      }
      h3.id = `subsection-${index + 1}`;
    });

    // H4の処理
    document.querySelectorAll('.blog-content .prose h4:not(.blog-toc-title)').forEach((h4, index) => {
      const text = h4.textContent || '';
      const match = text.match(/^(\d+[-\.]\d+[-\.]\d+\.)\s*(.*)/);
      if (match) {
        const [, number, mainText] = match;
        h4.setAttribute('data-heading-number', number);
        h4.textContent = mainText;
      }
      h4.id = `subsubsection-${index + 1}`;
    });
  }, []);

  useEffect(() => {
    // パフォーマンス計測開始
    const startTime = performance.now();

    // 見出し処理を一度だけ実行
    const processHeadings = () => {
      const headings = processH2Headings();
      processSubHeadings();
      
      // パフォーマンス計測終了
      const endTime = performance.now();
      console.log(`Heading processing took ${endTime - startTime}ms`);

      return headings;
    };

    // DOMContentLoadedイベントを待つ
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        requestAnimationFrame(() => {
          const headings = processHeadings();
          console.log('Processed headings:', headings);
        });
      });
    } else {
      requestAnimationFrame(() => {
        const headings = processHeadings();
        console.log('Processed headings:', headings);
      });
    }

    return () => {
      // クリーンアップ処理
      document.removeEventListener('DOMContentLoaded', () => {});
    };
  }, [processH2Headings, processSubHeadings]);

  return null;
} 