'use client';

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import type { TableOfContentsItem } from '../utils/markdown';

// カスタムイベントの型定義
declare global {
  interface WindowEventMap {
    'headingsProcessed': CustomEvent<{ headings: { id: string; text: string }[] }>;
  }
}

type Props = {
  items: TableOfContentsItem[];
};

export default function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [processedItems, setProcessedItems] = useState<TableOfContentsItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // h2の見出しのみをフィルタリング（メモ化）
  const { visibleItems, hiddenItems } = useMemo(() => {
    const filteredItems = processedItems.filter(item => item.level === 2);
    return {
      visibleItems: filteredItems.slice(0, 7),
      hiddenItems: filteredItems.slice(7)
    };
  }, [processedItems]);

  // IntersectionObserverのコールバックをメモ化
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
      }
    });
  }, []);

  // スクロールハンドラをメモ化
  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    });
  }, []);

  // 見出しクリックハンドラをメモ化
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, elementId: string) => {
    e.preventDefault();
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.warn(`Element with id ${elementId} not found`);
      return;
    }

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    setActiveId(elementId);
  }, []);

  // 見出し処理のイベントリスナー
  useEffect(() => {
    const handleHeadingsProcessed = (event: CustomEvent<{ headings: TableOfContentsItem[] }>) => {
      console.log('Headings processed:', event.detail.headings);
      setProcessedItems(event.detail.headings);
      setIsReady(true);
    };

    window.addEventListener('headingsProcessed', handleHeadingsProcessed as EventListener);
    return () => {
      window.removeEventListener('headingsProcessed', handleHeadingsProcessed as EventListener);
    };
  }, []);

  // Intersection Observerの設定
  useEffect(() => {
    if (!isReady) return;

    observerRef.current = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -35% 0px'
    });

    const elements = document.querySelectorAll('.blog-content .prose h2[id]');
    elements.forEach(element => {
      observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isReady, observerCallback]);

  // スクロールイベントの設定
  useEffect(() => {
    if (!isReady) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初期値を設定

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isReady, handleScroll]);

  if (!isReady || processedItems.length === 0) {
    return null;
  }

  return (
    <nav className="blog-toc relative" style={{ counterReset: 'toc-counter' }}>
      <div 
        className="blog-toc-progress"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
      <h2 className="blog-toc-title">目次</h2>
      <div className="blog-toc-visible">
        <ul>
          {visibleItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={activeId === item.id ? 'active' : ''}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {hiddenItems.length > 0 && (
        <>
          <button 
            className="blog-toc-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? '目次を閉じる' : '目次をもっと見る'}
          />
          <div 
            className="blog-toc-content"
            ref={contentRef}
            style={{
              height: isExpanded ? contentRef.current?.scrollHeight + 'px' : 0,
              overflow: 'hidden',
              transition: 'height 0.3s ease-in-out'
            }}
          >
            <ul>
              {hiddenItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={activeId === item.id ? 'active' : ''}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </nav>
  );
} 