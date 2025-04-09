'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase';

interface DatabaseCategory {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface DatabasePost {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  thumbnail_url: string | null;
  created_at: string;
  published_at: string | null;
  category_slug: string;
  status: string;
}

interface Post {
  slug: string;
  title: string;
  meta_description: string;
  thumbnail_url: string;
  created_at: string;
  published_at: string | null;
}

type SortOption = {
  label: string;
  value: string;
  column: keyof DatabasePost;
  ascending: boolean;
};

const sortOptions: SortOption[] = [
  { label: '新着順', value: 'newest', column: 'created_at', ascending: false },
  { label: '古い順', value: 'oldest', column: 'created_at', ascending: true }
];

export default function CategoryPosts({ slug }: { slug: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [category, setCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentSort = useMemo(() => 
    sortOptions.find(opt => opt.value === sortBy) || sortOptions[0],
    [sortBy]
  );

  const fetchCategoryAndPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const supabase = createClient();
    
    try {
      const decodedSlug = decodeURIComponent(slug);
      
      // カテゴリの存在を確認
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', decodedSlug)
        .single<DatabaseCategory>();

      if (categoryError) {
        throw new Error('カテゴリの取得中にエラーが発生しました');
      }

      if (!categoryData) {
        throw new Error('カテゴリが見つかりません');
      }

      const category: Category = {
        id: String(categoryData.id),
        name: String(categoryData.name),
        slug: String(categoryData.slug)
      };

      setCategory(category);
      
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .eq('category_slug', categoryData.slug)
        .eq('status', 'published')
        .order(currentSort.column, { ascending: currentSort.ascending });

      if (postsError) {
        throw new Error('記事の取得中にエラーが発生しました');
      }

      const processedPosts: Post[] = (postsData || []).map(post => ({
        slug: String(post.slug),
        title: String(post.title),
        meta_description: String(post.meta_description || ''),
        thumbnail_url: String(post.thumbnail_url || ''),
        created_at: String(post.created_at),
        published_at: post.published_at ? String(post.published_at) : null
      }));

      setPosts(processedPosts);
    } catch (error) {
      console.error('Error in fetchCategoryAndPosts:', error);
      setError(error instanceof Error ? error.message : 'エラーが発生しました');
      setCategory(null);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, [slug, currentSort]);

  useEffect(() => {
    fetchCategoryAndPosts();
  }, [fetchCategoryAndPosts]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">カテゴリが見つかりません</h1>
        <p className="text-gray-600">
          お探しのカテゴリページは存在しません。
        </p>
        <Link href="/blog" className="text-orange-600 hover:text-orange-700 mt-4 inline-block">
          ブログトップへ戻る
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h1>
        <p className="text-gray-600">
          {category.name}に関する記事の一覧です。
        </p>
      </div>
      
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card"
            >
              <div className="blog-card-image">
                {post.thumbnail_url ? (
                  <Image
                    src={post.thumbnail_url}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={posts.indexOf(post) === 0}
                    className="object-cover"
                  />
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
                  <time className="blog-card-meta" dateTime={post.published_at || post.created_at}>
                    {new Date(post.published_at || post.created_at).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    }).replace(/\//g, '/')}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 