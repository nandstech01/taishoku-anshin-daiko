import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // www to non-www リダイレクト
  if (req.headers.get('host')?.startsWith('www.')) {
    const newUrl = new URL(req.url);
    newUrl.host = newUrl.host.replace(/^www\./, '');
    return NextResponse.redirect(newUrl, { status: 301 });
  }
  
  const supabase = createMiddlewareClient({ req, res });

  // セッションの更新
  const { data: { session } } = await supabase.auth.getSession();

  // 認証不要のパスをチェック
  const publicPaths = [
    '/',
    '/admin',
    '/api/auth',
    '/api/seo/auth',
    '/api/seo/search-console/issues',
    '/api/seo/search-console/inspect',
    '/api/test',
    '/api/monitor',
    '/api/monitor/performance'
  ];

  // APIエンドポイントかどうかをチェック
  const isApiRoute = req.nextUrl.pathname.startsWith('/api/');

  // APIパスの簡易マッチング関数
  const pathStartsWith = (path: string) => req.nextUrl.pathname.startsWith(path);

  // パフォーマンスモニタリングAPI呼び出しを最初に処理（優先度最高）
  if (pathStartsWith('/api/monitor/performance')) {
    console.log('Allowing performance monitoring API access');
    return res;
  }

  // 認証関連のAPIエンドポイントの場合は、処理をスキップ
  if (isApiRoute && (
    pathStartsWith('/api/auth/') ||
    pathStartsWith('/api/seo/auth/')
  )) {
    return res;
  }

  // 公開パスの場合は認証チェックをスキップ
  if (req.nextUrl.pathname === '/' || publicPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    return res;
  }

  // 管理画面の保護（/admin/以下のパスのみ）
  if (req.nextUrl.pathname.startsWith('/admin/') && !session) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // 以下は既存のミドルウェアロジック
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
    '/admin/posts/new',
    '/admin/seo',
    '/admin/seo/search-console',
    '/diagnosis/result',
    '/api/auth/init',
    '/api/auth/callback',
    '/api/test/search-console',
    '/api/test/oauth',
    '/api/test/oauth/'
  ];
  
  // 各種ページパターンをチェック
  const isBlogPost = url.pathname.match(/^\/blog\/[^\/]+\/?$/);
  const isCategory = url.pathname.match(/^\/blog\/category\/[^\/]+\/?$/);
  const isTag = url.pathname.match(/^\/blog\/tags\/[^\/]+\/?$/);
  const isPostEdit = url.pathname.match(/^\/admin\/posts\/[^\/]+\/edit\/?$/);
  const isDiagnosisResult = url.pathname.startsWith('/diagnosis/result');
  
  if (url.pathname.endsWith('/') && 
      url.pathname !== '/' && 
      !excludeFromSlashNormalization.includes(url.pathname.slice(0, -1)) &&
      !isBlogPost &&
      !isCategory &&
      !isTag &&
      !isPostEdit &&
      !isDiagnosisResult) {
    return NextResponse.redirect(
      new URL(url.pathname.slice(0, -1), req.url),
      { status: 301 }
    );
  }

  // 4. 不正なURLパターンの処理
  if (url.pathname === '/undefined' || url.pathname === '/undefined/') {
    return NextResponse.redirect(new URL('/', req.url), { status: 301 });
  }

  // タグページのリダイレクト処理
  if (url.pathname.startsWith('/blog/tags/')) {
    const tagPath = url.pathname.replace('/blog/tags/', '');
    // ハイフンが含まれているかチェック
    if (tagPath.includes('-')) {
      // ハイフンをスペースに変換した新しいURLを生成
      const newPath = `/blog/tags/${tagPath.replace(/-/g, ' ')}`;
      return NextResponse.redirect(new URL(newPath, url.origin), { status: 301 });
    }
  }

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
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}; 