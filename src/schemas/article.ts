import type { Post } from '@/lib/supabase/database.types';

export const generateArticleSchema = (post: Post, baseUrl: string) => {
  // 画像URLの生成（異なるアスペクト比のバリアントを生成）
  const generateImageVariants = (url: string) => {
    const baseImageUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
    return [
      {
        '@type': 'ImageObject',
        url: baseImageUrl,
        width: 1200,
        height: 630,
        caption: post.title
      },
      {
        '@type': 'ImageObject',
        url: `${baseImageUrl}?w=1200&h=675`,
        width: 1200,
        height: 675,
        caption: post.title
      },
      {
        '@type': 'ImageObject',
        url: `${baseImageUrl}?w=1200&h=900`,
        width: 1200,
        height: 900,
        caption: post.title
      }
    ];
  };

  const imageUrls = post.thumbnail_url ? generateImageVariants(post.thumbnail_url) : undefined;

  // 日付の処理（ISO 8601形式でタイムゾーン付き）
  const formatDate = (date: string) => {
    return new Date(date).toISOString();
  };

  const publishDate = formatDate(post.published_at || post.created_at);
  const modifyDate = formatDate(post.updated_at || post.published_at || post.created_at);

  // 単語数のカウント
  const wordCount = post.content ? post.content.trim().split(/\s+/).length : 0;

  // 記事の文字数をカウント
  const charCount = post.content ? post.content.replace(/\s+/g, '').length : 0;

  // 推定読了時間（WPMを400文字/分として計算）
  const readingTime = Math.ceil(charCount / 400);

  // 記事の最初の段落を抽出（description がない場合の代替として使用）
  const firstParagraph = post.content 
    ? post.content.split('\n')[0].replace(/[#*`]/g, '').trim()
    : '';

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${baseUrl}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.description || firstParagraph,
    image: imageUrls,
    datePublished: publishDate,
    dateModified: modifyDate,
    author: {
      '@type': 'Organization',
      name: '退職あんしん代行編集部',
      description: '退職代行サービスの現場で培った10年以上の経験を活かし、法的知識に基づいた正確な情報を提供。月間100件以上の退職相談実績を持つ専門チーム。',
      url: `${baseUrl}/blog/about`,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
        width: 600,
        height: 60
      }
    },
    publisher: {
      '@type': 'Organization',
      name: '株式会社エヌアンドエス',
      description: '退職代行・退職相談のプロフェッショナル。労働問題の解決から、キャリア支援まで、働く人の未来をサポートします。',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
        width: 600,
        height: 60
      },
      sameAs: [
        'https://twitter.com/taishoku_anshin',
        'https://www.facebook.com/taishoku.anshin',
        'https://line.me/h1kk42r'
      ]
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`
    },
    articleBody: post.content,
    wordCount: wordCount,
    charCount: charCount,
    timeRequired: `PT${readingTime}M`,
    articleSection: post.category?.name,
    inLanguage: 'ja',
    isAccessibleForFree: true,
    isPartOf: {
      '@type': 'Blog',
      name: 'あんしん退職コラム',
      description: '退職に関する不安や悩みを解消する情報メディア。退職のノウハウから、キャリアプランまで、あなたの新しい一歩を、私たちがサポートします。',
      url: `${baseUrl}/blog`
    },
    keywords: [
      '退職代行',
      '退職相談',
      'パワハラ対策',
      post.category?.name,
      ...(post.tags || []),
      ...(post.seo_keywords || [])
    ].filter(Boolean).join(','),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [
        '.blog-post-content h1',
        '.blog-post-content p'
      ]
    },
    about: {
      '@type': 'Thing',
      name: post.title,
      description: post.description || firstParagraph,
      url: `${baseUrl}/blog/${post.slug}`
    },
    mentions: [
      {
        '@type': 'Organization',
        name: '退職あんしん代行',
        url: baseUrl,
        description: '退職代行サービスのパイオニア。労働問題の解決からキャリアサポートまで、働く人の未来をサポートします。'
      }
    ]
  };
}; 