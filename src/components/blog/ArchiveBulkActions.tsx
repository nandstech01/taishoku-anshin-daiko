'use client';

import React, { useState } from 'react';

interface ArchiveBulkActionsProps {
  selectedPosts: string[];
  onClearSelection: () => void;
  onRemoveSelected: () => void;
}

export function ArchiveBulkActions({
  selectedPosts,
  onClearSelection,
  onRemoveSelected,
}: ArchiveBulkActionsProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (selectedPosts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {selectedPosts.length}件選択中
            </span>
            <button
              onClick={onClearSelection}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              選択を解除
            </button>
          </div>
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              選択した記事をアーカイブから削除
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-red-600">
                選択した{selectedPosts.length}件の記事を削除してもよろしいですか？
              </span>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                キャンセル
              </button>
              <button
                onClick={() => {
                  onRemoveSelected();
                  setShowConfirm(false);
                }}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                削除する
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 