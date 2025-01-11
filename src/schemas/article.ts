import type { Post } from '@/lib/supabase/database.types';

export const generateArticleSchema = (post: Post, baseUrl: string) => {
  // 画像URLの生成（異なるアスペクト比のバリアントを生成）
  const generateImageVariants = (url: string) => {
    const baseImageUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
    return [
      baseImageUrl, // オリジナル画像
      `${baseImageUrl}?w=1200&h=675`, // 16:9
      `${baseImageUrl}?w=1200&h=900`, // 4:3
      `${baseImageUrl}?w=1200&h=1200`  // 1:1
    ];
  };

  const imageUrls = post.thumbnail_url ? generateImageVariants(post.thumbnail_url) : undefined;

  // 日付の処理（ISO 8601形式でタイムゾーン付き）
  const formatDate = (date: string) => {
    return new Date(date).toISOString();
  };

  const publishDate = formatDate(post.published_at || post.created_at);
  const modifyDate = formatDate(post.updated_at || post.published_at || post.created_at);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || undefined,
    image: imageUrls,
    datePublished: publishDate,
    dateModified: modifyDate,
    author: {
      '@type': 'Organization',
      name: '退職あんしん代行編集部',
      description: '退職代行サービスの現場で培った10年以上の経験を活かし、法的知識に基づいた正確な情報を提供。月間100件以上の退職相談実績を持つ専門チーム。',
      url: `${baseUrl}/blog/about`
    },
    publisher: {
      '@type': 'Organization',
      name: '株式会社エヌアンドエス',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
        width: 600,
        height: 60
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`
    },
    articleBody: post.content ? post.content.substring(0, 500) + '...' : undefined,
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
      ...(post.tags || [])
    ].filter(Boolean).join(',')
  };
}; 