import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    if (error) {
      console.error('Auth error:', error);
      return NextResponse.redirect('/admin/seo/search-console?error=' + error);
    }

    if (!code) {
      return NextResponse.redirect('/admin/seo/search-console?error=no_code');
    }

    // OAuth2クライアントの作成
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000/api/auth/callback'
    );

    // コードをトークンに交換
    const { tokens } = await oauth2Client.getToken(code);
    
    // デバッグ用にログを追加（機密情報は含めない）
    console.log('Tokens received:', {
      access_token: tokens.access_token ? '取得済み' : 'なし',
      refresh_token: tokens.refresh_token ? '取得済み' : 'なし'
    });

    return NextResponse.json({
      message: 'これらのトークンを.env.localに設定してください：',
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      }
    });
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.json({ 
      error: 'OAuth process failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 