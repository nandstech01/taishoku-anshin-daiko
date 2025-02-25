'use client';

import { useEffect, useState } from 'react';

interface PerformanceData {
  url: string;
  lcp: number;
  status: 'good' | 'needs-improvement' | 'poor';
  device: 'mobile' | 'desktop';
  timestamp: string;
}

interface SEOIssue {
  type: string;
  count: number;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export default function SEOPage() {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Google Search Consoleから報告された問題の一覧
  const [seoIssues] = useState<SEOIssue[]>([
    { type: 'redirect', count: 30, description: 'リダイレクトの問題', priority: 'high' },
    { type: '404', count: 14, description: '404エラー', priority: 'high' },
    { type: 'canonical', count: 6, description: '代替ページ（canonical）の問題', priority: 'medium' },
    { type: 'soft404', count: 3, description: 'ソフト404', priority: 'medium' },
    { type: 'noindex', count: 2, description: 'noindexによる除外', priority: 'low' },
    { type: 'redirect_error', count: 1, description: 'リダイレクトエラー', priority: 'high' },
    { type: 'not_indexed', count: 3, description: 'クロール済み未インデックス', priority: 'medium' },
    { type: 'detected_not_indexed', count: 109, description: '検出済み未インデックス', priority: 'low' },
  ]);

  // パフォーマンスデータの取得
  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/monitor/performance');
        if (!response.ok) {
          throw new Error('Failed to fetch performance data');
        }

        const data = await response.json();
        setPerformanceData(data.results || []);
      } catch (err) {
        console.error('Error fetching performance data:', err);
        setError(err instanceof Error ? err.message : 'パフォーマンスデータの取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">SEO管理</h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 text-sm text-red-600 hover:text-red-500"
                >
                  再読み込み
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Google Search Console Issues */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Search Console 問題一覧</h2>
            <p className="mt-1 text-sm text-gray-500">Google Search Consoleから報告された問題の一覧です</p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {seoIssues.map((issue) => (
                <li key={issue.type} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          issue.priority === 'high' ? 'bg-red-100 text-red-800' :
                          issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {issue.count}件
                        </span>
                        <p className="ml-2 text-sm font-medium text-gray-900">{issue.description}</p>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        詳細を確認
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Performance Monitoring */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">パフォーマンスモニタリング</h2>
            <p className="mt-1 text-sm text-gray-500">ページごとのパフォーマンス指標を表示します</p>
          </div>
          <div className="border-t border-gray-200">
            {loading ? (
              <div className="px-4 py-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
                <p className="mt-2 text-sm text-gray-500">データを読み込み中...</p>
              </div>
            ) : performanceData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LCP</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">デバイス</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終チェック</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {performanceData.map((data, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.url}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.lcp}ms</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            data.status === 'good' ? 'bg-green-100 text-green-800' :
                            data.status === 'needs-improvement' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {data.status === 'good' ? '良好' :
                             data.status === 'needs-improvement' ? '要改善' :
                             '不良'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.device}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(data.timestamp).toLocaleString('ja-JP')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-4 py-12 text-center">
                <p className="text-sm text-gray-500">パフォーマンスデータがありません</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 