'use client';

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { TableOfContentsItem } from '../utils/markdown';

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
  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // h2の見出しのみをフィルタリング（メモ化）
  const { h2Items, visibleItems, hiddenItems } = useMemo(() => {
    const h2Items = items.filter(item => item.level === 2);
    return {
      h2Items,
      visibleItems: h2Items.slice(0, 7),
      hiddenItems: h2Items.slice(7)
    };
  }, [items]);

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
    const winScroll = document.documentElement.scrollTop;
    const height = 
      document.documentElement.scrollHeight - 
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setProgress(scrolled);
  }, []);

  // 見出しクリックハンドラをメモ化
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, item: TableOfContentsItem) => {
    e.preventDefault();
    const sectionNumber = item.text.match(/^(\d+)\./)?.[1];
    const elementId = sectionNumber ? `section-${sectionNumber}` : item.id;
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.warn(`Click target element not found:`, {
        text: item.text,
        elementId,
        allIds: Array.from(document.querySelectorAll('[id]')).map(el => el.id)
      });
      return;
    }

    const headerOffset = 120;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    window.history.replaceState(null, '', `#${elementId}`);
    setActiveId(elementId);
  }, []);

  useEffect(() => {
    const setupObserver = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        observerCallback,
        { rootMargin: '-20% 0px -35% 0px' }
      );

      h2Items.forEach((item) => {
        const sectionNumber = item.text.match(/^(\d+)\./)?.[1];
        const elementId = sectionNumber ? `section-${sectionNumber}` : item.id;
        const element = document.getElementById(elementId);
        
        if (element) {
          observerRef.current?.observe(element);
        }
      });
    };

    const handleHeadingsProcessed = () => {
      setIsReady(true);
      setupObserver();
    };

    window.addEventListener('headingsProcessed', handleHeadingsProcessed);
    window.addEventListener('scroll', handleScroll);

    if (document.querySelector('.blog-content .prose h2[id]')) {
      setIsReady(true);
      setupObserver();
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('headingsProcessed', handleHeadingsProcessed);
    };
  }, [h2Items, observerCallback, handleScroll]);

  if (!isReady) {
    return (
      <nav className="blog-toc relative" style={{ counterReset: 'toc-counter' }}>
        <h2 className="blog-toc-title">目次</h2>
        <div className="blog-toc-loading">Loading...</div>
      </nav>
    );
  }

  return (
    <nav className={`blog-toc relative ${isExpanded ? 'expanded' : ''}`} style={{ counterReset: 'toc-counter' }}>
      <div 
        className="blog-toc-progress"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
      <h2 className="blog-toc-title">目次</h2>
      <div className="blog-toc-visible">
        <ul>
          {visibleItems.map((item) => {
            const sectionNumber = item.text.match(/^(\d+)\./)?.[1];
            const elementId = sectionNumber ? `section-${sectionNumber}` : item.id;
            return (
              <li key={elementId}>
                <a
                  href={`#${elementId}`}
                  onClick={(e) => handleClick(e, item)}
                  className={`${activeId === elementId ? 'active' : ''}`}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      {hiddenItems.length > 0 && (
        <>
          <button 
            className="blog-toc-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? '目次を閉じる' : '目次をもっと見る'}
          />
          <div className="blog-toc-content" ref={contentRef} style={isExpanded ? { height: contentRef.current?.scrollHeight + 'px' } : undefined}>
            <ul>
              {hiddenItems.map((item) => {
                const sectionNumber = item.text.match(/^(\d+)\./)?.[1];
                const elementId = sectionNumber ? `section-${sectionNumber}` : item.id;
                return (
                  <li key={elementId}>
                    <a
                      href={`#${elementId}`}
                      onClick={(e) => handleClick(e, item)}
                      className={`${activeId === elementId ? 'active' : ''}`}
                    >
                      {item.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </nav>
  );
} 