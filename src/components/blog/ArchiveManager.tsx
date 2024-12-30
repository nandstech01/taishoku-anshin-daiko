'use client';

import React, { useState, useEffect } from 'react';
import type { BlogPost } from '@/types/blog';
import { useArchive } from '@/hooks/useArchive';

interface ArchiveManagerProps {
  post: BlogPost;
}

export function ArchiveManager({ post }: ArchiveManagerProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { isArchived, addToArchive, removeFromArchive } = useArchive();
  const [isPostArchived, setIsPostArchived] = useState(false);

  useEffect(() => {
    setIsPostArchived(isArchived(post.slug));
  }, [post.slug, isArchived]);

  const handleArchive = () => {
    if (isPostArchived) {
      setShowConfirm(true);
      return;
    }

    if (addToArchive(post)) {
      setIsPostArchived(true);
    }
  };

  const handleRemove = () => {
    if (removeFromArchive(post.slug)) {
      setIsPostArchived(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="mt-8 border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          <h3 className="font-medium text-gray-900">
            {isPostArchived ? 'アーカイブ済み' : 'アーカイブに追加'}
          </h3>
        </div>
        <button
          onClick={handleArchive}
          className={`text-sm ${
            isPostArchived
              ? 'text-red-600 hover:text-red-700'
              : 'text-orange-600 hover:text-orange-700'
          }`}
        >
          {isPostArchived ? 'アーカイブから削除' : 'アーカイブに追加'}
        </button>
      </div>

      {isPostArchived && !showConfirm && (
        <p className="mt-2 text-sm text-gray-600">
          この記事はアーカイブに保存されています
        </p>
      )}

      {showConfirm && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-800 mb-4">
            アーカイブから削除してもよろしいですか？
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              キャンセル
            </button>
            <button
              onClick={handleRemove}
              className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
            >
              削除する
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 