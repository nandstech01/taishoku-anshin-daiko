'use client';

import { useEffect, useState, memo } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/supabase';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { pageCache } from '../../../lib/cache';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  post_count?: number;
}

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        関連カテゴリの読み込みに失敗しました
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

const CategoryCard = memo(({ category }: { category: Category }) => (
  <Link
    href={`/blog/category/${category.slug}`}
    className="block group"
  >
    <div className="bg-white rounded-lg border border-gray-100 p-6 transition-all duration-200 hover:border-orange-100 hover:shadow-md">
      <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
        {category.name}
      </h3>
      {category.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {category.description}
        </p>
      )}
      <span className="text-xs text-gray-500">
        {category.post_count}件の記事
      </span>
    </div>
  </Link>
));

CategoryCard.displayName = 'CategoryCard';

function CategoriesGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {categories.map((category) => (
        <Suspense
          key={category.slug}
          fallback={
            <div className="bg-white rounded-lg border border-gray-100 p-6 animate-pulse">
              <div className="h-6 bg-gray-100 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-full mb-4" />
              <div className="h-4 bg-gray-100 rounded w-1/4" />
            </div>
          }
        >
          <CategoryCard category={category} />
        </Suspense>
      ))}
    </div>
  );
}

export default function RelatedCategories({ currentCategoryId }: { currentCategoryId: number }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRelatedCategories = async () => {
      setIsLoading(true);
      setError(null);

      // キャッシュキーの生成
      const cacheKey = `related-categories:${currentCategoryId}`;
      
      // キャッシュをチェック
      const cachedCategories = pageCache.get<Category[]>(cacheKey);
      if (cachedCategories) {
        setCategories(cachedCategories);
        setIsLoading(false);
        return;
      }

      const supabase = createClient();
      
      try {
        const { data: categoriesWithCount, error } = await supabase
          .from('categories')
          .select(`
            id,
            name,
            slug,
            description,
            posts!inner (id)
          `)
          .neq('id', currentCategoryId)
          .order('name');

        if (error) throw error;

        const formattedCategories = (categoriesWithCount || []).map(category => ({
          ...category,
          post_count: category.posts?.length || 0
        }))
        .sort((a, b) => (b.post_count || 0) - (a.post_count || 0))
        .slice(0, 3);

        // データをキャッシュに保存
        pageCache.set(cacheKey, formattedCategories);
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching related categories:', error);
        setError(error instanceof Error ? error : new Error('関連カテゴリの取得に失敗しました'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedCategories();
  }, [currentCategoryId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
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

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-gray-100 pt-12">
      <h2 className="text-xl font-bold text-center mb-8">関連カテゴリ</h2>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <CategoriesGrid categories={categories} />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
} 