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
  const [headingElements, setHeadingElements] = useState<TableOfContentsItem[]>([]);

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
    const visibleEntries = entries.filter(entry => entry.isIntersecting);
    if (visibleEntries.length > 0) {
      // 最も上にある見出しをアクティブに
      setActiveId(visibleEntries[0].target.id);
    }
  }, []);

  // Intersection Observerの設定を最適化
  useEffect(() => {
    if (!isReady) return;

    const options = {
      rootMargin: '-20% 0px -35% 0px',
      threshold: [0, 0.5, 1.0] // より細かい観察
    };

    observerRef.current = new IntersectionObserver(observerCallback, options);

    // 監視対象を一括で設定
    const elements = document.querySelectorAll('.blog-content .prose h2[id]');
    const observeElements = Array.from(elements).slice(0, 20); // パフォーマンスのため上位20個に制限
    
    observeElements.forEach(element => {
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isReady, observerCallback]);

  // スクロールハンドラを最適化
  const handleScroll = useCallback(() => {
    const frame = requestAnimationFrame(() => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    });

    return () => cancelAnimationFrame(frame);
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

  // スクロールイベントの設定
  useEffect(() => {
    if (!isReady) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初期値を設定

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isReady, handleScroll]);

  // 見出しの処理を最適化
  const processHeadings = useCallback((headings: HTMLElement[]) => {
    const processedHeadings = headings.map(heading => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.substring(1))
    })).filter(heading => heading.level <= 6);

    setHeadingElements(processedHeadings);
  }, []);

  // 見出しの監視を最適化
  useEffect(() => {
    if (!isReady) return;

    const observer = new MutationObserver(() => {
      const headings = Array.from(document.querySelectorAll('.blog-content .prose h2, .blog-content .prose h3'));
      if (headings.length > 0) {
        processHeadings(headings as HTMLElement[]);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [isReady, processHeadings]);

  // メモ化されたヘッダーリスト
  const memoizedHeaders = useMemo(() => {
    return headingElements.map((heading, index) => (
      <li key={heading.id} className={`pl-${(heading.level - 2) * 4} py-1`}>
        <a
          href={`#${heading.id}`}
          className={`block text-sm hover:text-primary-600 transition-colors ${
            activeId === heading.id ? 'text-primary-600 font-medium' : 'text-gray-600'
          }`}
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById(heading.id);
            if (element) {
              const y = element.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
        >
          {heading.text}
        </a>
      </li>
    ));
  }, [headingElements, activeId]);

  if (!isReady || processedItems.length === 0) {
    return null;
  }

  return (
    <nav className={`blog-toc relative ${isExpanded ? 'expanded' : ''}`}>
      <div className="blog-toc-progress" style={{ transform: `scaleX(${progress / 100})` }} />
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
            type="button"
            className="blog-toc-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? '目次を閉じる' : '目次をもっと見る'}
          />
          <div 
            className="blog-toc-content"
            ref={contentRef}
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