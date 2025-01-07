import { createClient } from '@/lib/supabase/supabase';
import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 300; // 5分ごとに再検証（詳細データは更新頻度を下げる）

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    // 検索パフォーマンスデータを取得
    const { data, error } = await supabase
      .from('search_analytics')
      .select('*')
      .eq('slug', slug)
      .gte('date', startDate.toISOString())
      .order('date', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      search: data
    });

  } catch (error) {
    console.error('Error fetching detailed analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search analytics data' },
      { status: 500 }
    );
  }
} 