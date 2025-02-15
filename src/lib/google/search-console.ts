import { google } from 'googleapis';
import { supabase } from '@/lib/supabase/supabase';
import { searchconsole_v1 } from 'googleapis';
import type { Database } from '@/lib/supabase/database.types';

type Schema$ApiDataRow = searchconsole_v1.Schema$ApiDataRow;
type Post = Database['public']['Tables']['posts']['Row'];

interface SearchAnalyticsRow {
  keys?: string[] | null;
  clicks: number;
  impressions: number;
  position: number;
}

const searchConsole = google.searchconsole('v1');

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/webmasters']
});

export async function fetchAndStoreSearchAnalytics(startDate: string, endDate: string) {
  try {
    const response = await searchConsole.searchanalytics.query({
      auth,
      siteUrl: process.env.SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page', 'query', 'device', 'country'],
        rowLimit: 5000
      }
    });

    if (!response.data.rows) {
      console.log('No search analytics data found');
      return;
    }

    const analyticsData = response.data.rows.map((row: Schema$ApiDataRow) => {
      const [page, query, device, country] = row.keys || [];
      const postSlug = page?.split('/').pop() || '';

      return {
        slug: postSlug,
        query,
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        position: row.position || 0,
        date: startDate,
        device,
        country,
        created_at: new Date().toISOString()
      };
    });

    const { data: posts } = await supabase
      .from('posts')
      .select('slug');

    const slugSet = new Set((posts as Post[] || []).map(post => post.slug));

    const validData = analyticsData.filter(data => slugSet.has(data.slug));

    const { error } = await supabase
      .from('search_analytics')
      .upsert(validData, {
        onConflict: 'slug,date,query',
        ignoreDuplicates: false
      });

    if (error) {
      throw error;
    }

    console.log('Search analytics data stored successfully');
    return validData;

  } catch (error) {
    console.error('Error fetching/storing search analytics:', error);
    throw error;
  }
}

export async function getSearchAnalytics(slug: string, days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('search_analytics')
    .select('*')
    .eq('slug', slug)
    .gte('date', startDate.toISOString())
    .order('date', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
} 