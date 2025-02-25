import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // OAuth2クライアントの作成
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // 認証情報の設定
    oauth2Client.setCredentials({
      access_token: process.env.GOOGLE_ACCESS_TOKEN,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    // Search Console APIのインスタンスを作成
    const searchconsole = google.webmasters({
      version: 'v3',
      auth: oauth2Client,
    });

    // デバッグ用にログを追加
    console.log('Attempting to fetch site list...');

    try {
      // サイトの一覧を取得（基本的なテスト）
      const sites = await searchconsole.sites.list();
      console.log('Sites retrieved successfully');

      return NextResponse.json({
        success: true,
        message: 'Search Console APIが正常に動作しています',
        sites: sites.data
      });
    } catch (apiError) {
      console.error('API request failed:', apiError);
      return NextResponse.json({
        success: false,
        error: 'Search Console APIリクエストに失敗しました',
        details: apiError instanceof Error ? apiError.message : 'Unknown API error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Search Console test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      details: error
    }, { status: 500 });
  }
} 