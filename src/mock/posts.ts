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

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js',
    content: '# Getting Started with Next.js\n\nNext.js is a powerful framework...',
    description: 'Learn how to get started with Next.js',
    excerpt: 'A comprehensive guide to getting started with Next.js',
    published_at: '2024-01-01T00:00:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    author: mockAuthor,
    authorId: '1',
    category: mockCategory,
    categoryId: '1',
    status: 'published',
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
    publishedAt: '2024-01-02T00:00:00Z',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    author: mockAuthor,
    authorId: '1',
    category: mockCategory,
    categoryId: '1',
    status: 'published',
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
    publishedAt: '2024-01-03T00:00:00Z',
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z',
    author: mockAuthor,
    authorId: '1',
    category: mockCategory,
    categoryId: '1',
    status: 'published',
    tags: ['react', 'javascript', 'web-development'],
    views: 200,
    likes: 100
  }
]; 