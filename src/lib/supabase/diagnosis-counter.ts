import { createServerClient } from './server';

export async function getDiagnosisCounts() {
  const supabase = createServerClient();
  
  try {
    // まず全体のデータを取得して分析（過去のデータも含める）
    const { data: allVisits, error: visitorError } = await supabase
      .from('analytics')
      .select('visitor_id, page_path, created_at')
      .not('visitor_id', 'is', null)
      .not('page_path', 'ilike', '/api/%') // APIエンドポイントへのアクセスを除外
      .not('page_path', 'ilike', '/_next/%') // Next.jsの内部ルートを除外
      .not('page_path', 'ilike', '/favicon.ico') // faviconリクエストを除外
      .order('created_at', { ascending: false });

    if (visitorError) {
      console.error('[Diagnosis Counter] Error fetching total visitors:', visitorError);
      throw visitorError;
    }

    // 日付範囲の分析
    const dates = allVisits?.map(v => new Date(v.created_at)) || [];
    const dateRange = dates.length > 0 ? {
      oldest: dates[dates.length - 1],
      newest: dates[0],
      daysDifference: Math.floor((dates[0].getTime() - dates[dates.length - 1].getTime()) / (1000 * 60 * 60 * 24))
    } : null;

    // ページパスの分析（ブログ記事とその他で分類）
    const pathAnalysis = allVisits?.reduce((acc, v) => {
      let normalizedPath;
      if (v.page_path.startsWith('/blog/')) {
        normalizedPath = '/blog/*';
      } else if (v.page_path === '/') {
        normalizedPath = 'トップページ';
      } else {
        normalizedPath = v.page_path;
      }
      acc[normalizedPath] = (acc[normalizedPath] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // 訪問者IDの分析（詳細な訪問パターンを記録）
    const visitorAnalysis = allVisits?.reduce((acc, v) => {
      if (!acc[v.visitor_id]) {
        acc[v.visitor_id] = {
          count: 0,
          paths: new Set(),
          firstVisit: new Date(v.created_at),
          lastVisit: new Date(v.created_at),
          visitDates: new Set()
        };
      }
      const visitor = acc[v.visitor_id];
      visitor.count++;
      visitor.paths.add(v.page_path);
      visitor.visitDates.add(v.created_at.split('T')[0]); // 日付のみを保存
      visitor.lastVisit = new Date(Math.max(visitor.lastVisit.getTime(), new Date(v.created_at).getTime()));
      return acc;
    }, {} as Record<string, { 
      count: number, 
      paths: Set<string>,
      firstVisit: Date,
      lastVisit: Date,
      visitDates: Set<string>
    }>);

    // ユニーク訪問者の計算
    const uniqueVisitorIds = new Set(allVisits?.map(v => v.visitor_id) || []);
    const totalCount = uniqueVisitorIds.size;

    // 診断ページの訪問者（パスのバリエーションを含める）
    const diagnosisVisitors = allVisits?.filter(v => 
      v.page_path === '/diagnosis' || 
      v.page_path === '/diagnosis/' ||
      v.page_path.startsWith('/diagnosis?') ||
      v.page_path.includes('/diagnosis/')
    ) || [];
    const uniqueDiagnosisIds = new Set(diagnosisVisitors.map(v => v.visitor_id));
    const diagnosisCount = uniqueDiagnosisIds.size;

    // 詳細な分析結果をログ出力
    console.log('[Diagnosis Counter] Detailed Analysis:', {
      environment: process.env.NODE_ENV,
      databaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      dateRange,
      totalStats: {
        totalRecords: allVisits?.length || 0,
        uniqueVisitors: totalCount,
        averageVisitsPerUser: allVisits ? allVisits.length / totalCount : 0,
        uniqueDaysCount: new Set(dates.map(d => d.toISOString().split('T')[0])).size,
        diagnosisPathMatches: diagnosisVisitors.map(v => v.page_path) // 診断パスのマッチを確認
      },
      pathStats: {
        uniquePaths: Object.keys(pathAnalysis || {}).length,
        pathBreakdown: pathAnalysis
      },
      visitorStats: {
        singleVisitUsers: Object.values(visitorAnalysis || {}).filter(v => v.count === 1).length,
        multiVisitUsers: Object.values(visitorAnalysis || {}).filter(v => v.count > 1).length,
        uniqueDaysPerUser: Object.values(visitorAnalysis || {}).map(v => v.visitDates.size),
        topVisitors: Object.entries(visitorAnalysis || {})
          .sort(([,a], [,b]) => b.count - a.count)
          .slice(0, 5)
          .map(([id, stats]) => ({
            id: id.slice(-4),
            visits: stats.count,
            uniquePaths: stats.paths.size,
            uniqueDays: stats.visitDates.size,
            daysSinceFirstVisit: Math.floor((Date.now() - stats.firstVisit.getTime()) / (1000 * 60 * 60 * 24))
          }))
      },
      recentActivity: allVisits?.slice(0, 5).map(v => ({
        path: v.page_path,
        created_at: v.created_at,
        visitor_id: v.visitor_id.slice(-4)
      })),
      timestamp: new Date().toISOString()
    });

    return {
      totalCount,
      recentCount: diagnosisCount
    };
  } catch (error) {
    console.error('[Diagnosis Counter] Error:', error);
    throw error;
  }
} 