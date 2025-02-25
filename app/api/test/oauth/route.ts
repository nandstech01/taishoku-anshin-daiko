import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    // リダイレクトURIを環境変数から取得
    const redirectUri = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/auth/callback'
      : process.env.GOOGLE_REDIRECT_URI;

    if (!code) {
      // 認証URLを生成
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirectUri
      );

      const scopes = [
        'https://www.googleapis.com/auth/webmasters.readonly',
        'https://www.googleapis.com/auth/webmasters',
        'openid',
        'profile',
        'email'
      ];

      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true,
        prompt: 'consent'
      });

      // デバッグ用にログを追加
      console.log('Generated auth URL:', authUrl);
      console.log('Using redirect URI:', redirectUri);

      // 認証URLにリダイレクト
      return NextResponse.redirect(authUrl);
    }

    // コードをトークンに交換
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri
    );

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
    console.error('OAuth error:', error);
    return NextResponse.json({ 
      error: 'OAuth process failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 