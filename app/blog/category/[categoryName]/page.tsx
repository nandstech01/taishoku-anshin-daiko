'use client';

import React from 'react';
import { usePostsStore } from '@/stores/posts';
import Breadcrumb from '@/components/blog/Breadcrumb';
import BlogCard from '@/components/blog/BlogCard';

export default function CategoryPage({ params }: { params: { categoryName: string } }) {
  const { posts } = usePostsStore();
  const categoryPosts = posts.filter(post => post.category.slug === params.categoryName);
  const category = categoryPosts[0]?.category;

  if (!category) {
    return <div>カテゴリーが見つかりません</div>;
  }

  const breadcrumbItems = [
    { label: 'ブログ', href: '/blog' },
    { label: category.name, href: '#' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <h1 className="text-3xl font-bold mt-8 mb-6">{category.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
} 