'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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

  const content = (
    <>
      {post?.thumbnail_url && (
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
        {post?.category && (
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 mb-2 block"
          >
            {post.category.name}
          </Link>
        )}
        <h3 className="text-xl font-semibold mb-2">{post?.title || title}</h3>
        <p className="text-gray-600 mb-4">
          {post?.description || description || post?.content?.substring(0, 150)}...
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {post?.created_at ? formatDate(post.created_at) : date && formatDate(date)}
          </span>
          {(post?.slug || href) && (
            <Link
              href={post?.slug ? `/blog/${post.slug}` : href || '#'}
              className="text-indigo-600 hover:text-indigo-500"
            >
              続きを読む
            </Link>
          )}
        </div>
      </div>
    </>
  );

  const linkProps = post?.slug || href ? {
    href: post?.slug ? `/blog/${post.slug}` : href || '#',
    className: "block"
  } : null;

  return (
    <motion.div
      className="bg-white shadow rounded-lg overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {linkProps ? (
        <Link {...linkProps}>
          {content}
        </Link>
      ) : (
        content
      )}
    </motion.div>
  );
};

export default BlogCard; 