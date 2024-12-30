'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

const MAX_HISTORY = 5;

export function ViewHistory() {
  const [viewHistory, setViewHistory] = useState<BlogPost[]>([]);

  useEffect(() => {
    const history = localStorage.getItem('viewHistory');
    if (history) {
      setViewHistory(JSON.parse(history));
    }
  }, []);

  if (viewHistory.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">閲覧履歴</h2>
      <div className="space-y-4">
        {viewHistory.map((post) => (
          <article key={post.slug} className="group">
            <Link
              href={`/blog/${post.slug}`}
              className="block p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
                {post.title}
              </h3>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <time dateTime={post.published_at || ''}>
                  {post.published_at ? new Date(post.published_at).toLocaleDateString() : '未公開'}
                </time>
                <span className="mx-2">·</span>
                <span>{post.views} 閲覧</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
} 