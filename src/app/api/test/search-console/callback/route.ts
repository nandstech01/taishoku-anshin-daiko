import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    if (error) {
      console.error('Auth error:', error);
      return NextResponse.json({
        success: false,
        error
      }, { status: 400 });
    }

    if (!code) {
      return NextResponse.json({
        success: false,
        error: 'No code provided'
      }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000/api/test/search-console/callback'
    );

    const { tokens } = await oauth2Client.getToken(code);
    console.log('Tokens received:', {
      access_token: tokens.access_token ? '存在します' : '存在しません',
      refresh_token: tokens.refresh_token ? '存在します' : '存在しません',
      expiry_date: tokens.expiry_date
    });

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: tokens.expiry_date
      }
    });
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
} 