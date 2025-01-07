import { createClient } from '@/lib/supabase/supabase';

export async function checkDatabaseNumbers() {
  const supabase = createClient();
  const results: Record<string, any> = {};
  
  try {
    // 1. 総記事数を確認
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*');
    
    if (postsError) throw postsError;
    results.totalPosts = posts.length;
    results.posts = posts;

    // 2. 公開済み記事数を確認
    results.publishedPosts = posts.filter(post => post.status === 'published').length;
    
    // 3. 月間PVを確認
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data: analytics, error: analyticsError } = await supabase
      .from('analytics')
      .select('*')
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (analyticsError) throw analyticsError;
    results.monthlyViews = analytics.length;

    // 4. ユニークユーザー数を確認
    results.uniqueVisitors = new Set(analytics.map(a => a.visitor_id).filter(Boolean)).size;

    // 5. デバイス別アクセス数を確認
    const deviceCounts = analytics.reduce((acc, curr) => {
      const device = curr.device_type || 'unknown';
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    results.deviceStats = deviceCounts;

    // 6. 国別アクセス数を確認
    const countryCounts = analytics.reduce((acc, curr) => {
      const country = curr.country || 'unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    results.countryStats = countryCounts;

    // 7. 最新の10件のアクセスログを確認
    results.recentAnalytics = analytics
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10);

    return {
      success: true,
      data: results
    };
  } catch (error) {
    console.error('Error checking database numbers:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 