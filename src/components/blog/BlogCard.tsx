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
  // 日付フォーマットを統一する関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (post) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {post.thumbnail_url && (
          <div className="relative h-48">
            <Image
              src={post.thumbnail_url}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover w-auto h-auto"
            />
          </div>
        )}
        <div className="p-6">
          {post.category && (
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 mb-2 block"
            >
              {post.category.name}
            </Link>
          )}
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          <p className="text-gray-600 mb-4">
            {post.description || post.content?.substring(0, 150)}...
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {formatDate(post.created_at)}
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
            className="object-cover w-auto h-auto"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {date && formatDate(date)}
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