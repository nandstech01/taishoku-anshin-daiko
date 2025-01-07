import { createClient } from '@/lib/supabase/supabase';
import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 60;

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

    // 基本的なアクセス統計のみを取得
    const { data, error } = await supabase
      .from('analytics')
      .select('created_at, visitor_id, device_type')
      .eq('slug', slug)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      analytics: data
    });

  } catch (error) {
    console.error('Error fetching basic analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
} 