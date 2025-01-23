import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/supabase';
import Breadcrumb from '@/components/blog/Breadcrumb';
import BlogCard from '@/components/blog/BlogCard';
import { notFound } from 'next/navigation';
import { Post, Category } from '@/types/blog';
import Link from 'next/link';

// タグの正規化と安全性を確保する関数
const normalizeTag = (tag: string): string => {
  try {
    if (!tag) return '';
    // デコード処理を追加
    const decodedTag = decodeURIComponent(tag);
    // 全角スペース、複数の半角スペースを単一の半角スペースに変換し、前後の空白を削除
    return decodedTag.replace(/　/g, ' ').replace(/\s+/g, ' ').trim();
  } catch (e) {
    console.error('Error normalizing tag:', e);
    return '';
  }
};

// 検索用のタグを準備する関数
const prepareSearchTag = (tag: string): string => {
  const normalized = normalizeTag(tag);
  // スペースを含むタグの場合は完全一致で検索
  if (normalized.includes(' ')) {
    return `{${normalized}}`;
  }
  // スペースを含まないタグの場合は部分一致で検索
  return `%${normalized}%`;
};

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag);
  const normalizedTag = normalizeTag(decodedTag);
  
  return {
    title: `${normalizedTag}に関する記事一覧 | 退職代行案内`,
    description: `${normalizedTag}に関する記事の一覧ページです。退職代行に関する最新情報、知識、体験談をご紹介します。`,
    openGraph: {
      title: `${normalizedTag}に関する記事一覧 | 退職代行案内`,
      description: `${normalizedTag}に関する記事の一覧ページです。退職代行に関する最新情報、知識、体験談をご紹介します。`,
      type: 'article',
      locale: 'ja_JP',
    },
    alternates: {
      canonical: `/blog/tags/${params.tag}`
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  };
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const supabase = createClient();
  const decodedTag = decodeURIComponent(params.tag);
  const normalizedTag = normalizeTag(decodedTag);

  try {
    // 記事の取得（カテゴリーは別クエリで取得）
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .filter('seo_keywords', 'cs', `{${normalizedTag}}`)
      .order('created_at', { ascending: false });

    if (postsError) {
      console.error('Error fetching posts:', postsError);
      return <div>記事の取得中にエラーが発生しました。</div>;
    }

    // カテゴリー情報の取得
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*');

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      return <div>カテゴリー情報の取得中にエラーが発生しました。</div>;
    }

    if (!posts || posts.length === 0) {
      return (
        <div className="tag-page">
          <h1 className="tag-title">{normalizedTag}に関する記事</h1>
          <p className="no-articles">申し訳ありません。{normalizedTag}に関する記事は現在ありません。</p>
          <Link href="/blog" className="back-to-blog">
            ブログトップへ戻る
          </Link>
        </div>
      );
    }

    // 記事データにカテゴリー情報を付加
    const postsWithCategories = posts.map(post => ({
      ...post,
      category: categories?.find(cat => cat.slug === post.category_slug)
    }));

    return (
      <div className="tag-page">
        <h1 className="tag-title">{normalizedTag}に関する記事一覧</h1>
        <p className="tag-description">
          {normalizedTag}に関する記事の一覧です。退職代行に関する最新情報、知識、体験談をご紹介しています。
        </p>
        <div className="articles-grid">
          {postsWithCategories.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
        <Link href="/blog" className="back-to-blog">
          ブログトップへ戻る
        </Link>
      </div>
    );
  } catch (error) {
    console.error('Error in TagPage:', error);
    return <div>予期せぬエラーが発生しました。</div>;
  }
} 