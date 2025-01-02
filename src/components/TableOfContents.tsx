'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { TableOfContentsItem } from '../utils/markdown';

type Props = {
  items: TableOfContentsItem[];
  level?: number;
};

export default function TableOfContents({ items, level = 0 }: Props) {
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    // 全ての見出し要素を監視
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
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
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      window.history.replaceState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  if (level === 0) {
    return (
      <div className="blog-toc">
        <div 
          className="blog-toc-progress"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
        <h2 className="blog-toc-title">目次</h2>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`${activeId === item.id ? 'active' : ''}`}
              >
                {item.text}
              </a>
              {item.children && item.children.length > 0 && (
                <TableOfContents items={item.children} level={level + 1} />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <ul className="ml-4 mt-2 space-y-2">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={`${activeId === item.id ? 'active' : ''}`}
          >
            {item.text}
          </a>
          {item.children && item.children.length > 0 && (
            <TableOfContents items={item.children} level={level + 1} />
          )}
        </li>
      ))}
    </ul>
  );
} 