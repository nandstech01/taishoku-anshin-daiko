import { NextResponse } from 'next/server';
import { PerformanceMonitor } from '@/lib/google/performance-monitor';
import { createServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface MonitoringResult {
  url: string;
  metrics?: {
    lcp: number;
    status: 'good' | 'needs-improvement' | 'poor';
    device: 'mobile' | 'desktop';
    timestamp: string;
  };
  error?: unknown;
  success: boolean;
}

async function getAllUrls() {
  const supabase = createServerClient();
  try {
    // ブログ記事のURLを取得
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('slug')
      .eq('status', 'published');

    if (postsError) throw postsError;

    // 固定ページのURL一覧
    const staticUrls = [
      '/',
      '/blog',
      '/diagnosis',
      '/contact'
    ];

    // ブログ記事のURLを生成
    const blogUrls = posts?.map(post => `/blog/${post.slug}`) || [];

    return [...staticUrls, ...blogUrls];
  } catch (error) {
    console.error('Error fetching URLs:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const urls = await getAllUrls();
    const monitor = new PerformanceMonitor();
    const results: MonitoringResult[] = [];

    // 並列処理で各URLをチェック
    const promises = urls.map(url => monitor.monitorUrl(url, 'mobile'));
    const monitoringResults = await Promise.allSettled(promises);

    // 結果を処理
    monitoringResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push({
          url: urls[index],
          metrics: result.value,
          success: true
        });
      } else {
        results.push({
          url: urls[index],
          error: result.reason,
          success: false
        });
      }
    });

    // 問題のあるURLをカウント
    const issueCount = results.filter(r =>
      r.success && r.metrics?.status === 'poor'
    ).length;

    return NextResponse.json({
      success: true,
      totalUrls: urls.length,
      issueCount,
      results
    });
  } catch (error) {
    console.error('Error in performance monitoring:', error);
    return NextResponse.json(
      { error: 'Failed to monitor performance' },
      { status: 500 }
    );
  }
} 