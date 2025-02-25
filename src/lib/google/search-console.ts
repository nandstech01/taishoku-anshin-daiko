import { google } from 'googleapis';
import { supabase } from '@/lib/supabase/supabase';
import { searchconsole_v1 } from 'googleapis';
import type { Database } from '@/lib/supabase/database.types';

type Schema$ApiDataRow = searchconsole_v1.Schema$ApiDataRow;
type Post = Database['public']['Tables']['posts']['Row'];

interface SearchAnalyticsRow {
  keys?: string[] | null;
  clicks: number;
  impressions: number;
  position: number;
}

interface SEOIssue {
  type: 'redirect' | 'index' | 'performance' | 'mobile' | 'structure';
  severity: 'high' | 'medium' | 'low';
  location: string;
  description: string;
  recommendation: string;
  affectedUrls: string[];
  codeReference?: {
    file: string;
    lines: number[];
  };
}

interface PerformanceMetrics {
  fcp: number;  // First Contentful Paint
  lcp: number;  // Largest Contentful Paint
  cls: number;  // Cumulative Layout Shift
  fid: number;  // First Input Delay
  ttfb: number; // Time to First Byte
}

interface IndexingStatus {
  url: string;
  status: 'indexed' | 'not-indexed' | 'blocked' | 'error';
  lastCrawled?: string;
  issues?: string[];
}

const searchConsole = google.searchconsole('v1');

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/webmasters']
});

export async function fetchAndStoreSearchAnalytics(startDate: string, endDate: string) {
  try {
    const response = await searchConsole.searchanalytics.query({
      auth,
      siteUrl: process.env.SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page', 'query', 'device', 'country'],
        rowLimit: 5000
      }
    });

    if (!response.data.rows) {
      console.log('No search analytics data found');
      return;
    }

    const analyticsData = response.data.rows.map((row: Schema$ApiDataRow) => {
      const [page, query, device, country] = row.keys || [];
      const postSlug = page?.split('/').pop() || '';

      return {
        slug: postSlug,
        query,
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        position: row.position || 0,
        date: startDate,
        device,
        country,
        created_at: new Date().toISOString()
      };
    });

    const { data: posts } = await supabase
      .from('posts')
      .select('slug');

    const slugSet = new Set((posts as Post[] || []).map(post => post.slug));

    const validData = analyticsData.filter(data => slugSet.has(data.slug));

    const { error } = await supabase
      .from('search_analytics')
      .upsert(validData, {
        onConflict: 'slug,date,query',
        ignoreDuplicates: false
      });

    if (error) {
      throw error;
    }

    console.log('Search analytics data stored successfully');
    return validData;

  } catch (error) {
    console.error('Error fetching/storing search analytics:', error);
    throw error;
  }
}

export async function getSearchAnalytics(slug: string, days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('search_analytics')
    .select('*')
    .eq('slug', slug)
    .gte('date', startDate.toISOString())
    .order('date', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function monitorSEOIssues(): Promise<SEOIssue[]> {
  const issues: SEOIssue[] = [];
  
  try {
    // リダイレクトの監視
    const redirectIssues = await checkRedirects();
    issues.push(...redirectIssues);

    // インデックスの監視
    const indexingIssues = await checkIndexingStatus();
    issues.push(...indexingIssues);

    // パフォーマンスの監視
    const performanceIssues = await checkPerformance();
    issues.push(...performanceIssues);

    return issues;
  } catch (error) {
    console.error('Error monitoring SEO issues:', error);
    throw error;
  }
}

async function checkRedirects(): Promise<SEOIssue[]> {
  const issues: SEOIssue[] = [];
  try {
    const response = await searchConsole.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl: process.env.SITE_URL || '',
        siteUrl: process.env.SITE_URL || '',
        languageCode: 'ja'
      }
    });

    const result = await response.data;
    if (result.inspectionResult?.indexStatusResult?.verdict === 'REDIRECT') {
      issues.push({
        type: 'redirect',
        severity: 'medium',
        location: process.env.SITE_URL || '',
        description: 'リダイレクトが検出されました',
        recommendation: 'リダイレクトチェーンを確認し、必要に応じて直接的なリンクに修正してください',
        affectedUrls: [process.env.SITE_URL || '']
      });
    }

  } catch (error) {
    console.error('Error checking redirects:', error);
  }
  return issues;
}

async function checkIndexingStatus(): Promise<SEOIssue[]> {
  const issues: SEOIssue[] = [];
  try {
    const response = await searchConsole.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl: process.env.SITE_URL || '',
        siteUrl: process.env.SITE_URL || '',
        languageCode: 'ja'
      }
    });

    const result = await response.data;
    const indexStatus = result.inspectionResult?.indexStatusResult;
    if (indexStatus?.verdict !== 'PASS') {
      issues.push({
        type: 'index',
        severity: 'high',
        location: process.env.SITE_URL || '',
        description: `インデックスの問題: ${indexStatus?.verdict}`,
        recommendation: 'robots.txtとサイトマップを確認し、インデックス設定を見直してください',
        affectedUrls: [process.env.SITE_URL || '']
      });
    }

  } catch (error) {
    console.error('Error checking indexing status:', error);
  }
  return issues;
}

async function checkPerformance(): Promise<SEOIssue[]> {
  const issues: SEOIssue[] = [];
  try {
    // PageSpeed Insights APIを使用してパフォーマンスデータを取得
    const pagespeed = google.pagespeedonline('v5');
    const response = await pagespeed.pagespeedapi.runpagespeed({
      url: process.env.SITE_URL || '',
      strategy: 'mobile'
    });

    const result = await response.data;
    const metrics = result.lighthouseResult?.audits;

    if (metrics) {
      // Core Web Vitalsのチェック
      const lcp = metrics['largest-contentful-paint']?.numericValue;
      const fid = metrics['first-input-delay']?.numericValue;
      const cls = metrics['cumulative-layout-shift']?.numericValue;

      if (lcp && lcp > 2500) {
        issues.push({
          type: 'performance',
          severity: 'high',
          location: process.env.SITE_URL || '',
          description: `Largest Contentful Paint (LCP) が遅い: ${Math.round(lcp)}ms`,
          recommendation: 'メインコンテンツの読み込み速度を改善してください',
          affectedUrls: [process.env.SITE_URL || '']
        });
      }

      if (cls && cls > 0.1) {
        issues.push({
          type: 'performance',
          severity: 'medium',
          location: process.env.SITE_URL || '',
          description: `Cumulative Layout Shift (CLS) が高い: ${cls.toFixed(3)}`,
          recommendation: 'レイアウトの安定性を改善してください',
          affectedUrls: [process.env.SITE_URL || '']
        });
      }

      // モバイルフレンドリーチェック
      const mobileScore = result.lighthouseResult?.categories?.['performance']?.score;
      if (mobileScore && mobileScore < 0.9) {
        issues.push({
          type: 'mobile',
          severity: 'medium',
          location: process.env.SITE_URL || '',
          description: `モバイルパフォーマンススコアが低い: ${Math.round(mobileScore * 100)}%`,
          recommendation: 'モバイル向けの最適化を行ってください',
          affectedUrls: [process.env.SITE_URL || '']
        });
      }
    }

  } catch (error) {
    console.error('Error checking performance:', error);
  }
  return issues;
} 