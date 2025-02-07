'use client';

import { useEffect } from 'react';

export default function HeadingProcessor() {
  useEffect(() => {
    const processH3Headings = () => {
      const h3Elements = document.querySelectorAll('.blog-content .prose h3');
      h3Elements.forEach(h3 => {
        const text = h3.textContent || '';
        // 番号パターン（例：1-1.）にマッチする正規表現
        const match = text.match(/^\d+[-\.]\d+\.\s*(.*)/);
        if (match) {
          const [, mainText] = match;
          // h3は元の処理を維持
          h3.innerHTML = mainText;
        }
      });
    };

    const processH4Headings = () => {
      const h4Elements = document.querySelectorAll('.blog-content .prose h4:not(.blog-toc-title)');
      h4Elements.forEach(h4 => {
        const text = h4.textContent || '';
        // 番号パターン（例：5-2-1.）にマッチする正規表現
        const match = text.match(/^(\d+[-\.]\d+[-\.]\d+\.)\s*(.*)/);
        if (match) {
          const [, number, mainText] = match;
          // データ属性を設定してから内容を変更
          h4.setAttribute('data-heading-number', number);
          h4.textContent = mainText;
        }
      });
    };

    processH3Headings();
    processH4Headings();
  }, []);

  return null;
} 