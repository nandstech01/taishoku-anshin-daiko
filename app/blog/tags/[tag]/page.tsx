'use client';

import React from 'react';
import { usePostsStore } from '@/stores/posts';
import Breadcrumb from '@/components/blog/Breadcrumb';
import BlogCard from '@/components/blog/BlogCard';

export default function TagPage({ params }: { params: { tag: string } }) {
  const { posts } = usePostsStore();
  const tagPosts = posts.filter(post => post.tags?.includes(params.tag));

  const breadcrumbItems = [
    { label: 'ブログ', href: '/blog' },
    { label: `#${params.tag}`, href: '#' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <h1 className="text-3xl font-bold mt-8 mb-6">
        #{params.tag}の記事
      </h1>
      
      {tagPosts.length === 0 ? (
        <p className="text-gray-600">
          このタグの記事は見つかりませんでした。
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tagPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
} 