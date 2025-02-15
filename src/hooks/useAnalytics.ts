import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/supabase';
import type { Database } from '@/lib/supabase/database.types';

type AnalyticsRow = Database['public']['Tables']['analytics']['Row'];

export function useAnalytics(slug?: string) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 初期データの取得
    const fetchAnalytics = async () => {
      try {
        const query = supabase
          .from('analytics')
          .select('*')
          .order('created_at', { ascending: false });

        if (slug) {
          query.eq('slug', slug);
        }

        const { data, error: fetchError } = await query;
        
        if (fetchError) throw fetchError;
        setAnalyticsData(data as AnalyticsRow[]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch analytics'));
      } finally {
        setIsLoading(false);
      }
    };

    // リアルタイムサブスクリプションの設定
    const subscription = supabase
      .channel('analytics_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'analytics',
          filter: slug ? `slug=eq.${slug}` : undefined
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newRow = payload.new as AnalyticsRow;
            setAnalyticsData(prev => [newRow, ...prev]);
          }
        }
      )
      .subscribe();

    fetchAnalytics();

    return () => {
      subscription.unsubscribe();
    };
  }, [slug]);

  return { analyticsData, isLoading, error };
} 