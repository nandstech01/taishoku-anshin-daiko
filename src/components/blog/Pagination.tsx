'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export function Pagination({ totalItems, itemsPerPage, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) {
    return null;
  }

  // ページネーションの範囲を計算（現在のページの前後2ページまで表示）
  const range = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(page => 
      page === 1 || 
      page === totalPages || 
      Math.abs(page - currentPage) <= 2
    )
    .reduce((acc: (number | string)[], page) => {
      if (acc.length === 0) {
        return [page];
      }
      
      const lastPage = acc[acc.length - 1];
      if (typeof lastPage === 'number' && page - lastPage === 1) {
        return [...acc, page];
      }
      
      return [...acc, '...', page];
    }, []);

  // 新しいURLを生成する関数
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    // 既存のパラメータをコピー
    searchParams.forEach((value, key) => {
      params.set(key, value);
    });
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav className="flex justify-center mt-8" aria-label="ページネーション">
      <ul className="flex items-center gap-1">
        {currentPage > 1 && (
          <li>
            <Link
              href={createPageUrl(currentPage - 1)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              aria-label="前のページ"
            >
              ←
            </Link>
          </li>
        )}

        {range.map((page, index) => (
          <li key={index}>
            {typeof page === 'number' ? (
              <Link
                href={createPageUrl(page)}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors
                  ${currentPage === page
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
              >
                {page}
              </Link>
            ) : (
              <span className="inline-flex items-center justify-center w-10 h-10 text-gray-400">
                {page}
              </span>
            )}
          </li>
        ))}

        {currentPage < totalPages && (
          <li>
            <Link
              href={createPageUrl(currentPage + 1)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              aria-label="次のページ"
            >
              →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
} 