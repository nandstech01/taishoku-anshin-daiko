import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  try {
    console.log('Starting Google auth process...');

    // 開発環境とプロダクション環境でリダイレクトURIを切り替え
    const redirectUri = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/auth/callback'
      : process.env.GOOGLE_REDIRECT_URI;

    console.log('Using redirect URI:', redirectUri);

    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      throw new Error('Google OAuth credentials are not configured');
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri
    );

    // Search Console APIに必要なスコープを設定
    const scopes = [
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/webmasters',
      'openid',
      'profile',
      'email'
    ];

    // 認証URLを生成
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true,
      prompt: 'consent'
    });

    console.log('Generated auth URL:', authUrl);

    return NextResponse.json({
      success: true,
      authUrl
    });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate authentication URL'
    }, { status: 500 });
  }
} 