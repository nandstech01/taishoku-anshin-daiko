export interface Author {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BasePost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  description?: string;
  slug: string;
  category?: Category;
  category_slug?: string;
  tags?: string[];
  author?: Author;
  author_slug?: string;
  published_at?: string | null;
  views?: number;
  likes?: number;
  share_count?: number;
  thumbnail_url?: string;
  featuredImage?: string;
  meta_description?: string;
  seo_keywords?: string[];
  is_indexable?: boolean;
  canonical_url?: string;
  status?: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

export type BlogPost = BasePost;
export type Post = BasePost;

export interface BlogPostFormData {
  title: string;
  content: string;
  excerpt: string;
  categoryId: string;
  tags: string[];
  isPublished: boolean;
  slug: string;
  description: string;
  status: 'published' | 'draft';
  featuredImage?: string;
  thumbnailUrl?: string;
}

export interface BlogPostWithAuthor extends BlogPost {
  author: Author;
}

export interface BlogPostWithRelated extends BlogPost {
  relatedPosts?: BlogPost[];
}

export interface Bookmark {
  id: string;
  userId: string;
  postId: string;
  post: Post;
  created: string;
}

export interface Comment {
  id: string;
  content: string;
  postSlug: string;
  authorId: string;
  author?: Author;
  created_at: string;
  updated_at: string;
  parentId?: string;
  replies?: Comment[];
  isReported?: boolean;
  likes?: number;
}

export type SortOption = {
  value: string;
  label: string;
};

export const SORT_OPTIONS: SortOption[] = [
  { value: 'latest', label: '最新順' },
  { value: 'oldest', label: '古い順' },
  { value: 'views', label: '閲覧数順' },
  { value: 'likes', label: 'いいね順' }
]; 