import { NextResponse } from 'next/server';
import { SearchConsoleClient } from '@/lib/google/search-console-client';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    console.log('Inspecting URLs through Search Console API...');
    
    // リクエストボディからURLのリストを取得
    const { urls } = await request.json();
    
    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'URLリストが必要です'
        },
        { status: 400 }
      );
    }
    
    console.log(`Requested ${urls.length} URLs for inspection`);
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) {
      throw new Error('Site URL is not configured');
    }

    // OAuth2クライアントを作成
    const auth = await SearchConsoleClient.createOAuth2Client();
    const client = new SearchConsoleClient(auth, siteUrl);

    // URLを検査
    const results = await client.inspectUrls(urls);
    
    console.log(`Inspection completed for ${results.length} URLs`);

    return NextResponse.json({
      success: true,
      data: {
        results,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in URL inspection API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to inspect URLs',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 