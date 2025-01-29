import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  
  // 1. タグページのリダイレクト
  if (url.pathname.startsWith('/blog/tag/')) {
    return NextResponse.redirect(
      new URL(url.pathname.replace('/blog/tag/', '/blog/tags/'), req.url),
      { status: 301 }
    );
  }

  // 2. カテゴリーページのリダイレクト
  if (url.pathname.startsWith('/blog/categories/')) {
    const category = url.pathname.replace('/blog/categories/', '');
    return NextResponse.redirect(
      new URL(`/blog/category/${encodeURIComponent(category)}`, req.url),
      { status: 301 }
    );
  }

  // 3. 末尾スラッシュの正規化（特定のパスを除外）
  const excludeFromSlashNormalization = [
    '/blog', 
    '/about', 
    '/privacy', 
    '/terms', 
    '/legal', 
    '/faq', 
    '/admin', 
    '/admin/analysis', 
    '/admin/dashboard',
    '/admin/posts',
    '/admin/posts/new'
  ];
  
  // 各種ページパターンをチェック
  const isBlogPost = url.pathname.match(/^\/blog\/[^\/]+\/?$/);
  const isCategory = url.pathname.match(/^\/blog\/category\/[^\/]+\/?$/);
  const isTag = url.pathname.match(/^\/blog\/tags\/[^\/]+\/?$/);
  
  if (url.pathname.endsWith('/') && 
      url.pathname !== '/' && 
      !excludeFromSlashNormalization.includes(url.pathname.slice(0, -1)) &&
      !isBlogPost &&
      !isCategory &&
      !isTag) {
    return NextResponse.redirect(
      new URL(url.pathname.slice(0, -1), req.url),
      { status: 301 }
    );
  }

  // 4. 不正なURLパターンの処理
  if (url.pathname === '/undefined' || url.pathname === '/undefined/') {
    return NextResponse.redirect(new URL('/', req.url), { status: 301 });
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