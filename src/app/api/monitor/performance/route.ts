import { NextResponse } from 'next/server';
import { PerformanceMonitor } from '@/lib/google/performance-monitor';
import { createServerClient } from '@/lib/supabase/server';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';

interface MonitoringResult {
  url: string;
  metrics?: {
    lcp: number;
    status: 'good' | 'needs-improvement' | 'poor';
    device: 'mobile' | 'desktop';
    timestamp: string;
  };
  error?: string;
  success: boolean;
}

// 静的なURLリストのフォールバック
const staticUrls = [
  '/',
  '/blog',
  '/diagnosis',
  '/contact'
];

async function getAllUrls() {
  const supabase = createServerClient();
  try {
    // ブログ記事のURLを取得
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('slug')
      .eq('status', 'published');

    if (postsError) {
      console.warn('Error fetching posts from database:', postsError);
      return staticUrls; // エラー時には静的URLのみ返す
    }

    // ブログ記事のURLを生成
    const blogUrls = posts?.map(post => `/blog/${post.slug}`) || [];

    return [...staticUrls, ...blogUrls];
  } catch (error) {
    console.error('Error fetching URLs:', error);
    return staticUrls; // エラー時には静的URLのみ返す
  }
}

export async function GET(request: Request) {
  try {
    console.log('Performance monitoring API called');
    
    // リクエストURLからクエリパラメータを解析
    const { searchParams } = new URL(request.url);
    const timestamp = searchParams.get('_t');
    console.log(`Request timestamp: ${timestamp}`);
    
    // CORSヘッダーを設定
    const headers = {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    };
    
    // URLリストの取得（エラー時には静的なフォールバックリストを使用）
    let urls;
    try {
      urls = await getAllUrls();
      console.log(`Retrieved ${urls.length} URLs for monitoring`);
    } catch (error) {
      console.error('Error getting URLs, using static list:', error);
      urls = staticUrls;
    }
    
    const monitor = new PerformanceMonitor();
    const results: MonitoringResult[] = [];

    // テスト用に処理するURL数を制限（デバッグ時のみ）
    const LIMITED_URLS = process.env.NODE_ENV === 'development' 
      ? urls.slice(0, 1) // 開発環境では最初の1つのURLのみチェック（負荷軽減）
      : urls;
    
    console.log(`Processing ${LIMITED_URLS.length} URLs for performance check`);

    // 並列処理で各URLをチェック（同時実行数を制限）
    const BATCH_SIZE = 1; // さらに小さくして負荷を最小限に
    for (let i = 0; i < LIMITED_URLS.length; i += BATCH_SIZE) {
      const batch = LIMITED_URLS.slice(i, i + BATCH_SIZE);
      
      // バッチ内の各URLを順次処理（並列処理を避けて負荷を減らす）
      for (const url of batch) {
        try {
          const metrics = await monitor.monitorUrl(url, 'mobile');
          
          if ('error' in metrics) {
            results.push({
              url,
              error: String(metrics.error),
              success: false
            });
          } else {
            results.push({
              url,
              metrics: {
                lcp: metrics.lcp,
                status: metrics.status,
                device: metrics.device,
                timestamp: metrics.timestamp
              },
              success: true
            });
          }
        } catch (error) {
          results.push({
            url,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
            success: false
          });
        }
      }

      // バッチ間の待機時間を増やす
      if (i + BATCH_SIZE < LIMITED_URLS.length) {
        await new Promise(resolve => setTimeout(resolve, 3000)); // 3秒間の待機時間
      }
    }

    // 問題のあるURLをカウント
    const issueCount = results.filter(r =>
      r.success && r.metrics?.status === 'poor'
    ).length;

    // エラーのあるURLをカウント
    const errorCount = results.filter(r => !r.success).length;

    return NextResponse.json({
      success: true,
      totalUrls: urls.length,
      issueCount,
      errorCount,
      results: results.map(r => ({
        ...r,
        url: r.url.startsWith('/') ? `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${r.url}` : r.url
      }))
    }, { headers });
  } catch (error) {
    console.error('Error in performance monitoring:', error);
    
    // エラー時も同じヘッダーを設定
    const headers = {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    };
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to monitor performance',
        timestamp: new Date().toISOString()
      },
      { status: 500, headers }
    );
  }
}

// OPTIONSリクエストハンドラを追加してCORSプリフライトリクエストに対応
export async function OPTIONS(request: Request) {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
} 