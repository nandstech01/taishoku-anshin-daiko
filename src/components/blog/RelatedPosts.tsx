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
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">おすすめの記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
} 