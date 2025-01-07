'use client';

import React from 'react';
import { Card } from '@/components/common/Card';
import { Chart } from '@/components/admin/Chart';
import { useAnalytics } from '@/hooks/useAnalytics';
import { aggregateDailyViews, createChartData } from '@/utils/analytics';

interface AnalyticsProps {
  slug: string;
  showSearchData?: boolean;
}

export function Analytics({ slug }: AnalyticsProps) {
  const { analyticsData, isLoading, error } = useAnalytics(slug);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;
  if (!analyticsData) return <div>No analytics data available</div>;

  const dailyViews = aggregateDailyViews(analyticsData);
  const viewsData = createChartData(dailyViews);

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">アクセス推移</h3>
          <Chart data={viewsData} height={250} />
        </div>
      </Card>
    </div>
  );
} 