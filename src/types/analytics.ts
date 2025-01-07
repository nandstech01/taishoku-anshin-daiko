import type { Database } from '@/lib/supabase/database.types';

export type PageView = Database['public']['Tables']['analytics']['Row'];

export interface SearchAnalytics {
  id: string;
  slug: string;
  query: string;
  clicks: number;
  impressions: number;
  position: number;
  date: string;
  device: string;
  country: string;
}

export interface AnalyticsResponse {
  analytics: PageView[];
  search: SearchAnalytics[];
} 