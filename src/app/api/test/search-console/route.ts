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

    // サイトの一覧を取得してテスト
    const data = await client.getSiteList();
    
    return NextResponse.json({
      success: true,
      message: 'Search Console API is working',
      data
    });
  } catch (error) {
    console.error('Search Console API test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      details: error
    }, { status: 500 });
  }
} 