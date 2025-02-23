import { createServerClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const referer = headersList.get('referer') || '';
    const origin = headersList.get('origin') || '';

    // 基本的なバリデーション
    if (!userAgent) {
      return NextResponse.json(
        { error: 'User agent is required' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff',
          }
        }
      );
    }

    console.log('Starting diagnosis tracking with:', {
      userAgent,
      referer,
      origin,
      timestamp: new Date().toISOString()
    });

    // Supabaseクライアントの初期化
    const supabase = createServerClient();

    // 診断開始ログの記録
    const { data, error } = await supabase
      .from('analytics')
      .insert([
        {
          page_path: '/diagnosis',
          page_type: 'diagnosis_start',
          user_agent: userAgent,
          referrer: referer,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Error recording diagnosis start:', {
        error,
        context: {
          userAgent,
          referer,
          origin,
          timestamp: new Date().toISOString()
        }
      });
      return NextResponse.json(
        { 
          error: 'Failed to record diagnosis start',
          details: error.message,
          code: error.code 
        }, 
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff',
          }
        }
      );
    }

    console.log('Successfully recorded diagnosis start:', {
      data,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { 
        success: true, 
        data,
        timestamp: new Date().toISOString()
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff',
        }
      }
    );
  } catch (error) {
    console.error('Unexpected error in diagnosis tracking:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff',
        }
      }
    );
  }
} 