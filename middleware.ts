import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  try {
    const { data: { session } } = await supabase.auth.getSession();
    const path = req.nextUrl.pathname;
    console.log('Middleware - Path:', path);
    console.log('Middleware - Session:', session?.user?.email);

    // 認証チェックを一時的にコメントアウト
    /*
    if (path.startsWith('/admin/dashboard') && !session) {
      console.log('Middleware - No session, redirecting to login');
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    if (path === '/admin' && session) {
      console.log('Middleware - Session found, redirecting to dashboard');
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }
    */

    return res;
  } catch (error) {
    console.error('Middleware - Error:', error);
    return res;
  }
}

export const config = {
  matcher: ['/admin', '/admin/dashboard/:path*'],
}; 