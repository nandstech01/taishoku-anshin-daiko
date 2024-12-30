'use client';

import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

interface RecommendedPostsProps {
  posts: BlogPost[];
  maxPosts?: number;
}

export default function RecommendedPosts({
  posts,
  maxPosts = 3,
}: RecommendedPostsProps) {
  const recommendedPosts = posts
    .filter(post => post.publishedAt)
    .sort((a, b) => {
      // Sort by views in descending order
      return (b.views || 0) - (a.views || 0);
    })
    .slice(0, maxPosts);

  if (recommendedPosts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {recommendedPosts.map((post) => (
        <div key={post.slug} className="bg-white p-4 rounded-lg shadow">
          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
              {post.title}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-gray-500">{post.excerpt}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <time dateTime={post.publishedAt || ''}>
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '未公開'}
            </time>
            <span className="mx-2">·</span>
            <span>{post.views} 閲覧</span>
          </div>
        </div>
      ))}
    </div>
  );
} 