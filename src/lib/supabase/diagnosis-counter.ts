import { createServerClient } from './server';

export async function getDiagnosisCounts() {
  const supabase = createServerClient();
  
  try {
    // ドメイン全体の訪問者数を取得（メインサイト + ブログ）
    const { data: uniqueVisitors, error: visitorError } = await supabase
      .from('analytics')
      .select('visitor_id')
      .not('visitor_id', 'is', null);

    if (visitorError) {
      console.error('[Diagnosis Counter] Error fetching total visitors:', visitorError);
      throw visitorError;
    }

    // 診断関連の全てのページの訪問者を取得
    const { data: diagnosisVisitors, error: diagnosisError } = await supabase
      .from('analytics')
      .select('visitor_id')
      .or('page_path.eq./diagnosis,page_path.like./blog/%/diagnosis%,page_path.like./diagnosis/result%')
      .not('visitor_id', 'is', null);

    if (diagnosisError) {
      console.error('[Diagnosis Counter] Error fetching diagnosis visitors:', diagnosisError);
      throw diagnosisError;
    }

    // ユニークな訪問者数を計算
    const uniqueVisitorCount = uniqueVisitors ? new Set(uniqueVisitors.map(v => v.visitor_id)).size : 0;
    const uniqueDiagnosisCount = diagnosisVisitors ? new Set(diagnosisVisitors.map(v => v.visitor_id)).size : 0;

    // デバッグログ
    console.log('[Diagnosis Counter] Total domain visitors:', uniqueVisitorCount);
    console.log('[Diagnosis Counter] Total diagnosis visitors (all pages):', uniqueDiagnosisCount);

    return {
      totalCount: uniqueVisitorCount,  // ドメイン全体の訪問者数
      recentCount: uniqueDiagnosisCount  // 全ての診断関連ページの訪問者数
    };
  } catch (error) {
    console.error('[Diagnosis Counter] Error:', error);
    return {
      totalCount: 0,
      recentCount: 0
    };
  }
} 