import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';

export async function GET() {
  console.log('Auth status check started');
  try {
    // 設定値の確認（機密情報は含めない）
    const configStatus = {
      hasClientId: !!process.env.GOOGLE_CLIENT_ID,
      hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      hasRedirectUri: !!process.env.GOOGLE_REDIRECT_URI,
      hasAccessToken: !!process.env.GOOGLE_ACCESS_TOKEN,
      hasRefreshToken: !!process.env.GOOGLE_REFRESH_TOKEN,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
    };
    
    console.log('Config status:', configStatus);

    // OAuth2クライアントの作成
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    console.log('OAuth2 client created');

    // 現在の認証情報を設定
    if (process.env.GOOGLE_ACCESS_TOKEN && process.env.GOOGLE_REFRESH_TOKEN) {
      oauth2Client.setCredentials({
        access_token: process.env.GOOGLE_ACCESS_TOKEN,
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      });
      console.log('Credentials set to OAuth2 client');
    } else {
      console.log('No tokens available to set');
    }

    // トークン情報の取得を試行
    let tokenInfo = null;
    try {
      if (process.env.GOOGLE_ACCESS_TOKEN) {
        console.log('Attempting to get token info');
        tokenInfo = await oauth2Client.getTokenInfo(
          process.env.GOOGLE_ACCESS_TOKEN
        );
        console.log('Token info retrieved successfully');
      }
    } catch (error) {
      console.error('Token info error:', error);
    }

    const response = {
      success: true,
      config: configStatus,
      tokenInfo: tokenInfo ? {
        scope: tokenInfo.scopes,
        expiryDate: tokenInfo.expiry_date,
      } : null,
    };

    console.log('Sending response:', response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Auth status check failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }, { status: 500 });
  }
} 