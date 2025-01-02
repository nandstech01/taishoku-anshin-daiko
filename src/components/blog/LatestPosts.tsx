'use client';

import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

interface LatestPostsProps {
  posts: BlogPost[];
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  const latestPosts = posts
    .filter(post => post.published_at)
    .sort((a, b) => new Date(b.published_at!).getTime() - new Date(a.published_at!).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-4">
      {latestPosts.map((post) => (
        <div key={post.slug} className="bg-white p-4 rounded-lg shadow">
          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
              {post.title}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-gray-500">
            {post.excerpt}
          </p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <time dateTime={post.published_at || ''}>
              {post.published_at ? new Date(post.published_at).toLocaleDateString() : '未公開'}
            </time>
            <span className="mx-2">·</span>
            <span>{post.views} 閲覧</span>
          </div>
        </div>
      ))}
    </div>
  );
} 