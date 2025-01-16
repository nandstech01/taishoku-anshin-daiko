import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // URLの正規化処理
  const url = req.nextUrl.clone();
  const shouldRedirect = !url.pathname.endsWith('/') && !url.pathname.match(/\.[^/]+$/);
  
  if (shouldRedirect) {
    url.pathname += '/';
    return NextResponse.redirect(url);
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // ブログ記事へのアクセスのみを記録
  if (req.nextUrl.pathname.startsWith('/blog/')) {
    const slug = req.nextUrl.pathname.split('/').pop();
    
    try {
      await supabase.from('analytics').insert({
        device_type: req.headers.get('user-agent')?.includes('Mobile') ? 'mobile' : 'desktop',
        country: req.geo?.country || 'unknown',
        visitor_id: req.cookies.get('visitor_id')?.value || 'anonymous',
        page_path: req.nextUrl.pathname,
        slug
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}; 