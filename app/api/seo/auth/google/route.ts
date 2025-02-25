import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { cookies } from 'next/headers';
import { createRouteHandler } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    console.log('=== Starting Google Auth Process ===');
    
    // セッション状態の確認
    const cookieStore = cookies();
    console.log('Available cookies:', cookieStore.getAll().map(c => c.name));
    const authCookie = cookieStore.get('supabase-auth-token');
    console.log('Auth cookie exists:', !!authCookie);

    const supabase = createRouteHandler();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('Initial session check:', {
      hasSession: !!session,
      hasUser: !!session?.user,
      userId: session?.user?.id || 'none',
      error: sessionError
    });

    if (!session?.user) {
      console.error('No session found at auth start');
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // 開発環境とプロダクション環境でリダイレクトURIを切り替え
    const redirectUri = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/seo/auth/callback'
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

    // stateパラメータにセッション情報を含める
    const state = Buffer.from(JSON.stringify({
      userId: session.user.id,
      timestamp: Date.now()
    })).toString('base64');

    // 認証URLを生成
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true,
      prompt: 'consent',
      state: state
    });

    console.log('Generated auth URL with state parameter');
    console.log('=== Google Auth Process Initialized ===');

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