'use client';

import { useEffect } from 'react';

// カスタムイベントを定義
const HEADINGS_PROCESSED_EVENT = 'headingsProcessed';

export default function HeadingProcessor() {
  useEffect(() => {
    const processH2Headings = () => {
      const h2Elements = document.querySelectorAll('.blog-content .prose h2');
      const processedHeadings: { id: string; text: string }[] = [];
      
      h2Elements.forEach(h2 => {
        const text = h2.textContent || '';
        const match = text.match(/^(\d+)\.\s*(.*)/);
        
        let id;
        if (match) {
          const [, number] = match;
          id = `section-${number}`;
        } else {
          // 番号なしの見出しの場合、テキストをそのままIDとして使用
          id = text.toLowerCase().replace(/\s+/g, '-');
        }
        
        h2.id = id;
        processedHeadings.push({ id, text });
        console.log('Generated heading:', { text, id, depth: 2 });
      });

      // 処理完了を通知
      window.dispatchEvent(new CustomEvent(HEADINGS_PROCESSED_EVENT, {
        detail: { headings: processedHeadings }
      }));
    };

    const processH3Headings = () => {
      const h3Elements = document.querySelectorAll('.blog-content .prose h3');
      h3Elements.forEach(h3 => {
        const text = h3.textContent || '';
        const match = text.match(/^\d+[-\.]\d+\.\s*(.*)/);
        if (match) {
          const [, mainText] = match;
          h3.innerHTML = mainText;
        }
      });
    };

    const processH4Headings = () => {
      const h4Elements = document.querySelectorAll('.blog-content .prose h4:not(.blog-toc-title)');
      h4Elements.forEach(h4 => {
        const text = h4.textContent || '';
        const match = text.match(/^(\d+[-\.]\d+[-\.]\d+\.)\s*(.*)/);
        if (match) {
          const [, number, mainText] = match;
          h4.setAttribute('data-heading-number', number);
          h4.textContent = mainText;
        }
      });
    };

    // 見出し処理を即時実行
    requestAnimationFrame(() => {
      processH2Headings();
      processH3Headings();
      processH4Headings();
    });

    return () => {
      // クリーンアップ時にイベントリスナーを削除
      window.removeEventListener(HEADINGS_PROCESSED_EVENT, () => {});
    };
  }, []);

  return null;
} 