'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Database } from '@/lib/supabase/database.types';

type Post = Database['public']['Tables']['posts']['Row'] & {
  description?: string;
  thumbnail_url?: string;
  category_slug?: string;
  status: string;
  views: number;
  tags?: string[];
  seo_keywords?: string[];
  category?: {
    id: number;
    name: string;
    slug: string;
  };
};

type Props = {
  relatedPosts: Post[];
  currentPostId?: string;
};

export default function RelatedPosts({ relatedPosts, currentPostId }: Props) {
  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">関連記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link 
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src={post.thumbnail_url || '/images/default-thumbnail.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-orange-600 line-clamp-2">
                  {post.title}
                </h3>
                <div className="mt-2 text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString('ja-JP')}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 