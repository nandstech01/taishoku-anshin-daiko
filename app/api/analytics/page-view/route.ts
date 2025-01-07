import { createClient } from '@/lib/supabase/supabase';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { slug, page_path, page_type } = await request.json();
    console.log('Received page view request:', { slug, page_path, page_type });

    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const referer = headersList.get('referer') || '';
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || '';

    const supabase = createClient();

    // 訪問者IDの生成（実際のプロダクションでは、より堅牢な方法を使用すべき）
    const visitorId = Buffer.from(`${ip}-${userAgent}`).toString('base64');

    console.log('Inserting analytics data:', {
      slug,
      page_path,
      page_type,
      visitor_id: visitorId,
      referrer: referer,
      device_type: getUserDevice(userAgent),
      country: 'JP'
    });

    const { error } = await supabase
      .from('analytics')
      .insert({
        slug,
        page_path,
        page_type,
        visitor_id: visitorId,
        session_id: crypto.randomUUID(),
        referrer: referer,
        user_agent: userAgent,
        device_type: getUserDevice(userAgent),
        country: 'JP', // デフォルト値、実際にはGeoIPなどを使用
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Successfully recorded page view');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error recording page view:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to record page view' },
      { status: 500 }
    );
  }
}

function getUserDevice(userAgent: string): string {
  if (/mobile/i.test(userAgent)) return 'mobile';
  if (/tablet/i.test(userAgent)) return 'tablet';
  return 'desktop';
} 