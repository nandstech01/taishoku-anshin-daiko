'use client';

import * as React from 'react';
import { useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { InlineLineButton } from '@/components/blog/InlineLineButton';

interface BlogContentProps {
  html: string;
}

export default function BlogContent({ html }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // LINEボタンコンテナを探して、実際のボタンを挿入
    const containers = document.querySelectorAll('.inline-line-button-container');
    containers.forEach(container => {
      // 既存のボタンがある場合は削除
      container.innerHTML = '';
      // 新しいボタンを作成
      const button = document.createElement('div');
      const root = document.createElement('div');
      root.appendChild(button);
      container.appendChild(root);
      
      // Reactコンポーネントをレンダリング
      const reactRoot = createRoot(button);
      reactRoot.render(React.createElement(InlineLineButton));
    });

    return () => {
      // クリーンアップ時に全てのボタンを削除
      containers.forEach(container => {
        container.innerHTML = '';
      });
    };
  }, [html]); // html が変更されたときに再実行

  return (
    <div className="prose mx-auto">
      <div 
        dangerouslySetInnerHTML={{ __html: html }} 
        ref={contentRef}
      />
      <InlineLineButton />
    </div>
  );
} 