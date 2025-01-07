import type { Database } from '@/lib/supabase/database.types';

export type Post = Database['public']['Tables']['posts']['Row'] & {
  description?: string;
  thumbnail_url?: string;
  category_slug?: string;
  status: string;
  views: number;
  tags?: string[];
  seo_keywords?: string[];
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}; 