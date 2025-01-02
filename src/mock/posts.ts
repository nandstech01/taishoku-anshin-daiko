import { BlogPost, Author, Category } from '@/types/blog';

const mockAuthor: Author = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatarUrl: 'https://example.com/avatar.jpg'
};

const mockCategory: Category = {
  id: '1',
  name: 'Technology',
  slug: 'technology',
  description: 'Technology related posts'
};

const newsCategory: Category = {
  id: '2',
  name: 'お知らせ',
  slug: 'news',
  description: 'ニュースリリース'
};

export const mockPosts: BlogPost[] = [
  {
    id: 'news-1',
    slug: 'blog-launch',
    title: 'あんしん退職コラムをオープンしました',
    content: `
# あんしん退職コラムをオープンしました

株式会社エヌアンドエスが運営する退職代行サービス「退職あんしん代行」は、本日より情報発信メディア「あんしん退職コラム」をオープンいたしました。

## メディアについて

あんしん退職コラムでは、以下のようなコンテンツを提供してまいります：

- 退職に関する基礎知識や手続きの解説
- 労働問題やハラスメントへの対処方法
- 実際の解決事例の紹介
- キャリアプランニングのアドバイス
- メンタルヘルスケアの情報

今後も皆様のお役に立つ情報を継続的に発信してまいります。
    `,
    description: '退職あんしん代行による情報発信メディア「あんしん退職コラム」のオープンのお知らせ',
    excerpt: '退職に関する悩みや不安を解消するための情報を発信するメディアをオープンしました。',
    published_at: '2024-01-15T00:00:00Z',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    author: mockAuthor,
    category: newsCategory,
    tags: ['お知らせ', 'メディア', 'オープン'],
    views: 150,
    likes: 45
  },
  {
    id: 'news-2',
    slug: 'ai-career-support',
    title: '株式会社エヌアンドエスがAI副業支援プログラムを開始',
    content: `
# AI副業支援プログラムの開始について

株式会社エヌアンドエスは、退職後のキャリアサポートの一環として、AI技術を活用した副業支援プログラムを開始いたします。

## プログラムの特徴

- AIツールの活用方法の習得
- 副業に適した職種の診断
- オンラインでの学習環境の提供
- 専門家によるキャリアカウンセリング
- コミュニティでの情報交換

本プログラムを通じて、より多くの方々の新しいキャリアづくりをサポートしてまいります。
    `,
    description: 'AI技術を活用した新しい副業支援プログラムの開始のお知らせ',
    excerpt: '退職後のキャリアサポートとして、AI技術を活用した副業支援プログラムを開始します。',
    published_at: '2024-01-20T00:00:00Z',
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
    author: mockAuthor,
    category: newsCategory,
    tags: ['お知らせ', 'AI', '副業', 'キャリア'],
    views: 120,
    likes: 38
  },
  {
    id: '1',
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js',
    content: '# Getting Started with Next.js\n\nNext.js is a powerful framework...',
    description: 'Learn how to get started with Next.js',
    excerpt: 'A comprehensive guide to getting started with Next.js',
    published_at: '2024-01-01T00:00:00Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    author: mockAuthor,
    category: mockCategory,
    tags: ['nextjs', 'react', 'web-development'],
    views: 100,
    likes: 50
  },
  {
    id: '2',
    slug: 'mastering-typescript',
    title: 'Mastering TypeScript',
    content: '# Mastering TypeScript\n\nTypeScript is a typed superset of JavaScript...',
    description: 'Learn TypeScript from scratch',
    excerpt: 'A deep dive into TypeScript features and best practices',
    published_at: '2024-01-02T00:00:00Z',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    author: mockAuthor,
    category: mockCategory,
    tags: ['typescript', 'javascript', 'programming'],
    views: 150,
    likes: 75
  },
  {
    id: '3',
    slug: 'react-best-practices',
    title: 'React Best Practices',
    content: '# React Best Practices\n\nLearn how to write better React code...',
    description: 'Essential React best practices',
    excerpt: 'A guide to writing better React applications',
    published_at: '2024-01-03T00:00:00Z',
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z',
    author: mockAuthor,
    category: mockCategory,
    tags: ['react', 'javascript', 'web-development'],
    views: 200,
    likes: 100
  }
];

export const newsItems = [
  {
    title: 'あんしん退職コラムオープンしました',
    content: '退職に関する悩みや不安を解消するための情報メディア「あんしん退職コラム」を開設いたしました。退職の基礎知識から実際の解決事例まで、皆様のお役に立つ情報を発信してまいります。',
    date: '2024.01.15'
  },
  {
    title: '株式会社エヌアンドエスはAI副業支援プログラムを開始いたしました',
    content: '退職後のキャリアサポートの一環として、AI技術を活用した副業支援プログラムを開始いたしました。AIツールの活用方法から、副業に適した職種診断まで、充実したサポートを提供いたします。',
    date: '2024.01.20'
  }
]; 