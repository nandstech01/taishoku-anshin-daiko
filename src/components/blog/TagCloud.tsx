'use client';

import React from 'react';
import { mockPosts } from '@/mock/posts';

const allTags = mockPosts.reduce((tags, post) => {
  post.tags.forEach(tag => {
    tags[tag] = (tags[tag] || 0) + 1;
  });
  return tags;
}, {} as Record<string, number>);

export default function TagCloud() {
  return (
    <div className="space-x-2">
      {Object.entries(allTags).map(([tag, count]) => (
        <span
          key={tag}
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          {`${tag} (${count})`}
        </span>
      ))}
    </div>
  );
} 