'use client';

import React from 'react';
import { Card } from '@/components/common/Card';
import { useAnalytics } from '@/hooks/useAnalytics';
import { PeriodSelector } from '@/components/admin/PeriodSelector';
import { aggregateDailyViews, calculateSearchMetrics, createChartData } from '@/utils/analytics';
import type { Database } from '@/lib/supabase/database.types';

type AnalyticsRow = Database['public']['Tables']['analytics']['Row'];

interface PostAnalyticsProps {
  slug: string;
  title: string;
}

export function PostAnalytics({ slug, title }: PostAnalyticsProps) {
  const [days, setDays] = React.useState(30);
  const { analyticsData, isLoading, error } = useAnalytics(slug);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;
  if (!analyticsData) return <div>No analytics data available</div>;

  const dailyViews = aggregateDailyViews(analyticsData);
  const viewsData = createChartData(dailyViews);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <PeriodSelector value={days} onChange={setDays} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h4 className="text-base font-medium mb-4">アクセス統計</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">総閲覧数</p>
                <p className="text-2xl font-bold">{analyticsData.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">ユニーク訪問者数</p>
                <p className="text-2xl font-bold">
                  {new Set(analyticsData.map(d => d.visitor_id)).size}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 