'use client';

import React from 'react';
import Link from 'next/link';
import { Post } from '@/types/blog';

interface BlogCardProps {
  post: Post;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.content.substring(0, 150)}...</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(post.published_at || post.created_at).toLocaleDateString()}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-indigo-600 hover:text-indigo-500"
          >
            続きを読む
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard; 