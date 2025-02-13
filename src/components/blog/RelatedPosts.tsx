'use client';

import React from 'react';
import { usePostsStore } from '@/stores/posts';
import BlogCard from '@/components/blog/BlogCard';
import { BlogPost, Post } from '@/types/blog';

interface RelatedPostsProps {
  currentPostSlug: string;
  maxPosts?: number;
}

const convertPostToBlogPost = (post: Post): BlogPost => ({
  ...post,
  description: post.meta_description || null,
  category_slug: post.category?.slug || null,
  views: post.view_count || 0,
  tags: post.tags || null,
  seo_keywords: post.seo_keywords || null,
  thumbnail_url: post.thumbnail_url || '',
  thumbnail_variants: null,
  category: post.category || null,
  status: post.status,
  published_at: post.published_at || null,
  category_id: post.category_id
});

const convertBlogPostToPost = (post: BlogPost): Post => ({
  id: post.id,
  title: post.title,
  content: post.content,
  slug: post.slug,
  status: post.status as 'draft' | 'published',
  meta_description: post.description || undefined,
  thumbnail_url: post.thumbnail_url,
  created_at: post.created_at,
  updated_at: post.updated_at,
  category_id: post.category_id,
  category: post.category || undefined,
  view_count: post.views,
  tags: post.tags || undefined,
  seo_keywords: post.seo_keywords || undefined,
  published_at: post.published_at
});

export default function RelatedPosts({ currentPostSlug, maxPosts = 3 }: RelatedPostsProps) {
  const { posts } = usePostsStore();
  const relatedPosts = posts
    .filter(post => post.slug !== currentPostSlug)
    .slice(0, maxPosts)
    .map(convertPostToBlogPost)
    .map(convertBlogPostToPost);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="blog-latest max-w-7xl mx-auto mb-16">
      <h2 className="text-xl font-bold text-center mb-8 relative pb-3">
        おすすめの記事
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
} 