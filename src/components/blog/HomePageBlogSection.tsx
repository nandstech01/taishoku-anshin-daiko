'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { PostgrestResponse } from '@supabase/supabase-js';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: string;
  views: number;
  tags: string[];
  seo_keywords: string[];
  likes: number;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
  thumbnail_url: string | null;
  meta_description: string | null;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

interface RawPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: string;
  views: number | null;
  tags: string[] | null;
  likes: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
  thumbnail_url: string | null;
  meta_description: string | null;
  seo_keywords: string[] | null;
  category: Array<{
    id: number;
    name: string;
    slug: string;
  }> | null;
}

const supabase = createClient();

export default function HomePageBlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // まず投稿データを取得
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select(`
            id,
            title,
            content,
            slug,
            status,
            views,
            tags,
            likes,
            published_at,
            created_at,
            updated_at,
            thumbnail_url,
            meta_description,
            seo_keywords,
            category_slug
          `)
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (postsError) {
          console.error('Posts fetch error:', postsError);
          throw postsError;
        }
        console.log('Fetched posts:', postsData);

        // カテゴリーデータを取得
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .returns<Array<{ id: number; name: string; slug: string; }>>();

        if (categoriesError) {
          console.error('Categories fetch error:', categoriesError);
          throw categoriesError;
        }
        console.log('Fetched categories:', categoriesData);

        // 投稿データとカテゴリーデータを結合
        const typedPostsData = postsData?.map((post: any): BlogPost => {
          const category = categoriesData?.find(cat => cat.slug === post.category_slug);
          return {
            id: post.id,
            title: post.title,
            content: post.content,
            slug: post.slug,
            status: post.status,
            views: post.views ?? 0,
            tags: post.tags ?? [],
            likes: post.likes ?? 0,
            published_at: post.published_at,
            created_at: post.created_at,
            updated_at: post.updated_at,
            thumbnail_url: post.thumbnail_url,
            meta_description: post.meta_description,
            seo_keywords: post.seo_keywords ?? [],
            category: category ? {
              id: Number(category.id),
              name: String(category.name),
              slug: String(category.slug)
            } : undefined
          };
        }) || [];

        setPosts(typedPostsData);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // タグ一覧を取得（全記事のタグを結合して重複を除去）
  const allTags = Array.from(new Set(
    posts.flatMap(post => 
      (post.seo_keywords || []).map(keyword => ({
        name: keyword,
        slug: keyword.toLowerCase().replace(/\s+/g, '-')
      }))
    )
  )).filter(Boolean);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16">
      {/* NEW POSTS */}
      <section className="blog-latest max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-xl font-bold text-center mb-8 relative pb-3">
          NEW POSTS
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 6).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {post.thumbnail_url && (
                  <div className="aspect-w-16 aspect-h-9">
                    <Image
                      src={post.thumbnail_url}
                      alt={post.title}
                      width={600}
                      height={338}
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  {post.category && (
                    <span className="blog-category mb-2">
                      {post.category.name}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <time className="text-sm text-gray-500">
                    {new Date(post.published_at || post.created_at).toLocaleDateString('ja-JP')}
                  </time>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="blog-categories max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-xl font-bold text-center mb-8 relative pb-3">
          CATEGORIES
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog/category/${category.slug}`}
              className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* TAGS */}
      <section className="blog-tags-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-xl font-bold text-center mb-8 relative pb-3">
          TAGS
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"></span>
        </h2>
        <div className="blog-tags flex flex-wrap gap-2 justify-center">
          {allTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/blog/tag/${tag.slug}`}
              className="blog-tag"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </section>

      {/* キャリアサポートのお知らせ */}
      <section className="blog-career max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-center mb-8 relative pb-3">
          キャリアサポートのお知らせ
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"></span>
        </h2>
        <Link href="https://nands.tech/" target="_blank" rel="noopener noreferrer" className="block">
          <div className="blog-career-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <Image
              src="/images/career-support.jpg"
              alt="Career Support"
              width={600}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-center">
              <p className="text-gray-700 leading-relaxed">
                退職あんしん代行を運営する「株式会社エヌアンドエス」では、
                AI時代に合わせた副業・リスキリング支援プログラムを開始しました。
                退職後のキャリア形成を一緒に考えませんか？
              </p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
} 