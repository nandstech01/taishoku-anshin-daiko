import { NextResponse } from 'next/server';
import { SearchConsoleClient } from '@/lib/google/search-console-client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) {
      throw new Error('Site URL is not configured');
    }

    // OAuth2クライアントを作成
    const auth = await SearchConsoleClient.createOAuth2Client();
    const client = new SearchConsoleClient(auth, siteUrl);

    // 各種データを取得
    const [siteList, searchAnalytics, sitemapStatus, searchPerformance] = await Promise.all([
      client.getSiteList(),
      client.getSearchAnalytics(
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30日前
        new Date().toISOString().split('T')[0] // 今日
      ),
      client.getSitemapStatus(),
      client.getSearchPerformance()
    ]);

    return NextResponse.json({
      success: true,
      data: {
        siteList,
        searchAnalytics,
        sitemapStatus,
        searchPerformance
      }
    });
  } catch (error) {
    console.error('Error in search console API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch search console data',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 