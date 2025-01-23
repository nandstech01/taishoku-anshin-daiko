import React from 'react';
import Link from 'next/link';
import { Post } from '@/types/blog';

interface RelatedTagsProps {
  currentTag: string;
  posts: Post[];
  maxTags?: number;
}

export const RelatedTags: React.FC<RelatedTagsProps> = ({ 
  currentTag, 
  posts,
  maxTags = 5
}) => {
  // 関連タグの収集と集計
  const relatedTags = React.useMemo(() => {
    const tags = posts
      .flatMap(post => post.seo_keywords || [])
      .filter(tag => tag !== currentTag)
      .reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(tags)
      .sort(([,a], [,b]) => b - a)
      .slice(0, maxTags);
  }, [posts, currentTag, maxTags]);

  if (relatedTags.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 mb-4">
      <h2 className="text-xl font-bold mb-4">関連タグ</h2>
      <div className="flex flex-wrap gap-2">
        {relatedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/blog/tags/${encodeURIComponent(tag)}`}
            className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 transition-colors"
          >
            {tag}
            <span className="ml-1 text-gray-500">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}; 