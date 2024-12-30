import { create } from 'zustand';
import { Category } from '@/types/blog';
import { supabase } from '@/lib/supabase/client';

interface CategoriesStore {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  addCategory: (category: Category) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;

      const categories: Category[] = data.map(item => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description
      }));

      set({ categories, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '不明なエラーが発生しました', loading: false });
    }
  },

  addCategory: async (category: Category) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('categories')
        .insert([{
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description
        }]);

      if (error) throw error;

      set((state) => ({
        categories: [...state.categories, category],
        loading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '不明なエラーが発生しました', loading: false });
    }
  },

  updateCategory: async (id: string, category: Partial<Category>) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? { ...cat, ...category } : cat
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '不明なエラーが発生しました', loading: false });
    }
  },

  deleteCategory: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '不明なエラーが発生しました', loading: false });
    }
  }
})); 