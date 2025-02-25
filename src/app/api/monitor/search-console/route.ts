import { NextResponse } from 'next/server';
import { SearchConsoleClient } from '@/lib/google/search-console-client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
    
    // OAuth2クライアントを作成
    const auth = await SearchConsoleClient.createOAuth2Client();
    const client = new SearchConsoleClient(auth, siteUrl);

    // 各種データを取得
    const [siteList, searchAnalytics, sitemapStatus] = await Promise.all([
      client.getSiteList(),
      client.getSearchAnalytics(
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30日前
        new Date().toISOString().split('T')[0] // 今日
      ),
      client.getSitemapStatus(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        siteList,
        searchAnalytics,
        sitemapStatus,
      },
    });
  } catch (error) {
    console.error('Error in search console monitoring:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search console data' },
      { status: 500 }
    );
  }
} 