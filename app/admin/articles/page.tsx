'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import { supabase } from '@/lib/supabase';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching articles:', error);
          throw error;
        }

        setArticles(data || []);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (slug: string) => {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('slug', slug);

      if (error) throw error;

      // 記事一覧を更新
      setArticles(articles.filter(article => article.slug !== slug));
      alert('記事を削除しました');
    } catch (error) {
      console.error('Failed to delete article:', error);
      alert('記事の削除に失敗しました');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">記事一覧</h1>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          新規作成
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        {articles.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500">
            記事がありません
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {articles.map((article) => (
              <li key={article.slug} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">{article.title}</h2>
                    <p className="mt-1 text-sm text-gray-500">{article.description}</p>
                    <p className="mt-1 text-xs text-gray-400">
                      {new Date(article.published_at || article.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Link
                      href={`/admin/articles/${article.slug}/edit`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      編集
                    </Link>
                    <button
                      onClick={() => handleDelete(article.slug)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 