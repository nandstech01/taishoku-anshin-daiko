import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const REQUIRED_SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/webmasters',
  'https://www.googleapis.com/auth/cloud-platform',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'openid'
];

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // 認証URLを生成
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: REQUIRED_SCOPES,
      include_granted_scopes: true,
      prompt: 'consent'
    });

    // 認証URLにリダイレクト
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Error initiating auth:', error);
    return NextResponse.json(
      { error: 'Failed to initiate authentication' },
      { status: 500 }
    );
  }
} 