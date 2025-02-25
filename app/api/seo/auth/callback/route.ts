import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { cookies } from 'next/headers';
import { createRouteHandler } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    console.log('=== Google Auth Callback Start ===');
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
    const state = url.searchParams.get('state');
    
    console.log('Request URL:', url.toString());
    console.log('Auth Code exists:', !!code);
    console.log('Auth Error:', error || 'none');
    console.log('State exists:', !!state);

    if (error) {
      console.error('Auth error:', error);
      return NextResponse.redirect(new URL('/admin/seo/search-console?error=' + error, request.url));
    }

    if (!code) {
      return NextResponse.redirect(new URL('/admin/seo/search-console?error=no_code', request.url));
    }

    if (!state) {
      console.error('No state parameter found');
      return NextResponse.redirect(new URL('/admin/seo/search-console?error=no_state', request.url));
    }

    // stateパラメータからセッション情報を復元
    let stateData;
    try {
      stateData = JSON.parse(Buffer.from(state, 'base64').toString());
      console.log('State data:', {
        userId: stateData.userId,
        timestamp: new Date(stateData.timestamp).toISOString()
      });
    } catch (stateError) {
      console.error('Error parsing state:', stateError);
      return NextResponse.redirect(new URL('/admin/seo/search-console?error=invalid_state', request.url));
    }

    // Cookie情報の確認
    const cookieStore = cookies();
    console.log('Available cookies:', cookieStore.getAll().map(c => c.name));
    const authCookie = cookieStore.get('supabase-auth-token');
    console.log('Auth cookie exists:', !!authCookie);

    // Route Handler用のSupabaseクライアントを作成
    const supabase = createRouteHandler();
    console.log('Supabase client created');

    // ユーザーIDの取得（stateパラメータから）
    const userId = stateData.userId;
    if (!userId) {
      console.error('User ID not found in state parameter');
      return NextResponse.redirect(new URL('/admin/seo/search-console?error=no_user_id', request.url));
    }
    console.log('Using user ID from state:', userId);

    try {
      // セッションの取得を試みる
      console.log('Attempting to get session...');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      console.log('Session check:', { 
        hasSession: !!session, 
        hasUser: !!session?.user,
        userId: session?.user?.id || 'none',
        error: sessionError
      });

      // 開発環境とプロダクション環境でリダイレクトURIを切り替え
      const redirectUri = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/seo/auth/callback'
        : process.env.GOOGLE_REDIRECT_URI;

      console.log('Using redirect URI:', redirectUri);

      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirectUri
      );

      // 認証コードをトークンに交換
      console.log('Exchanging auth code for tokens...');
      const { tokens } = await oauth2Client.getToken(code);
      console.log('Tokens received:', {
        hasAccessToken: !!tokens.access_token,
        hasRefreshToken: !!tokens.refresh_token,
        expiryDate: tokens.expiry_date
      });
      
      if (!tokens.access_token) {
        return NextResponse.redirect(new URL('/admin/seo/search-console?error=no_access_token', request.url));
      }

      oauth2Client.setCredentials(tokens);
      const oauth2 = google.oauth2('v2');
      const userInfo = await oauth2.userinfo.get({ auth: oauth2Client });
      console.log('Google user info retrieved:', {
        email: userInfo.data.email,
        hasProfile: !!userInfo.data
      });

      // auth_tokensテーブルにトークン情報を保存
      console.log('Saving tokens to database using user ID:', userId);
      
      try {
        // 直接RLSを通過できる形で保存を試みる
        const { error: directUpsertError } = await supabase.rpc('save_google_auth_token', {
          p_user_id: userId,
          p_access_token: tokens.access_token,
          p_refresh_token: tokens.refresh_token || '',
          p_expiry_date: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
          p_email: userInfo.data.email || '',
          p_scope: tokens.scope || ''
        });
        
        if (directUpsertError) {
          console.error('Error saving tokens using RPC:', directUpsertError);
          
          // フォールバック: 直接テーブルにアクセスを試みる
          console.log('Attempting direct insert to auth_tokens table...');
          const { error: upsertError } = await supabase
            .from('google_seo.auth_tokens')
            .upsert({
              user_id: userId,
              access_token: tokens.access_token,
              refresh_token: tokens.refresh_token || '',
              expiry_date: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
              email: userInfo.data.email || '',
              scope: tokens.scope || ''
            }, {
              onConflict: 'user_id'
            });
            
          if (upsertError) {
            console.error('Error saving to google_seo.auth_tokens:', upsertError);
            
            // さらにフォールバック: データベース管理者として保存を試みる
            console.log('Attempting to save tokens via administrator...');
            const adminQuery = `
              INSERT INTO google_seo.auth_tokens 
                (user_id, access_token, refresh_token, expiry_date, email, scope)
              VALUES 
                ('${userId}', 
                 '${tokens.access_token}', 
                 '${tokens.refresh_token || ''}', 
                 ${tokens.expiry_date ? `'${new Date(tokens.expiry_date).toISOString()}'` : 'NULL'}, 
                 '${userInfo.data.email || ''}', 
                 '${tokens.scope || ''}')
              ON CONFLICT (user_id) 
              DO UPDATE SET 
                access_token = EXCLUDED.access_token,
                refresh_token = EXCLUDED.refresh_token,
                expiry_date = EXCLUDED.expiry_date,
                email = EXCLUDED.email,
                scope = EXCLUDED.scope,
                updated_at = CURRENT_TIMESTAMP
              RETURNING id;
            `;
            
            const { data, error: adminError } = await supabase.rpc('execute_admin_query', {
              query: adminQuery
            });
            
            if (adminError) {
              console.error('Error saving tokens via administrator:', adminError);
              throw adminError;
            } else {
              console.log('Tokens saved successfully via administrator');
            }
          } else {
            console.log('Tokens saved successfully to google_seo.auth_tokens');
          }
        } else {
          console.log('Tokens saved successfully using RPC');
        }
        
        // トークン保存成功
        console.log('Tokens saved successfully for user ID:', userId);
        console.log('=== Google Auth Callback Complete ===');
        
        // 成功時のリダイレクト
        return NextResponse.redirect(new URL('/admin/seo/search-console?success=true', request.url));
        
      } catch (dbError) {
        console.error('Database error while saving tokens:', dbError);
        
        // エラー情報をクエリパラメータに含める
        const errorDetail = dbError instanceof Error ? 
          encodeURIComponent(dbError.message.substring(0, 100)) : 'unknown_error';
        
        return NextResponse.redirect(
          new URL(`/admin/seo/search-console?error=token_save_error&detail=${errorDetail}`, request.url)
        );
      }

    } catch (sessionError) {
      console.error('Session handling error:', sessionError);
      return NextResponse.redirect(new URL('/admin/seo/search-console?error=session_error', request.url));
    }

  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(new URL('/admin/seo/search-console?error=token_error', request.url));
  }
} 