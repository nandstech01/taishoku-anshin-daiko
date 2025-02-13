'use client';

import { useEffect, useCallback } from 'react';

// カスタムイベントを定義
const HEADINGS_PROCESSED_EVENT = 'headingsProcessed';

export default function HeadingProcessor() {
  // 見出し処理関数をメモ化
  const processH2Headings = useCallback(() => {
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
        id = text.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '') // 特殊文字を削除
          .replace(/\s+/g, '-') // スペースをハイフンに変換
          .replace(/-+/g, '-'); // 連続するハイフンを単一のハイフンに変換
      }
      
      h2.id = id;
      processedHeadings.push({ id, text });
    });

    // 処理完了を通知
    window.dispatchEvent(new CustomEvent(HEADINGS_PROCESSED_EVENT, {
      detail: { headings: processedHeadings }
    }));
  }, []);

  // H3とH4の処理を1つの関数にまとめる
  const processSubHeadings = useCallback(() => {
    // H3の処理
    document.querySelectorAll('.blog-content .prose h3').forEach(h3 => {
      const text = h3.textContent || '';
      const match = text.match(/^\d+[-\.]\d+\.\s*(.*)/);
      if (match) {
        const [, mainText] = match;
        h3.innerHTML = mainText;
      }
    });

    // H4の処理
    document.querySelectorAll('.blog-content .prose h4:not(.blog-toc-title)').forEach(h4 => {
      const text = h4.textContent || '';
      const match = text.match(/^(\d+[-\.]\d+[-\.]\d+\.)\s*(.*)/);
      if (match) {
        const [, number, mainText] = match;
        h4.setAttribute('data-heading-number', number);
        h4.textContent = mainText;
      }
    });
  }, []);

  useEffect(() => {
    // パフォーマンス計測開始
    const startTime = performance.now();

    // 見出し処理を一度だけ実行
    const processHeadings = () => {
      processH2Headings();
      processSubHeadings();
      
      // パフォーマンス計測終了
      const endTime = performance.now();
      console.log(`Heading processing took ${endTime - startTime}ms`);
    };

    // 次のフレームで実行
    const frameId = requestAnimationFrame(processHeadings);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener(HEADINGS_PROCESSED_EVENT, () => {});
    };
  }, [processH2Headings, processSubHeadings]);

  return null;
} 