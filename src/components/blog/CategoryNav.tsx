'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BLOG_CATEGORIES } from '@/mock/categories';
import type { Category } from '@/types/blog';

export function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-8">
      <h2 className="text-lg font-semibold mb-4">カテゴリー</h2>
      <ul className="space-y-2">
        {BLOG_CATEGORIES.map((category: Category) => {
          const isActive = pathname.includes(`/category/${category.slug}`);
          return (
            <li key={category.id}>
              <Link
                href={`/blog/category/${category.slug}`}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
} 