'use client';

import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

interface RecommendedPostsProps {
  posts: BlogPost[];
  currentPostId: string;
  maxPosts?: number;
}

export default function RecommendedPosts({
  posts,
  currentPostId,
  maxPosts = 3
}: RecommendedPostsProps) {
  const filteredPosts = posts.filter(post => post.id !== currentPostId);

  const recommendedPosts = filteredPosts
    .filter(post => post.published_at)
    .sort((a, b) => {
      // Sort by views in descending order
      return (b.views || 0) - (a.views || 0);
    })
    .slice(0, maxPosts);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">おすすめの記事</h2>
      <div className="space-y-4">
        {recommendedPosts.map(post => (
          <div key={post.id} className="border-b pb-4">
            <Link href={`/blog/${post.slug}`}>
              <h3 className="text-lg font-semibold hover:text-blue-600">{post.title}</h3>
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(post.published_at!).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 