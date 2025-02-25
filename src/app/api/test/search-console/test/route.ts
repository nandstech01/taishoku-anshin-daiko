import { NextResponse } from 'next/server';
import { google } from 'googleapis';

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

    // サイトの一覧を取得
    const sites = await searchconsole.sites.list();

    return NextResponse.json({
      success: true,
      sites: sites.data,
    });
  } catch (error) {
    console.error('Search Console API test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      details: error,
    }, { status: 500 });
  }
} 