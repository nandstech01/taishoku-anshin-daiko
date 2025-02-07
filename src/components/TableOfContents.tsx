'use client';

import React, { useEffect, useState, useRef } from 'react';
import { TableOfContentsItem, generateHeadingId } from '../utils/markdown';

type Props = {
  items: TableOfContentsItem[];
};

export default function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // h2の見出しのみをフィルタリング
  const h2Items = items.filter(item => item.level === 2);
  const visibleItems = h2Items.slice(0, 7);
  const hiddenItems = h2Items.slice(7);

  useEffect(() => {
    // デバッグ用：すべての見出しIDを確認
    console.log('Available heading IDs:', h2Items.map(item => {
      const sectionNumber = item.text.match(/^(\d+)\./)?.[1];
      const elementId = sectionNumber ? `section-${sectionNumber}` : item.id;
      return {
        text: item.text,
        elementId,
        exists: document.getElementById(elementId) !== null
      };
    }));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            console.log('Intersecting element:', { id, element: entry.target });
            setActiveId(id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    // h2の見出し要素のみを監視
    h2Items.forEach((item) => {
      const sectionNumber = item.text.match(/^(\d+)\./)?.[1];
      const elementId = sectionNumber ? `section-${sectionNumber}` : item.id;
      const element = document.getElementById(elementId);
      
      if (!element) {
        console.warn(`Element not found for heading: ${item.text}`, {
          elementId,
          exists: document.getElementById(elementId) !== null,
          allIds: Array.from(document.querySelectorAll('[id]')).map(el => el.id)
        });
      } else {
        observer.observe(element);
      }
    });

    // スクロール進捗の計算
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      h2Items.forEach((item) => {
        const sectionNumber = item.text.match(/^(\d+)\./)?.[1];
        const elementId = sectionNumber ? `section-${sectionNumber}` : item.id;
        const element = document.getElementById(elementId);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [h2Items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: TableOfContentsItem) => {
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

    // ヘッダーの高さを考慮してスクロール位置を調整
    const headerOffset = 120; // ヘッダー + パンくずの高さ
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // URLとアクティブ状態を更新
    window.history.replaceState(null, '', `#${elementId}`);
    setActiveId(elementId);
  };

  // 見出しテキストから数字と残りのテキストを分離する関数
  const splitNumberAndText = (text: string) => {
    const match = text.match(/^(\d+)\.\s*(.+)$/);
    if (match) {
      return {
        number: match[1],
        text: match[2]
      };
    }
    return {
      number: '',
      text: text
    };
  };

  const toggleToc = () => {
    setIsExpanded(!isExpanded);
  };

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
            const { number, text } = splitNumberAndText(item.text);
            const sectionNumber = item.text.match(/^(\d+)\./)?.[1];
            const elementId = sectionNumber ? `section-${sectionNumber}` : item.id;
            return (
              <li key={elementId}>
                <a
                  href={`#${elementId}`}
                  onClick={(e) => handleClick(e, item)}
                  className={`${activeId === elementId ? 'active' : ''}`}
                >
                  {number && <span className="number">{number}</span>}
                  {text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      {hiddenItems.length > 0 && (
        <>
          <div 
            className="blog-toc-toggle"
            onClick={toggleToc}
            aria-label={isExpanded ? '目次を閉じる' : '目次をもっと見る'}
          />
          <div className="blog-toc-content" ref={contentRef} style={isExpanded ? { height: contentRef.current?.scrollHeight + 'px' } : undefined}>
            <ul>
              {hiddenItems.map((item) => {
                const { number, text } = splitNumberAndText(item.text);
                const sectionNumber = item.text.match(/^(\d+)\./)?.[1];
                const elementId = sectionNumber ? `section-${sectionNumber}` : item.id;
                return (
                  <li key={elementId}>
                    <a
                      href={`#${elementId}`}
                      onClick={(e) => handleClick(e, item)}
                      className={`${activeId === elementId ? 'active' : ''}`}
                    >
                      {number && <span className="number">{number}</span>}
                      {text}
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