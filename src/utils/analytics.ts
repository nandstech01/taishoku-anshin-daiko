import { PageView, SearchAnalytics } from '@/types/analytics';

export function aggregateDailyViews(data: PageView[]): Record<string, number> {
  return data.reduce((acc, curr) => {
    if (!curr.created_at) return acc;
    const date = new Date(curr.created_at).toLocaleDateString('ja-JP');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

export function calculateSearchMetrics(data: SearchAnalytics[]) {
  const totalClicks = data.reduce((sum, d) => sum + d.clicks, 0);
  const totalImpressions = data.reduce((sum, d) => sum + d.impressions, 0);
  const averagePosition = data.length > 0
    ? (data.reduce((sum, d) => sum + d.position, 0) / data.length).toFixed(1)
    : '0.0';

  return {
    totalClicks,
    totalImpressions,
    averagePosition,
    ctr: totalImpressions > 0
      ? ((totalClicks / totalImpressions) * 100).toFixed(1)
      : '0.0'
  };
}

export function createChartData(dailyViews: Record<string, number>) {
  return {
    labels: Object.keys(dailyViews),
    datasets: [
      {
        label: 'ページビュー',
        data: Object.values(dailyViews),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
} 