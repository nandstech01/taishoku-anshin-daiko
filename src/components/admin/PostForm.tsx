'use client';

import React, { useEffect, useState } from 'react';
import { BlogPost, BlogPostFormData } from '@/types/blog';
import { useCategoriesStore } from '@/stores/categories';
import ImageUploader from './ImageUploader';

interface PostFormProps {
  post?: BlogPost;
  onSubmit: (data: BlogPostFormData) => void;
}

export default function PostForm({ post, onSubmit }: PostFormProps) {
  const { categories, fetchCategories, loading, error } = useCategoriesStore();
  const [content, setContent] = useState(post?.content || '');
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || '');

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: BlogPostFormData = {
      title: formData.get('title') as string,
      content: content,
      excerpt: formData.get('excerpt') as string,
      categoryId: formData.get('categoryId') as string,
      tags: formData.get('tags')?.toString().split(',') || [],
      isPublished: formData.get('isPublished') === 'true',
      slug: formData.get('title')?.toString().toLowerCase().replace(/\s+/g, '-') || '',
      description: formData.get('excerpt') as string,
      status: formData.get('isPublished') === 'true' ? 'published' : 'draft',
      featuredImage: featuredImage,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          タイトル
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          defaultValue={post?.title}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          アイキャッチ画像
        </label>
        <div className="space-y-2">
          {featuredImage && (
            <div className="relative w-full aspect-video">
              <img
                src={featuredImage}
                alt="アイキャッチ画像"
                className="object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setFeaturedImage('')}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
          <ImageUploader
            onUpload={setFeaturedImage}
            onError={(error) => alert(error.message)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          本文
        </label>
        <div className="prose max-w-none">
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm min-h-[400px]"
            placeholder="Markdown形式で入力できます"
          />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
          抜粋
        </label>
        <textarea
          name="excerpt"
          id="excerpt"
          rows={3}
          required
          defaultValue={post?.excerpt}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
          カテゴリー
        </label>
        <select
          name="categoryId"
          id="categoryId"
          required
          defaultValue={post?.category.id}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">選択してください</option>
          {loading ? (
            <option disabled>読み込み中...</option>
          ) : error ? (
            <option disabled>エラーが発生しました</option>
          ) : (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          タグ（カンマ区切り）
        </label>
        <input
          type="text"
          name="tags"
          id="tags"
          defaultValue={post?.tags?.join(',') || ''}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="isPublished" className="block text-sm font-medium text-gray-700">
          公開状態
        </label>
        <select
          name="isPublished"
          id="isPublished"
          defaultValue={post?.publishedAt ? 'true' : 'false'}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="true">公開</option>
          <option value="false">下書き</option>
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