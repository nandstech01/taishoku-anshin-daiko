'use client';

import React from 'react';
import { usePostsStore } from '@/stores/posts';
import BlogCard from '@/components/blog/BlogCard';
import { BlogPostWithAuthor } from '@/types/blog';

interface RelatedPostsProps {
  currentPostSlug: string;
  maxPosts?: number;
}

export default function RelatedPosts({ currentPostSlug, maxPosts = 3 }: RelatedPostsProps) {
  const { posts } = usePostsStore();
  const relatedPosts = posts
    .filter(post => post.slug !== currentPostSlug)
    .slice(0, maxPosts) as BlogPostWithAuthor[];

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