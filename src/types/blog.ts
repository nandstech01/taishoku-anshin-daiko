export interface BasePost {
  id?: number;
  title: string;
  slug: string;
  content: string;
  meta_description?: string;
  description?: string;
  thumbnail_url?: string;
  featuredImage?: string;
  created_at?: string;
  updated_at?: string;
  status: 'draft' | 'published';
  category_id?: number;
  category?: Category;
  view_count?: number;
  tags?: string[];
  seo_keywords?: string[];
  published_at?: string | null;
  excerpt?: string;
  views?: number;
}

export interface Post extends BasePost {
  id: number;
  category_id: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogPost extends Post {
  category: Category;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;
  role: 'admin' | 'author' | 'user';
}

export interface Author {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  postSlug: string;
  content: string;
  authorId: string;
  author?: Author;
  created_at: string;
  updated_at: string;
  likes?: number;
  isReported?: boolean;
  replies?: Comment[];
}

export interface BlogPostWithAuthor extends BlogPost {
  author: User;
}

export interface BlogPostWithRelated extends BlogPost {
  relatedPosts?: BlogPost[];
}

export interface BlogPostFormData {
  title: string;
  content: string;
  excerpt: string;
  categoryId: number | string;
  tags: string[];
  isPublished: boolean;
  slug: string;
  description: string;
  status: 'draft' | 'published';
  featuredImage?: string;
}

export interface Bookmark {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  created_at: string;
  url: string;
}

export interface SortOption {
  value: string;
  label: string;
  sortFn: (a: BlogPost, b: BlogPost) => number;
}

export const SORT_OPTIONS: SortOption[] = [
  {
    value: 'latest',
    label: '新着順',
    sortFn: (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  },
  {
    value: 'oldest',
    label: '古い順',
    sortFn: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  },
  {
    value: 'views',
    label: '閲覧数順',
    sortFn: (a, b) => (b.views || 0) - (a.views || 0)
  }
]; 