import React from 'react';
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
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8" aria-label="パンくずリスト">
      <Link href="/" className="hover:text-orange-600 transition-colors">
        ホーム
      </Link>
      
      {items.map((item, index) => (
        <span key={index} className="flex items-center space-x-2">
          <ChevronRightIcon className="h-4 w-4 text-gray-400" />
          {item.href ? (
            <Link href={item.href} className="hover:text-orange-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
} 