'use client';

import React from 'react';
import Link from 'next/link';
import { TableOfContentsItem } from '../utils/markdown';

type Props = {
  items: TableOfContentsItem[];
  level?: number;
};

export default function TableOfContents({ items, level = 0 }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // URLのハッシュを更新（履歴に追加せず）
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <ul className={`space-y-2 ${level > 0 ? 'ml-4 mt-2' : ''}`}>
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className="text-gray-600 hover:text-gray-900 text-sm hover:underline cursor-pointer"
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