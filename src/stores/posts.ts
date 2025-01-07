import { create } from 'zustand';
import { Post } from '@/types/blog';

interface PostsStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  searchPosts: (query: string) => Post[];
}

export const usePostsStore = create<PostsStore>((set, get) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  searchPosts: (query) => {
    const { posts } = get();
    if (!query) return posts;

    const lowercaseQuery = query.toLowerCase();
    return posts.filter((post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.meta_description?.toLowerCase().includes(lowercaseQuery)
    );
  },
})); 