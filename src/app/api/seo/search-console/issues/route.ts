import { NextResponse } from 'next/server';
import { SearchConsoleClient } from '@/lib/google/search-console-client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('Fetching Search Console indexing issues...');
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) {
      throw new Error('Site URL is not configured');
    }

    // OAuth2クライアントを作成
    const auth = await SearchConsoleClient.createOAuth2Client();
    const client = new SearchConsoleClient(auth, siteUrl);

    // インデックスの問題を取得
    const issues = await client.getIndexingIssues();
    
    console.log('Indexing issues retrieved:', Object.keys(issues).map(key => ({ 
      category: key, 
      count: issues[key].count 
    })));

    return NextResponse.json({
      success: true,
      data: {
        issues,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in search console issues API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch search console issues',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 