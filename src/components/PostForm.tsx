'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { BlogPost, Category } from '@/types/blog';

const CATEGORIES: Category[] = [
  { id: 1, name: '退職準備', slug: 'preparation', description: '退職の準備に関する情報' },
  { id: 2, name: '退職手続き', slug: 'procedure', description: '退職手続きに関する情報' },
  { id: 3, name: '保険・年金', slug: 'insurance', description: '保険と年金に関する情報' },
  { id: 4, name: 'キャリアプラン', slug: 'career-plan', description: 'キャリアプランに関する情報' },
  { id: 5, name: 'メンタルヘルス', slug: 'mental-health', description: 'メンタルヘルスに関する情報' },
];

interface PostFormProps {
  initialValues: BlogPost;
  onSubmit: (post: BlogPost) => Promise<void>;
  submitLabel: string;
}

export default function PostForm({
  initialValues,
  onSubmit,
  submitLabel,
}: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  const [excerpt, setExcerpt] = useState(initialValues.excerpt);
  const [categoryId, setCategoryId] = useState<number>(initialValues.category?.id || 1);
  const [tags, setTags] = useState<string[]>(initialValues.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [isPublished, setIsPublished] = useState(!!initialValues.published_at);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
      await onSubmit({
        ...initialValues,
        title,
        content,
        excerpt,
        category,
        tags,
        published_at: isPublished ? new Date().toISOString() : null,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
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
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
          抜粋
        </label>
        <textarea
          id="excerpt"
          rows={2}
          required
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          カテゴリー
        </label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          {CATEGORIES.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          タグ
        </label>
        <div className="mt-1">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="タグを入力してEnterを押してください"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          本文
        </label>
        <textarea
          id="content"
          rows={10}
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
          公開する
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {saving ? '保存中...' : submitLabel}
        </button>
      </div>
    </form>
  );
} 