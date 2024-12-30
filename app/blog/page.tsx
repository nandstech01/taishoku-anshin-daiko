'use client';

import { useEffect, useState } from 'react';
import type { BlogPost } from '@/types/blog';
import { supabase } from '@/lib/supabase';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts...');
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            category:categories(name)
          `)
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching posts:', error);
          throw error;
        }
        
        console.log('Fetched posts:', data);
        setPosts(data || []);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">記事一覧</h1>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">記事がありません</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white shadow rounded-lg overflow-hidden">
              {post.thumbnail_url && (
                <div className="relative aspect-[2/1]">
                  <img
                    src={post.thumbnail_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                {post.category && (
                  <div className="text-sm text-blue-600 mb-2">
                    {post.category.name}
                  </div>
                )}
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  <a
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </a>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.meta_description || post.content.slice(0, 150)}
                </p>
                <div className="flex items-center justify-between">
                  <time className="text-sm text-gray-500">
                    {new Date(post.published_at || post.created_at).toLocaleDateString('ja-JP')}
                  </time>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    続きを読む →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
} 