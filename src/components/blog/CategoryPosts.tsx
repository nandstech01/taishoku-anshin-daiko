'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/supabase';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { pageCache } from '../../../lib/cache';

interface Post {
  slug: string;
  title: string;
  meta_description: string;
  thumbnail_url: string;
  created_at: string;
  view_count?: number;
}

type SortOption = {
  label: string;
  value: string;
  column: string;
  ascending: boolean;
};

const sortOptions: SortOption[] = [
  { label: '新着順', value: 'newest', column: 'created_at', ascending: false },
  { label: '古い順', value: 'oldest', column: 'created_at', ascending: true },
  { label: '閲覧数順', value: 'popular', column: 'view_count', ascending: false },
];

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        記事の読み込みに失敗しました
      </h2>
      <p className="text-gray-600 mb-6">
        {error.message}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
      >
        再読み込み
      </button>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => (
        <div className="blog-card">
          <div className="p-4">
            <p className="text-sm text-red-600">画像の読み込みに失敗しました: {error.message}</p>
          </div>
        </div>
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="blog-card"
      >
        <div className="blog-card-image">
          {post.thumbnail_url ? (
            <Suspense fallback={<div className="w-full h-full bg-gray-100 animate-pulse" />}>
              <Image
                src={post.thumbnail_url}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMi4xODY6Nzg2OjEwRUZGSVNWW1xbN0FVbWVabFNbW1v/2wBDARUXFx4aHRkeHjtlMiU5W1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1v/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                onError={(e) => {
                  throw new Error('画像の読み込みに失敗しました');
                }}
              />
            </Suspense>
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>
        <div className="blog-card-content">
          <h2 className="blog-card-title">
            {post.title}
          </h2>
          <p className="blog-card-excerpt">
            {post.meta_description}
          </p>
          <div className="flex justify-between items-center">
            <time className="blog-card-meta">
              {new Date(post.created_at).toLocaleDateString('ja-JP')}
            </time>
            {post.view_count !== undefined && (
              <span className="text-xs text-gray-500">
                {post.view_count} views
              </span>
            )}
          </div>
        </div>
      </Link>
    </ErrorBoundary>
  );
}

function PostsGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="blog-grid">
      {posts.map((post) => (
        <Suspense 
          key={post.slug}
          fallback={
            <div className="blog-card animate-pulse">
              <div className="blog-card-image bg-gray-100" />
              <div className="blog-card-content">
                <div className="h-6 bg-gray-100 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-100 rounded w-full mb-4" />
                <div className="h-4 bg-gray-100 rounded w-1/4" />
              </div>
            </div>
          }
        >
          <PostCard post={post} />
        </Suspense>
      ))}
    </div>
  );
}

export default function CategoryPosts({ slug }: { slug: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      // キャッシュキーの生成
      const cacheKey = `category-posts:${slug}:${sortBy}`;
      
      // キャッシュをチェック
      const cachedPosts = pageCache.get<Post[]>(cacheKey);
      if (cachedPosts) {
        setPosts(cachedPosts);
        setIsLoading(false);
        return;
      }

      const supabase = createClient();
      const currentSort = sortOptions.find(opt => opt.value === sortBy) || sortOptions[0];
      
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            slug,
            title,
            meta_description,
            thumbnail_url,
            created_at,
            view_count
          `)
          .eq('category.slug', slug)
          .eq('status', 'published')
          .order(currentSort.column, { ascending: currentSort.ascending });

        if (error) throw error;
        
        // データをキャッシュに保存
        if (data) {
          pageCache.set(cacheKey, data);
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error instanceof Error ? error : new Error('記事の取得に失敗しました'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [slug, sortBy]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          エラーが発生しました
        </h2>
        <p className="text-gray-600 mb-6">
          {error.message}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        >
          ページを再読み込み
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="block w-32 rounded-md border-gray-200 text-sm focus:border-orange-500 focus:ring-orange-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">
            このカテゴリの記事はまだありません。
          </p>
        </div>
      ) : (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<div>Loading...</div>}>
            <PostsGrid posts={posts} />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
} 