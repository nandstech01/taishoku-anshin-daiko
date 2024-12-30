'use client';

import React, { useState, useEffect } from 'react';

interface RatingSystemProps {
  postId: string;
}

export function RatingSystem({ postId }: RatingSystemProps) {
  const [hasRated, setHasRated] = useState(false);
  const [rating, setRating] = useState<'helpful' | 'not_helpful' | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating_${postId}`);
    if (savedRating) {
      setHasRated(true);
      setRating(savedRating as 'helpful' | 'not_helpful');
    }
  }, [postId]);

  const handleRating = (value: 'helpful' | 'not_helpful') => {
    setRating(value);
    setHasRated(true);
    localStorage.setItem(`rating_${postId}`, value);

    if (value === 'not_helpful') {
      setShowFeedbackForm(true);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで実際のフィードバック送信処理を実装
    console.log('Feedback submitted:', feedback);
    setShowFeedbackForm(false);
    setFeedback('');
  };

  if (hasRated && !showFeedbackForm) {
    return (
      <div className="my-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-center text-gray-600">
          {rating === 'helpful'
            ? 'ご評価ありがとうございます！'
            : 'フィードバックありがとうございます。より良い記事作りに活用させていただきます。'}
        </p>
      </div>
    );
  }

  return (
    <div className="my-8 p-4 bg-gray-50 rounded-lg">
      {!hasRated && (
        <div className="text-center">
          <p className="text-gray-600 mb-4">この記事は参考になりましたか？</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleRating('helpful')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              はい
            </button>
            <button
              onClick={() => handleRating('not_helpful')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5 0v2a2 2 0 01-2 2h-2.5"
                />
              </svg>
              いいえ
            </button>
          </div>
        </div>
      )}

      {showFeedbackForm && (
        <form onSubmit={handleFeedbackSubmit} className="mt-4">
          <p className="text-gray-600 mb-2">
            改善のためのフィードバックをお聞かせください：
          </p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={4}
            placeholder="例：情報が不足している、説明が分かりにくい、など"
            required
          />
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowFeedbackForm(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              スキップ
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              送信
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 