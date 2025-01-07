import { createClient } from '@/lib/supabase/supabase';
import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 60; // 1分ごとに再検証

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const days = parseInt(searchParams.get('days') || '30');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // アナリティクスデータの取得
    const [analyticsResponse, searchResponse] = await Promise.all([
      supabase
        .from('analytics')
        .select('*')
        .eq('slug', slug)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false }),

      supabase
        .from('search_analytics')
        .select('*')
        .eq('slug', slug)
        .gte('date', startDate.toISOString())
        .order('date', { ascending: false })
    ]);

    if (analyticsResponse.error) throw analyticsResponse.error;
    if (searchResponse.error) throw searchResponse.error;

    return NextResponse.json({
      analytics: analyticsResponse.data,
      search: searchResponse.data
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

// 全体の統計を取得するエンドポイント
export async function POST(request: Request) {
  try {
    const { days = 30 } = await request.json();
    const supabase = createClient();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [totalViews, deviceStats, countryStats] = await Promise.all([
      // 総閲覧数
      supabase
        .from('analytics')
        .select('id', { count: 'exact' })
        .gte('created_at', startDate.toISOString()),

      // デバイス別統計
      supabase.rpc('get_device_stats', {
        start_date: startDate.toISOString()
      }),

      // 国別統計
      supabase.rpc('get_country_stats', {
        start_date: startDate.toISOString()
      })
    ]);

    return NextResponse.json({
      totalViews: totalViews.count,
      deviceStats: deviceStats.data || [],
      countryStats: countryStats.data || []
    });

  } catch (error) {
    console.error('Error fetching overall stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch overall statistics' },
      { status: 500 }
    );
  }
} 