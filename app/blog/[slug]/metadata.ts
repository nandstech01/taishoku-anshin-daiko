import { Metadata } from 'next';
import { generateArticleSchema } from '@/schemas/article';
import { generateBreadcrumbSchema } from '@/schemas/breadcrumb';
import { getPostWithCategory } from '@/utils/blog-helpers';

/**
 * ブログ記事ページのメタデータを生成する関数
 * 
 * 埋め込み要素（口コミ、AI退職適正診断、比較表）に関するメタデータも含む
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://taishoku-anshin-daiko.com';
  const { post: postWithCategory, error } = await getPostWithCategory(params.slug);

  if (error || !postWithCategory) {
    return {
      title: 'ページが見つかりません | 退職あんしん代行',
      description: 'お探しのページは見つかりませんでした。',
      robots: {
        index: false,
        follow: true,
        nocache: true,
      }
    };
  }

  // Generate breadcrumb items for structured data
  const breadcrumbItemsForSchema = [
    { name: 'ホーム', url: '/' },
    { name: 'ブログ', url: '/blog' },
    ...(postWithCategory.category ? [
      { 
        name: postWithCategory.category.name, 
        url: `/blog/category/${postWithCategory.category.slug}` 
      }
    ] : []),
    { name: postWithCategory.title, url: `/blog/${postWithCategory.slug}` }
  ];

  // Generate structured data
  const structuredData = [
    generateArticleSchema(postWithCategory, baseUrl),
    generateBreadcrumbSchema(breadcrumbItemsForSchema, baseUrl)
  ];

  // 埋め込み要素に関連するキーワード
  const embeddedContentKeywords = [
    '退職代行サービス比較',  // 比較表関連キーワード
    '退職代行口コミ',        // 口コミ関連キーワード
    '退職適正診断',          // 診断ツール関連キーワード
    '退職サービス評判'
  ];

  // 埋め込み要素に関連するタグ
  const embeddedContentTags = [
    '退職代行サービス比較',
    '退職代行口コミ',
    '退職適正診断'
  ];

  return {
    title: `${postWithCategory.title} | 退職あんしん代行`,
    description: postWithCategory.description || `${postWithCategory.title}に関する詳しい情報をご紹介します。`,
    keywords: [
      ...(postWithCategory.seo_keywords || []),
      ...(postWithCategory.tags || []),
      '退職代行',
      '退職相談',
      '退職方法',
      ...embeddedContentKeywords,
      postWithCategory.category?.name
    ].filter(Boolean).join(', '),
    alternates: {
      canonical: `${baseUrl}/blog/${postWithCategory.slug}`,
      languages: {
        'ja-JP': `${baseUrl}/blog/${postWithCategory.slug}`,
      },
    },
    openGraph: {
      title: `${postWithCategory.title} | 退職あんしん代行`,
      description: postWithCategory.description || `${postWithCategory.title}に関する詳しい情報をご紹介します。`,
      url: `${baseUrl}/blog/${postWithCategory.slug}`,
      siteName: '退職あんしん代行',
      locale: 'ja_JP',
      type: 'article',
      images: postWithCategory.thumbnail_url ? [{
        url: postWithCategory.thumbnail_url,
        width: 1200,
        height: 630,
        alt: postWithCategory.title,
      }] : undefined,
      // article情報
      publishedTime: postWithCategory.published_at || postWithCategory.created_at,
      modifiedTime: postWithCategory.updated_at || postWithCategory.created_at,
      section: postWithCategory.category?.name || 'ブログ',
      authors: ['退職あんしん代行編集部'],
      tags: [
        ...(postWithCategory.tags || []),
        ...embeddedContentTags
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${postWithCategory.title} | 退職あんしん代行`,
      description: postWithCategory.description || `${postWithCategory.title}に関する詳しい情報をご紹介します。`,
      images: postWithCategory.thumbnail_url ? [postWithCategory.thumbnail_url] : undefined,
      site: '@taishoku_anshin',
      creator: '@taishoku_anshin',
    },
    other: {
      'og:image:alt': postWithCategory.title,
      'twitter:image:alt': postWithCategory.title,
      'article:tag': [
        ...(postWithCategory.tags || []),
        ...embeddedContentTags
      ].join(','),
      // 埋め込みコンテンツの特徴を示すカスタムメタタグ
      'content-features': '比較表,口コミ,診断ツール',
      'content-interactive': 'true',
      'application/ld+json': structuredData.map(item => JSON.stringify(item)).join('\n')
    }
  };
} 