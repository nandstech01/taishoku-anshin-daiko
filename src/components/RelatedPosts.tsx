'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Database } from '@/lib/supabase/database.types';
import { createClient } from '@/lib/supabase/supabase';
import React from 'react';

type Post = Database['public']['Tables']['posts']['Row'] & {
  description?: string;
  thumbnail_url?: string;
  category_slug?: string;
  status: string;
  views: number;
  tags?: string[];
  seo_keywords?: string[];
  category?: {
    id: number;
    name: string;
    slug: string;
  };
};

type Props = {
  relatedPosts: Post[];
  currentPostId?: string;
  maxPosts?: number;
};

export default function RelatedPosts({ 
  relatedPosts, 
  currentPostId, 
  maxPosts = 12  // デフォルトを12に設定
}: Props) {
  const [categories, setCategories] = React.useState<Array<{ id: number; name: string; slug: string }>>([]);
  const [allTags, setAllTags] = React.useState<Array<{ name: string; slug: string }>>([]);

  // 表示する記事を最大maxPosts件に制限
  const displayPosts = relatedPosts.slice(0, maxPosts);

  React.useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      // カテゴリーの取得
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (categoriesData) {
        setCategories(categoriesData);
      }

      // タグの取得
      const { data: postsData } = await supabase
        .from('posts')
        .select('seo_keywords')
        .not('seo_keywords', 'is', null);

      if (postsData) {
        // 全タグを抽出して重複を除去
        const tags = new Set<string>();
        postsData.forEach(post => {
          if (post.seo_keywords) {
            post.seo_keywords.forEach((tag: string) => {
              if (tag) tags.add(tag.trim());
            });
          }
        });

        // タグをオブジェクトの配列に変換
        const formattedTags = Array.from(tags).map(tag => ({
          name: tag,
          slug: encodeURIComponent(tag.toLowerCase().trim())
        }));

        setAllTags(formattedTags);
      }
    };

    fetchData();
  }, []);

  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  return (
    <>
      <section className="mt-16">
        <h2 className="text-xl font-bold text-center mb-8 relative pb-3">
          関連記事
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="blog-card">
                <div className="relative w-full pt-[56.25%] mb-4">
                  <Image
                    src={post.thumbnail_url || '/images/default-thumbnail.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="blog-card-content">
                  {post.category && (
                    <span className="blog-card-category">
                      {post.category.name}
                    </span>
                  )}
                  <h3 className="blog-card-title">
                    {post.title}
                  </h3>
                  <time className="blog-card-meta">
                    {post.created_at ? new Date(post.created_at).toLocaleDateString('ja-JP') : '未公開'}
                  </time>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* カテゴリーセクション */}
      <section className="mt-16">
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

      {/* タグセクション */}
      <section className="mt-16">
        <h2 className="text-xl font-bold text-center mb-8 relative pb-3">
          TAGS
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"></span>
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {allTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/blog/tags/${tag.slug}`}
              className="blog-tag inline-block px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
} 