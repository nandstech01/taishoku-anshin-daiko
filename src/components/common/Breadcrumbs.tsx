'use client';

import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface Props {
  items: Breadcrumb[];
}

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-8" aria-label="パンくずリスト">
      <Link href="/" className="hover:text-orange-600 transition-colors whitespace-nowrap">
        ホーム
      </Link>
      
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <ChevronRightIcon className="h-4 w-4 flex-shrink-0 text-gray-400" />
          {item.href ? (
            <Link 
              href={item.href} 
              className={`hover:text-orange-600 transition-colors truncate ${
                index === items.length - 2 ? 'max-w-[60px]' : // カテゴリ一覧
                index === items.length - 1 ? 'max-w-[70px]' : // 最後の項目
                'max-w-[80px]'
              } sm:max-w-none`}
            >
              {item.label}
            </Link>
          ) : (
            <span className={`text-gray-900 truncate ${
              index === items.length - 2 ? 'max-w-[60px]' : // カテゴリ一覧
              index === items.length - 1 ? 'max-w-[70px]' : // 最後の項目
              'max-w-[80px]'
            } sm:max-w-none`}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
} 