'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Comment, Author } from '@/types/blog';

interface CommentsProps {
  postId: string;
  comments: Comment[];
}

interface CommentFormProps {
  postId: string;
  replyTo?: string;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
}

function CommentForm({ postId, replyTo, onSubmit, onCancel }: CommentFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={replyTo ? "返信を入力..." : "コメントを入力..."}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        rows={3}
      />
      <div className="mt-2 flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            キャンセル
          </button>
        )}
        <button
          type="submit"
          disabled={!content.trim()}
          className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {replyTo ? "返信する" : "コメントする"}
        </button>
      </div>
    </form>
  );
}

function CommentItem({ comment, onReply }: { comment: Comment; onReply: (commentId: string) => void }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isReported, setIsReported] = useState(comment.isReported);
  const [likes, setLikes] = useState(comment.likes);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => (prev || 0) + 1);
      setHasLiked(true);
    }
  };

  const handleReport = () => {
    if (!isReported) {
      setIsReported(true);
      alert('このコメントを報告しました。管理者が確認いたします。');
    }
  };

  return (
    <div className="py-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {comment.author?.avatar ? (
            <Image
              src={comment.author.avatar}
              alt={comment.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-sm">
                {comment.author?.name?.charAt(0) || '?'}
              </span>
            </div>
          )}
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{comment.author?.name || '匿名'}</span>
            <time className="text-sm text-gray-500">
              {new Date(comment.created_at).toLocaleDateString('ja-JP')}
            </time>
          </div>
          <p className="text-gray-700 mb-2">{comment.content}</p>
          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 ${
                hasLiked ? 'text-orange-500' : 'text-gray-500 hover:text-orange-500'
              }`}
            >
              <svg
                className="w-4 h-4"
                fill={hasLiked ? 'currentColor' : 'none'}
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
              <span>{likes}</span>
            </button>
            <button
              onClick={() => setShowReplyForm(true)}
              className="text-gray-500 hover:text-orange-500"
            >
              返信する
            </button>
            <button
              onClick={handleReport}
              className={`text-gray-500 hover:text-red-500 ${
                isReported ? 'text-red-500' : ''
              }`}
            >
              報告する
            </button>
          </div>
          {showReplyForm && (
            <CommentForm
              postId={comment.postSlug}
              replyTo={comment.id}
              onSubmit={(content) => {
                onReply(comment.id);
                setShowReplyForm(false);
              }}
              onCancel={() => setShowReplyForm(false)}
            />
          )}
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-12 mt-4 border-l-2 border-gray-100 pl-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Comments({ postId, comments }: CommentsProps) {
  const [localComments, setLocalComments] = useState(comments);

  const handleNewComment = (content: string) => {
    const newComment: Comment = {
      id: String(Date.now()),
      postSlug: postId,
      content,
      authorId: 'guest',
      author: {
        id: 'guest',
        name: "ゲストユーザー",
        email: "guest@example.com",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      likes: 0,
      isReported: false
    };
    setLocalComments([newComment, ...localComments]);
  };

  const handleReply = (parentId: string) => {
    // 実際のアプリケーションでは、ここでAPIを呼び出してコメントを保存します
    console.log('Reply to comment:', parentId);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">コメント</h2>
      <CommentForm postId={postId} onSubmit={handleNewComment} />
      <div className="mt-8 divide-y">
        {localComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
          />
        ))}
      </div>
    </div>
  );
} 