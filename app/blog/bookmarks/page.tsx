'use client';

import type { Bookmark } from '@/types/blog';
import { MOCK_BOOKMARKS } from '@/mock/bookmarks';
import BlogCard from '@/components/blog/BlogCard';

export default function BookmarksPage() {
  const sortedBookmarks = [...MOCK_BOOKMARKS].sort(
    (a: Bookmark, b: Bookmark) =>
      new Date(b.created).getTime() - new Date(a.created).getTime()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ブックマーク
          </h1>
          <p className="text-gray-600">
            保存した記事の一覧です。
          </p>
        </header>

        <div className="space-y-8">
          {sortedBookmarks.map((bookmark) => (
            bookmark.post && <BlogCard key={bookmark.id} post={bookmark.post} />
          ))}
          {sortedBookmarks.length === 0 && (
            <p className="text-center text-gray-600">
              ブックマークした記事はありません。
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 