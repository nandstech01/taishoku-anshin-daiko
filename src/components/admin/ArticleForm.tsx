'use client';

import React, { useState } from 'react';
import { BlogPost } from '@/types/blog';
import { uploadImage, deleteImage } from '@/utils/supabase-storage';
import ImageUploader from './ImageUploader';

interface ArticleFormProps {
  post?: Partial<BlogPost>;
  onSubmit: (data: Partial<BlogPost>) => void;
}

export default function ArticleForm({ post, onSubmit }: ArticleFormProps) {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    category: post?.category,
    tags: post?.tags || [],
    featuredImage: post?.featuredImage || '',
    description: post?.description || '',
    status: post?.status || 'draft'
  });

  const handleImageUploadComplete = (url: string) => {
    setFormData(prev => ({ ...prev, featuredImage: url }));
  };

  const handleImageDelete = async () => {
    if (!formData.featuredImage) return;

    try {
      await deleteImage(formData.featuredImage);
      setFormData(prev => ({ ...prev, featuredImage: '' }));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('画像の削除に失敗しました');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          タイトル
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          アイキャッチ画像
        </label>
        <div className="mt-1 space-y-2">
          {formData.featuredImage && (
            <div className="relative">
              <img
                src={formData.featuredImage}
                alt="アイキャッチ画像"
                className="max-h-48 rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={handleImageDelete}
                className="absolute top-2 right-2 rounded-full bg-red-600 p-1 text-white hover:bg-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
          <ImageUploader
            onUpload={handleImageUploadComplete}
            onError={(error) => alert(error.message)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          本文
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
          rows={10}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
          抜粋
        </label>
        <textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          公開状態
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as 'published' | 'draft' }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="draft">下書き</option>
          <option value="published">公開</option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          保存
        </button>
      </div>
    </form>
  );
} 