'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface RelatedPostsProps {
  popularPosts: any[];
  recentPosts: any[];
  columnPosts: any[];
  currentPostId: string;
}

export default function RelatedPosts({ popularPosts, recentPosts, columnPosts, currentPostId }: RelatedPostsProps) {
  return (
    <div className="blog-related">
      <h2 className="blog-related-title">関連記事</h2>
      <div className="blog-related-grid">
        {/* 人気記事 */}
        {popularPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="blog-related-card">
              {post.thumbnail_url && (
                <Image
                  src={post.thumbnail_url}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              )}
              <h3>{post.title}</h3>
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 