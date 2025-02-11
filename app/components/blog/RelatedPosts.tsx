'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost, BlogPostWithRelated } from '@/types/blog';

interface RelatedPostsProps {
  currentPost: BlogPostWithRelated;
  maxPosts?: number;
}

export default function RelatedPosts({
  currentPost,
  maxPosts = 3,
}: RelatedPostsProps) {
  const relatedPosts = currentPost.relatedPosts?.filter(
    (post) => post.published_at
  ).slice(0, maxPosts) || [];

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-xl font-bold text-center mb-8 relative pb-3">
        関連記事
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <article className="blog-card">
              {post.thumbnail_url && (
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
                {post.category && (
                  <span className="blog-card-category">
                    {post.category.name}
                  </span>
                )}
                <h3 className="blog-card-title">
                  {post.title}
                </h3>
                <time className="blog-card-meta">
                  {post.published_at ? new Date(post.published_at).toLocaleDateString('ja-JP') : '未公開'}
                </time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}