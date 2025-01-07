import { Post } from '@/types/post';

export const generateArticleSchema = (post: Post, baseUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.thumbnail_url ? `${baseUrl}${post.thumbnail_url}` : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      '@type': 'Organization',
      name: 'タイショクアンシン編集部',
      url: baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: '株式会社エヌアンドエス',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`
    },
    isPartOf: {
      '@type': 'Blog',
      name: 'あんしん退職コラム',
      description: '退職に関する不安や悩みを解消する情報メディア',
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