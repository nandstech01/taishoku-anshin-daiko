import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

// 認証トークンの検証
function isAuthorized(request: Request): boolean {
  const headersList = headers();
  const authToken = headersList.get('x-cron-auth-token');
  return authToken === process.env.CRON_SECRET;
}

export async function POST(request: Request) {
  // 認証チェック
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // パフォーマンスモニタリングAPIを呼び出し
    const monitoringResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/monitor/performance`,
      { method: 'GET' }
    );

    if (!monitoringResponse.ok) {
      throw new Error('Monitoring API request failed');
    }

    const results = await monitoringResponse.json();

    return NextResponse.json({
      success: true,
      message: 'Performance monitoring completed',
      ...results
    });
  } catch (error) {
    console.error('Error in performance monitoring cron:', error);
    return NextResponse.json(
      { error: 'Failed to run performance monitoring' },
      { status: 500 }
    );
  }
} 