'use client';

import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/supabase';
import { deleteImage } from '@/utils/supabase-storage';

type Post = {
  slug: string;
  title: string;
  status: string;
  category_slug: string | null;
  thumbnail_url: string | null;
  category: {
    slug: string;
    name: string;
  } | null;
  created_at: string;
  updated_at: string;
};

export default function PostsPage() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(slug, name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('記事の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (post: Post) => {
    if (!window.confirm('この記事を削除してもよろしいですか？')) {
      return;
    }

    setIsDeleting(true);
    try {
      // 記事の削除
      const { error: deleteError } = await supabase
        .from('posts')
        .delete()
        .eq('slug', post.slug);

      if (deleteError) throw deleteError;

      // サムネイル画像の削除
      if (post.thumbnail_url) {
        await deleteImage(post.thumbnail_url);
      }

      // 記事一覧を更新
      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('記事の削除に失敗しました');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">記事一覧</h1>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          新規作成
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {posts.map((post) => (
            <li key={post.slug} className="hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-medium text-gray-900">
                        {post.title}
                      </span>
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/posts/${post.slug}/edit`}
                          className="text-sm text-indigo-600 hover:text-indigo-900"
                        >
                          編集
                        </Link>
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          プレビュー ↗
                        </Link>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {post.category && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {post.category.name}
                        </span>
                      )}
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {post.status === 'published' ? '公開' : '下書き'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(post)}
                    disabled={isDeleting}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    削除
                  </button>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      作成日: {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      更新日: {new Date(post.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 