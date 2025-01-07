'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/blog';

interface BlogCardProps {
  post?: Post;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  date?: string;
  href?: string;
}

const BlogCard = ({ post, title, description, thumbnailUrl, date, href }: BlogCardProps) => {
  if (post) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          <p className="text-gray-600 mb-4">{post.content.substring(0, 150)}...</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString()}
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
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {thumbnailUrl && (
        <div className="relative h-48">
          <Image
            src={thumbnailUrl}
            alt={title || ''}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {date && new Date(date).toLocaleDateString()}
          </span>
          {href && (
            <Link
              href={href}
              className="text-indigo-600 hover:text-indigo-500"
            >
              続きを読む
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard; 