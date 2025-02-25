'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/supabase';

interface SearchConsoleData {
  siteList: any;
  searchAnalytics: any;
  sitemapStatus: any;
  searchPerformance: any;
}

export default function SearchConsolePage() {
  const [data, setData] = useState<SearchConsoleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Supabaseのセッションを確認
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('Supabase認証が必要です');
        }

        // Google認証状態を確認
        const { data: tokenData, error: tokenError } = await supabase
          .from('google_seo.auth_tokens')
          .select('access_token')
          .eq('user_id', session.user.id)
          .single();

        if (tokenError || !tokenData) {
          setIsGoogleAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsGoogleAuthenticated(true);

        // 認証済みの場合のみデータを取得
        const response = await fetch('/api/seo/search-console');
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error || 'データの取得に失敗しました');
        }
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleGoogleAuth = async () => {
    try {
      const response = await fetch('/api/auth/google');
      const data = await response.json();
      if (data.success && data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        setError('認証URLの生成に失敗しました');
      }
    } catch (err) {
      setError('Google認証の開始に失敗しました');
      console.error('Error starting Google auth:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isGoogleAuthenticated) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Search Console</h1>
          <Link
            href="/admin/seo"
            className="text-indigo-600 hover:text-indigo-500"
          >
            ← SEO管理画面に戻る
          </Link>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Google認証が必要です</h2>
          <p className="text-gray-600 mb-4">
            Search Consoleのデータを取得するには、Googleアカウントでの認証が必要です。
          </p>
          <button
            onClick={handleGoogleAuth}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Googleで認証する
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Search Console</h1>
          <Link
            href="/admin/seo"
            className="text-indigo-600 hover:text-indigo-500"
          >
            ← SEO管理画面に戻る
          </Link>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <p className="text-sm mt-2">
            一時的なエラーの可能性があります。しばらく待ってから再度お試しください。
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
        <p>データが見つかりません</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Search Console データ</h1>
        <Link
          href="/admin/seo"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          SEO管理画面に戻る
        </Link>
      </div>

      {/* サイト一覧 */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium mb-4">登録サイト</h2>
          <div className="space-y-4">
            {data.siteList.siteEntry?.map((site: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-medium">{site.siteUrl}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  権限レベル: {site.permissionLevel}
                </p>
              </div>
            )) || (
              <p className="text-gray-500">登録されているサイトはありません。</p>
            )}
          </div>
        </div>
      </div>

      {/* 検索アナリティクス */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium mb-4">検索アナリティクス</h2>
          <div className="space-y-4">
            {data.searchAnalytics.rows?.map((row: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">クエリ</p>
                    <p className="mt-1">{row.keys[0]}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">ページ</p>
                    <p className="mt-1">{row.keys[1]}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">クリック数</p>
                    <p className="mt-1">{row.clicks}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">インプレッション</p>
                    <p className="mt-1">{row.impressions}</p>
                  </div>
                </div>
              </div>
            )) || (
              <p className="text-gray-500">検索アナリティクスデータはありません。</p>
            )}
          </div>
        </div>
      </div>

      {/* サイトマップ状態 */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium mb-4">サイトマップの状態</h2>
          <div className="space-y-4">
            {data.sitemapStatus.sitemap?.map((sitemap: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-medium">{sitemap.path}</h3>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">最終送信</p>
                    <p className="mt-1">
                      {new Date(sitemap.lastSubmitted).toLocaleString('ja-JP')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">ステータス</p>
                    <p className="mt-1">{sitemap.isPending ? '処理中' : '完了'}</p>
                  </div>
                </div>
              </div>
            )) || (
              <p className="text-gray-500">サイトマップ情報はありません。</p>
            )}
          </div>
        </div>
      </div>

      {/* 検索パフォーマンス */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium mb-4">検索パフォーマンス</h2>
          <div className="space-y-4">
            {data.searchPerformance.rows?.map((row: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-medium">{row.keys[0]}</h3>
                <div className="mt-2 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">クリック数</p>
                    <p className="mt-1">{row.clicks}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">インプレッション</p>
                    <p className="mt-1">{row.impressions}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">平均順位</p>
                    <p className="mt-1">{row.position.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            )) || (
              <p className="text-gray-500">検索パフォーマンスデータはありません。</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 