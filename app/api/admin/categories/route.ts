import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// カテゴリー一覧の取得
export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // セッションの確認
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    // カテゴリー一覧を取得
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('カテゴリー一覧の取得に失敗しました:', error);
    return NextResponse.json(
      { error: 'カテゴリー一覧の取得に失敗しました' },
      { status: 500 }
    );
  }
}

// 新規カテゴリーの作成
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
    const { name, slug, description } = body;

    // バリデーション
    if (!name || !slug) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      );
    }

    // カテゴリーの作成
    const { data: category, error } = await supabase
      .from('categories')
      .insert([{ name, slug, description }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ category });
  } catch (error) {
    console.error('カテゴリーの作成に失敗しました:', error);
    return NextResponse.json(
      { error: 'カテゴリーの作成に失敗しました' },
      { status: 500 }
    );
  }
} 