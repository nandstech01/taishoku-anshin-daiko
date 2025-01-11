'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/supabase';
import ImageUploader from '@/components/ImageUploader';
import PostPreview from '@/components/PostPreview';
import { generateSlug, ensureUniqueSlug } from '@/utils/slug';
import { useAuth } from '@/contexts/AuthContext';
import ContentImageManager from '@/components/admin/ContentImageManager';

type Category = {
  slug: string;
  name: string;
};

export default function NewPostPage() {
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
  const [tempPostId, setTempPostId] = React.useState<string>('');

  React.useEffect(() => {
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

    fetchCategories();
  }, []);

  React.useEffect(() => {
    setTempPostId(crypto.randomUUID());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // 二重送信防止
    
    if (!user) {
      alert('ログインが必要です');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: existingPosts, error: slugError } = await supabase
        .from('posts')
        .select('slug');
      
      if (slugError) throw slugError;

      const baseSlug = generateSlug(title);
      if (!baseSlug) {
        throw new Error('タイトルが無効です');
      }

      const slug = await ensureUniqueSlug(baseSlug, existingPosts?.map(p => p.slug) || []);
      if (!slug) {
        throw new Error('Failed to generate slug');
      }

      // 記事を作成
      const { data: newPost, error: postError } = await supabase
        .from('posts')
        .insert([
          {
            title,
            content,
            status,
            category_slug: categorySlug || null,
            thumbnail_url: thumbnailUrl,
            slug,
            author_slug: user.user_metadata?.username || user.email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            meta_description: metaDescription,
            seo_keywords: seoKeywords,
            is_indexable: isIndexable,
            canonical_url: canonicalUrl || null,
          }
        ])
        .select()
        .single();

      if (postError) throw postError;

      // 画像の関連付けを更新
      if (tempPostId && newPost?.id) {
        const { error: imageError } = await supabase
          .from('post_images')
          .update({ post_id: newPost.id })
          .eq('post_id', tempPostId);

        if (imageError) {
          console.error('Error updating image associations:', imageError);
        }
      }

      // すべての処理が完了してから遷移
      await new Promise(resolve => setTimeout(resolve, 100)); // 短い遅延を追加
      window.location.href = '/admin/posts'; // router.pushの代わりに直接遷移
    } catch (error: any) {
      console.error('Error creating post:', error);
      alert(error.message || '記事の作成に失敗しました');
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

  const handleImageSelect = (imageId: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;
    const currentContent = textarea.value;
    const newContent = 
      currentContent.substring(0, selectionStart) +
      `![[${imageId}]]` +
      currentContent.substring(selectionEnd);

    setContent(newContent);
  };

  if (isPreviewMode) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center">
          <button
            onClick={togglePreview}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            編集に戻る
          </button>
          <div className="text-sm text-gray-500">
            {status === 'published' ? '公開' : '下書き'}
          </div>
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">新規記事作成</h1>
        <button
          type="button"
          onClick={togglePreview}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          プレビュー
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
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
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
            カテゴリー
          </label>
          <select
            id="category"
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            サムネイル画像
          </label>
          <ImageUploader
            onImageUploaded={setThumbnailUrl}
            currentImageUrl={thumbnailUrl}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
            本文
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono text-sm"
                required
              />
            </div>
            <div>
              <ContentImageManager
                postId={tempPostId}
                onImageSelect={handleImageSelect}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">SEO設定</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="metaDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                メタディスクリプション
              </label>
              <textarea
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="検索結果に表示される説明文を入力してください"
              />
            </div>

            <div>
              <label htmlFor="seoKeywords" className="block text-sm font-semibold text-gray-700 mb-2">
                SEOキーワード
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  id="seoKeywords"
                  value={seoKeywordInput}
                  onChange={(e) => setSeoKeywordInput(e.target.value)}
                  className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="キーワードを入力"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddKeyword();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddKeyword}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  追加
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {seoKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(keyword)}
                      className="ml-2 inline-flex items-center p-0.5 rounded-full text-indigo-600 hover:bg-indigo-200 focus:outline-none"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="canonicalUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                正規URL（オプション）
              </label>
              <input
                type="url"
                id="canonicalUrl"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://example.com/canonical-page"
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
              <label htmlFor="isIndexable" className="ml-2 block text-sm font-semibold text-gray-700">
                検索エンジンのインデックスを許可する
              </label>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={toggleStatus}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                status === 'published'
                  ? 'text-green-700 bg-green-100 hover:bg-green-200'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {status === 'published' ? '公開する' : '下書きとして保存'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? '保存中...' : '保存する'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 