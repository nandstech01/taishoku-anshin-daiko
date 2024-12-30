'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/supabase';
import ImageUploader from '@/components/ImageUploader';
import PostPreview from '@/components/PostPreview';
import { useAuth } from '@/contexts/AuthContext';

type Category = {
  slug: string;
  name: string;
};

export default function EditPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [status, setStatus] = React.useState('draft');
  const [categorySlug, setCategorySlug] = React.useState<string>('');
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = React.useState<string>('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isPreviewMode, setIsPreviewMode] = React.useState(false);
  const [metaDescription, setMetaDescription] = React.useState('');
  const [seoKeywords, setSeoKeywords] = React.useState<string[]>([]);
  const [isIndexable, setIsIndexable] = React.useState(true);
  const [canonicalUrl, setCanonicalUrl] = React.useState('');
  const [seoKeywordInput, setSeoKeywordInput] = React.useState('');

  React.useEffect(() => {
    const fetchPost = async () => {
      const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', params.slug)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        return;
      }

      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setStatus(post.status);
        setCategorySlug(post.category_slug || '');
        setThumbnailUrl(post.thumbnail_url || '');
        setMetaDescription(post.meta_description || '');
        setSeoKeywords(post.seo_keywords || []);
        setIsIndexable(post.is_indexable ?? true);
        setCanonicalUrl(post.canonical_url || '');
      }
    };

    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('slug, name')
        .order('name');
      
      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      setCategories(data || []);
    };

    fetchPost();
    fetchCategories();
  }, [params.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!user) {
      alert('ログインが必要です');
      return;
    }

    try {
      const { error } = await supabase
        .from('posts')
        .update({
          title,
          content,
          status,
          category_slug: categorySlug,
          thumbnail_url: thumbnailUrl,
          updated_at: new Date().toISOString(),
          meta_description: metaDescription,
          seo_keywords: seoKeywords,
          is_indexable: isIndexable,
          canonical_url: canonicalUrl || null,
        })
        .eq('slug', params.slug);

      if (error) throw error;

      router.push('/admin/posts');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('記事の更新に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddKeyword = () => {
    if (seoKeywordInput.trim() && !seoKeywords.includes(seoKeywordInput.trim())) {
      setSeoKeywords([...seoKeywords, seoKeywordInput.trim()]);
      setSeoKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setSeoKeywords(seoKeywords.filter(k => k !== keyword));
  };

  const toggleStatus = () => {
    setStatus(status === 'published' ? 'draft' : 'published');
  };

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  if (isPreviewMode) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto mb-6">
          <button
            onClick={togglePreview}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            編集に戻る
          </button>
        </div>
        <PostPreview
          title={title}
          content={content}
          thumbnailUrl={thumbnailUrl}
          metaDescription={metaDescription}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">記事の編集</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            カテゴリー
          </label>
          <select
            id="category"
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">カテゴリーを選択</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            サムネイル画像
          </label>
          <ImageUploader
            onImageUploaded={setThumbnailUrl}
            currentImageUrl={thumbnailUrl}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            本文
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="border-t pt-6 mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">SEO設定</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
                メタディスクリプション
              </label>
              <p className="text-sm text-gray-500 mb-1">
                検索結果に表示される説明文（120文字以内推奨）
              </p>
              <textarea
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                maxLength={160}
              />
              <p className="text-sm text-gray-500 mt-1">
                {metaDescription.length}/160文字
              </p>
            </div>

            <div>
              <label htmlFor="seoKeywords" className="block text-sm font-medium text-gray-700">
                SEOキーワード
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="seoKeywords"
                  value={seoKeywordInput}
                  onChange={(e) => setSeoKeywordInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddKeyword();
                    }
                  }}
                  className="flex-1 rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="キーワードを入力"
                />
                <button
                  type="button"
                  onClick={handleAddKeyword}
                  className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                >
                  追加
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {seoKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(keyword)}
                      className="ml-1 inline-flex items-center p-0.5 text-blue-400 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-700">
                正規URL（Canonical URL）
              </label>
              <p className="text-sm text-gray-500 mb-1">
                同じ内容が複数のURLで表示される場合に、正規のURLを指定
              </p>
              <input
                type="url"
                id="canonicalUrl"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://example.com/posts/original-post"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isIndexable"
                checked={isIndexable}
                onChange={(e) => setIsIndexable(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isIndexable" className="ml-2 block text-sm text-gray-900">
                検索エンジンのインデックスを許可する
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={toggleStatus}
              className={`inline-flex justify-center rounded-md border py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                status === 'published'
                  ? 'border-red-300 bg-white text-red-700 hover:bg-red-50 focus:ring-red-500'
                  : 'border-green-300 bg-white text-green-700 hover:bg-green-50 focus:ring-green-500'
              }`}
            >
              {status === 'published' ? '非公開にする' : '公開する'}
            </button>
            <button
              type="button"
              onClick={togglePreview}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              プレビュー
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? '保存中...' : '保存する'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 