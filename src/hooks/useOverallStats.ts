'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/supabase';
import type { Database } from '@/lib/supabase/database.types';

interface DeviceStat {
  device: string;
  count: number;
}

interface CountryStat {
  country: string;
  count: number;
}

interface OverallStats {
  totalViews: number;
  uniqueVisitors: number;
  averageTimeOnSite: number;
  deviceStats: DeviceStat[];
  countryStats: CountryStat[];
  topPages: Array<{
    path: string;
    views: number;
  }>;
}

export function useOverallStats(days: number = 30) {
  const [stats, setStats] = useState<OverallStats>({
    totalViews: 0,
    uniqueVisitors: 0,
    averageTimeOnSite: 0,
    deviceStats: [],
    countryStats: [],
    topPages: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 総ビュー数とユニークビジター数を取得
        const { data: viewsData, error: viewsError } = await supabase
          .from('analytics')
          .select('path, user_agent')
          .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

        if (viewsError) throw viewsError;

        // ユニークビジター数の計算（user_agentでグループ化）
        const uniqueVisitors = new Set(viewsData?.map((d: { user_agent: string }) => d.user_agent)).size;

        // トップページの取得
        const pageViews = viewsData?.reduce((acc: Record<string, number>, curr: { path: string }) => {
          acc[curr.path] = (acc[curr.path] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const topPages = Object.entries(pageViews || {})
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .slice(0, 5)
          .map(([path, views]) => ({ path, views: views as number }));

        setStats({
          totalViews: viewsData?.length || 0,
          uniqueVisitors,
          averageTimeOnSite: 0,
          deviceStats: [], // 現時点では空配列を返す
          countryStats: [], // 現時点では空配列を返す
          topPages,
        });
      } catch (error) {
        console.error('Error fetching overall stats:', error);
        setError(error instanceof Error ? error : new Error('Failed to fetch stats'));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [days]);

  return {
    ...stats,
    loading,
    error
  };
} 