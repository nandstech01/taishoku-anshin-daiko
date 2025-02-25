import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { cookies } from 'next/headers';
import { createRouteHandler } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    console.log('=== Starting Google Auth Process (Server) ===');
    const requestUrl = new URL(request.url);
    console.log('Request URL:', requestUrl.toString());
    console.log('Request method:', request.method);
    console.log('Query params:', Object.fromEntries(requestUrl.searchParams.entries()));
    
    // クエリパラメータからユーザーIDを取得
    const userId = requestUrl.searchParams.get('userId');
    console.log('User ID from query:', userId);
    
    // 認証ヘッダーを確認
    const authHeader = request.headers.get('authorization');
    console.log('Auth header present:', !!authHeader);
    
    // セッション状態の確認
    const cookieStore = cookies();
    const cookieList = cookieStore.getAll();
    console.log('Available cookies:', cookieList.map(c => ({ 
      name: c.name, 
      value: c.name === 'supabase-auth-token' ? '(hidden)' : c.value.substring(0, 10) + '...' 
    })));

    const supabase = createRouteHandler();
    let session;
    let sessionError;

    // セッションの取得を試みる
    try {
      const sessionResult = await supabase.auth.getSession();
      session = sessionResult.data.session;
      sessionError = sessionResult.error;
    } catch (error) {
      console.error('Error getting session:', error);
      sessionError = error;
    }
    
    console.log('Session check result:', {
      hasSession: !!session,
      hasUser: !!session?.user,
      userId: session?.user?.id,
      error: sessionError
    });

    // セッションが無い場合でもクエリパラメータにユーザーIDがあれば続行
    if (!session?.user && !userId) {
      console.error('No session or userId found');
      return NextResponse.json({
        success: false,
        error: 'セッションが見つかりません。再度ログインしてください。'
      }, { 
        status: 401,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Content-Type': 'application/json'
        }
      });
    }

    // セッションまたはクエリのユーザーIDを使用
    const effectiveUserId = session?.user?.id || userId;
    console.log('Using effective user ID:', effectiveUserId);

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
      userId: effectiveUserId,
      timestamp: Date.now()
    })).toString('base64');

    // 認証URLを生成
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true,
      prompt: 'consent',
      state
    });

    console.log('Generated auth URL with state parameter');
    console.log('=== Google Auth Process Initialized ===');

    const response = NextResponse.json({
      success: true,
      authUrl
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Content-Type': 'application/json'
      }
    });

    // セッションCookieを保持
    const authCookie = cookieStore.get('supabase-auth-token');
    if (authCookie) {
      response.cookies.set('supabase-auth-token', authCookie.value, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true
      });
    }

    return response;

  } catch (error) {
    console.error('Error generating auth URL:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate authentication URL'
    }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Content-Type': 'application/json'
      }
    });
  }
} 