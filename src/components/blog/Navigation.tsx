'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/blog', label: '記事一覧' },
    { href: '/blog/categories', label: 'カテゴリー' },
    { href: '/blog/archive', label: 'アーカイブ' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                    isActive
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
} 