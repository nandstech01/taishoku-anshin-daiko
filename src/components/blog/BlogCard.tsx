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
  return (
    <Link href={post?.slug ? `/blog/${post.slug}` : href || '#'}>
      <article className="blog-card">
        {post?.thumbnail_url && (
          <div className="blog-card-image">
            <Image
              src={post.thumbnail_url}
              alt={post.title}
              width={600}
              height={338}
              className="object-cover"
            />
          </div>
        )}
        <div className="blog-card-content">
          {post?.category && (
            <span className="blog-card-category">
              {post.category.name}
            </span>
          )}
          <h3 className="blog-card-title">
            {post?.title || title}
          </h3>
          <time className="blog-card-meta">
            {post?.created_at ? new Date(post.created_at).toLocaleDateString('ja-JP') : date}
          </time>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard; 