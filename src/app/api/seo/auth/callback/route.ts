import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase/server';

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

    // 開発環境とプロダクション環境でリダイレクトURIを切り替え
    const redirectUri = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/seo/auth/callback'
      : process.env.GOOGLE_REDIRECT_URI;

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri
    );

    // 認証コードをトークンに交換
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Tokens received:', {
      access_token: tokens.access_token ? '存在します' : '存在しません',
      refresh_token: tokens.refresh_token ? '存在します' : '存在しません',
      expiry_date: tokens.expiry_date
    });

    // トークン情報を取得
    if (tokens.access_token) {
      oauth2Client.setCredentials(tokens);
      const oauth2 = google.oauth2('v2');
      const userInfo = await oauth2.userinfo.get({ auth: oauth2Client });
      console.log('User info:', {
        email: userInfo.data.email,
        name: userInfo.data.name
      });

      // Supabaseにトークン情報を保存
      const cookieStore = cookies();
      const supabase = createServerClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        const { error: upsertError } = await supabase
          .from('google_tokens')
          .upsert({
            user_id: session.user.id,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expiry_date: tokens.expiry_date,
            email: userInfo.data.email,
            scope: tokens.scope
          }, {
            onConflict: 'user_id'
          });

        if (upsertError) {
          console.error('Error saving tokens:', upsertError);
          return NextResponse.redirect('/admin/seo/search-console?error=token_save_error');
        }
      }
    }

    // 成功時のリダイレクト
    return NextResponse.redirect('/admin/seo/search-console?success=true');
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect('/admin/seo/search-console?error=token_error');
  }
} 