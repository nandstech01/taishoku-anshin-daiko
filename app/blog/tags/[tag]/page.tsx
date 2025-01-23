import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/supabase';
import Breadcrumb from '@/components/blog/Breadcrumb';
import BlogCard from '@/components/blog/BlogCard';
import { RelatedTags } from '@/components/blog/RelatedTags';
import { notFound } from 'next/navigation';
import { Post, Category } from '@/types/blog';
import Link from 'next/link';

// タグの正規化と安全性を確保する関数
const normalizeTag = (tag: string): string => {
  try {
    if (!tag) return '';
    const decodedTag = decodeURIComponent(tag);
    return decodedTag.replace(/　/g, ' ').replace(/\s+/g, ' ').trim();
  } catch (e) {
    console.error('Error normalizing tag:', e);
    return '';
  }
};

// 構造化データの生成
const generateTagStructuredData = (tag: string, posts: Post[], baseUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${tag}に関する記事一覧`,
    description: `${tag}に関する記事${posts.length}件を掲載。`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/tags/${encodeURIComponent(tag)}`
    },
    isPartOf: {
      '@type': 'Blog',
      name: 'あんしん退職コラム',
      url: `${baseUrl}/blog`
    },
    hasPart: posts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.published_at || post.created_at,
      dateModified: post.updated_at || post.published_at || post.created_at,
      url: `${baseUrl}/blog/${post.slug}`,
      description: post.description || post.excerpt || undefined,
      author: {
        '@type': 'Organization',
        name: '退職あんしん代行編集部'
      }
    })),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': baseUrl,
            name: 'ホーム'
          }
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': `${baseUrl}/blog`,
            name: 'ブログ'
          }
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@id': `${baseUrl}/blog/tags/${encodeURIComponent(tag)}`,
            name: `${tag}の記事一覧`
          }
        }
      ]
    }
  };
};

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const supabase = createClient();
  const decodedTag = decodeURIComponent(params.tag);
  const normalizedTag = normalizeTag(decodedTag);
  
  const { data: posts, count } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .filter('seo_keywords', 'cs', `{${normalizedTag}}`);

  const title = `退職代行の${normalizedTag}に関する記事${count}件 | 退職代行案内`;
  const description = `${normalizedTag}に関する記事${count}件を掲載。退職代行に関する最新情報、知識、体験談をご紹介します。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
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
          <Breadcrumb items={[
            { label: 'ブログ', href: '/blog' },
            { label: `${normalizedTag}の記事一覧` }
          ]} />
          <h1 className="tag-title">{normalizedTag}に関する記事</h1>
          <p className="no-articles">申し訳ありません。{normalizedTag}に関する記事は現在ありません。</p>
          <Link href="/blog" className="back-to-blog">
            ブログトップへ戻る
          </Link>
        </div>
      );
    }

    const postsWithCategories = posts.map(post => ({
      ...post,
      category: categories?.find(cat => cat.slug === post.category_slug)
    }));

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateTagStructuredData(
              normalizedTag,
              posts,
              process.env.NEXT_PUBLIC_BASE_URL || ''
            ))
          }}
        />
        <div className="tag-page">
          <Breadcrumb items={[
            { label: 'ブログ', href: '/blog' },
            { label: `${normalizedTag}の記事一覧` }
          ]} />
          <h1 className="tag-title">{normalizedTag}に関する記事一覧</h1>
          <p className="tag-description">
            {normalizedTag}に関する記事が{posts.length}件あります。退職代行に関する最新情報、知識、体験談をご紹介しています。
          </p>
          <RelatedTags
            currentTag={normalizedTag}
            posts={posts}
            maxTags={5}
          />
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
      </>
    );
  } catch (error) {
    console.error('Error in TagPage:', error);
    return <div>予期せぬエラーが発生しました。</div>;
  }
} 