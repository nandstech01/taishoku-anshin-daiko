import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { createServerClient } from '@/lib/supabase/server';

const REQUIRED_SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/webmasters'
];

export class SearchConsoleClient {
  private searchconsole;
  private siteUrl: string;

  constructor(auth: OAuth2Client, siteUrl: string) {
    this.searchconsole = google.webmasters({ version: 'v3', auth });
    this.siteUrl = siteUrl;
  }

  static async createOAuth2Client(): Promise<OAuth2Client> {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // データベースからトークンを取得
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
      const { data: tokenData, error } = await supabase
        .from('google_seo.auth_tokens')
        .select('access_token, refresh_token, expiry_date')
        .eq('user_id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching tokens:', error);
        throw new Error('Failed to fetch Google tokens');
      }

      if (tokenData) {
        oauth2Client.setCredentials({
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expiry_date: tokenData.expiry_date ? new Date(tokenData.expiry_date).getTime() : undefined
        });
      }
    }

    return oauth2Client;
  }

  /**
   * サイトの一覧を取得
   */
  async getSiteList() {
    try {
      const response = await this.searchconsole.sites.list();
      return response.data;
    } catch (error) {
      console.error('Error fetching site list:', error);
      throw error;
    }
  }

  /**
   * サイトの検索アナリティクスデータを取得
   */
  async getSearchAnalytics(startDate: string, endDate: string) {
    try {
      const response = await this.searchconsole.searchanalytics.query({
        siteUrl: this.siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['query', 'page', 'device', 'country'],
          rowLimit: 100,
          searchType: 'web'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching search analytics:', error);
      throw error;
    }
  }

  /**
   * サイトマップの状態を取得
   */
  async getSitemapStatus() {
    try {
      const response = await this.searchconsole.sitemaps.list({
        siteUrl: this.siteUrl
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching sitemap status:', error);
      throw error;
    }
  }

  /**
   * 検索パフォーマンスの概要を取得
   */
  async getSearchPerformance() {
    try {
      const now = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(now.getMonth() - 3);

      const response = await this.searchconsole.searchanalytics.query({
        siteUrl: this.siteUrl,
        requestBody: {
          startDate: threeMonthsAgo.toISOString().split('T')[0],
          endDate: now.toISOString().split('T')[0],
          dimensions: ['page'],
          searchType: 'web',
          aggregationType: 'auto'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching search performance:', error);
      throw error;
    }
  }

  /**
   * モバイルフレンドリーテストを実行
   */
  async testMobileFriendly(url: string) {
    try {
      const response = await google.pagespeedonline('v5').pagespeedapi.runpagespeed({
        url,
        strategy: 'mobile'
      });
      return response.data;
    } catch (error) {
      console.error('Error testing mobile friendly:', error);
      throw error;
    }
  }

  /**
   * URL検査結果を取得
   * @param urls 検査対象のURL配列
   */
  async inspectUrls(urls: string[]): Promise<Array<{
    url: string;
    data?: any;
    error?: string;
    success: boolean;
  }>> {
    try {
      console.log('Inspecting URLs:', urls.length);
      
      // 一度に処理するURLの数を制限
      const BATCH_SIZE = 5;
      const results: Array<{
        url: string;
        data?: any;
        error?: string;
        success: boolean;
      }> = [];
      
      for (let i = 0; i < urls.length; i += BATCH_SIZE) {
        const batch = urls.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${i / BATCH_SIZE + 1}/${Math.ceil(urls.length / BATCH_SIZE)}`);
        
        const batchPromises = batch.map(async (url) => {
          try {
            // Search Consoleの検査API（v1）を使用
            const inspectionApi = google.searchconsole('v1');
            const response = await inspectionApi.urlInspection.index.inspect({
              requestBody: {
                inspectionUrl: url.startsWith('/') ? `${this.siteUrl}${url}` : url,
                siteUrl: this.siteUrl
              }
            });
            
            return {
              url,
              data: response.data,
              success: true
            };
          } catch (error) {
            console.error(`Error inspecting URL ${url}:`, error);
            return {
              url,
              error: error instanceof Error ? error.message : 'Unknown error',
              success: false
            };
          }
        });
        
        const batchResults = await Promise.allSettled(batchPromises);
        
        batchResults.forEach((result) => {
          if (result.status === 'fulfilled') {
            results.push(result.value);
          }
        });
        
        // APIの制限を回避するために少し待機
        if (i + BATCH_SIZE < urls.length) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
      
      return results;
    } catch (error) {
      console.error('Error in URL inspection:', error);
      throw error;
    }
  }
  
  /**
   * インデックスに関する問題を取得
   */
  async getIndexingIssues(): Promise<{
    [key: string]: {
      type: string;
      urls: string[];
      count: number;
      error?: string;
    }
  }> {
    try {
      // Search Console APIを使用してサイトのURLをカテゴリごとに取得
      const categories = [
        { name: 'リダイレクト問題', type: 'URL_CRAWLED_REDIRECT_ERROR' },
        { name: '404エラー', type: 'URL_CRAWLED_NOT_FOUND' },
        { name: '代替ページ', type: 'URL_CRAWLED_ALTERNATE' },
        { name: 'ソフト404', type: 'URL_CRAWLED_SOFT404' },
        { name: 'noindex除外', type: 'URL_CRAWLED_BLOCKED_ROBOTS' },
        { name: 'リダイレクトエラー', type: 'URL_CRAWLED_REDIRECT_LOOP' },
        { name: 'クロール済み未登録', type: 'URL_CRAWLED_NOT_INDEXED' },
        { name: '検出未登録', type: 'URL_DISCOVERED_NOT_INDEXED' }
      ];
      
      const results: {
        [key: string]: {
          type: string;
          urls: string[];
          count: number;
          error?: string;
        }
      } = {};
      
      for (const category of categories) {
        try {
          // URL検査APIを使用してサイトのURL（インデックスの問題別）を取得
          // 注意: 実際のAPIはこれとは異なるかもしれないため、ドキュメントを参照することをお勧めします
          const response = await this.searchconsole.searchanalytics.query({
            siteUrl: this.siteUrl,
            requestBody: {
              startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90日前
              endDate: new Date().toISOString().split('T')[0], // 今日
              dimensions: ['page'],
              searchType: 'index',
              aggregationType: 'auto',
              dimensionFilterGroups: [
                {
                  filters: [
                    {
                      dimension: 'index_status',
                      operator: 'equals',
                      expression: category.type
                    }
                  ]
                }
              ],
              rowLimit: 500
            }
          });
          
          results[category.name] = {
            type: category.type,
            urls: (response.data?.rows || []).map(row => (row.keys && row.keys[0]) || ''),
            count: response.data?.rows?.length || 0
          };
        } catch (error) {
          console.error(`Error fetching ${category.name}:`, error);
          results[category.name] = {
            type: category.type,
            urls: [],
            count: 0,
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
        
        // APIの制限を回避するために少し待機
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      return results;
    } catch (error) {
      console.error('Error fetching indexing issues:', error);
      throw error;
    }
  }
} 