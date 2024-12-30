'use client';

import React, { useState } from 'react';

interface ArticleRatingProps {
  postId: string;
  initialLikes?: number;
}

export function ArticleRating({ postId, initialLikes = 0 }: ArticleRatingProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      setIsAnimating(true);
      
      // アニメーション終了後にフラグをリセット
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);

      // ここで実際のAPIコールを行う（今回はモックのみ）
      // await fetch('/api/posts/${postId}/like', { method: 'POST' });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 my-8 py-8 border-t border-b border-gray-200">
      <p className="text-sm text-gray-600">この記事は参考になりましたか？</p>
      <button
        onClick={handleLike}
        disabled={hasLiked}
        className={`group relative inline-flex flex-col items-center gap-1 p-3 rounded-full
          ${hasLiked
            ? 'cursor-default'
            : 'hover:bg-orange-50 cursor-pointer'
          }`}
      >
        <div
          className={`relative transition-transform ${
            isAnimating ? 'animate-bounce' : ''
          }`}
        >
          <svg
            className={`w-8 h-8 ${
              hasLiked ? 'text-orange-500' : 'text-gray-400 group-hover:text-orange-500'
            } transition-colors`}
            fill={hasLiked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={hasLiked ? 0 : 2}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
        </div>
        <span className={`text-sm ${hasLiked ? 'text-orange-500' : 'text-gray-500'}`}>
          {likes}
        </span>
        {hasLiked && (
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-sm text-orange-500 whitespace-nowrap">
            ありがとうございます！
          </span>
        )}
      </button>
    </div>
  );
} 