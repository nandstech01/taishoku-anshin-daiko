import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BlogPost, BlogPostWithAuthor } from '@/types/blog';

interface PostsStore {
  posts: BlogPostWithAuthor[];
  setPosts: (posts: BlogPostWithAuthor[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  addPost: (post: BlogPostWithAuthor) => Promise<void>;
}

export const usePostsStore = create<PostsStore>()(
  persist(
    (set) => ({
      posts: [],
      setPosts: (posts) => set({ posts }),
      loading: false,
      setLoading: (loading) => set({ loading }),
      error: null,
      setError: (error) => set({ error }),
      updatePost: async (id, updatedPost) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, ...updatedPost } as BlogPostWithAuthor : post
          ),
        }));
      },
      deletePost: async (id) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        }));
      },
      addPost: async (post) => {
        set((state) => ({
          posts: [...state.posts, post],
        }));
      },
    }),
    {
      name: 'blog-posts-storage',
      skipHydration: true,
    }
  )
); 