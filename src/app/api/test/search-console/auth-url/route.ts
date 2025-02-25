import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000/api/test/search-console/callback' // ポート3000に変更
    );

    const scopes = [
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/webmasters'
    ];

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true,
      prompt: 'consent'
    });

    return NextResponse.json({
      success: true,
      authUrl
    });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
} 