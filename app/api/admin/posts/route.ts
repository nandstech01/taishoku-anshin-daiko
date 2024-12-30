import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// 記事一覧の取得
export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // セッションの確認
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    // 記事一覧を取得
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*, categories(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('記事一覧の取得に失敗しました:', error);
    return NextResponse.json(
      { error: '記事一覧の取得に失敗しました' },
      { status: 500 }
    );
  }
}

// 新規記事の作成
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // セッションの確認
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    // リクエストボディの取得
    const body = await request.json();
    const { title, content, slug, excerpt, category_id, tags } = body;

    // バリデーション
    if (!title || !content || !slug || !excerpt) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      );
    }

    // 記事の作成
    const { data: post, error } = await supabase
      .from('posts')
      .insert([
        {
          title,
          content,
          slug,
          excerpt,
          category_id,
          tags: tags || [],
          author_id: session.user.id,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ post });
  } catch (error) {
    console.error('記事の作成に失敗しました:', error);
    return NextResponse.json(
      { error: '記事の作成に失敗しました' },
      { status: 500 }
    );
  }
} 