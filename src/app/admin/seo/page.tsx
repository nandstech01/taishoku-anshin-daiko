'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PageSpeedResult {
  url: string;
  score: number;
  error?: string;
}

interface IndexingIssue {
  type: string;
  urls: string[];
  count: number;
  error?: string;
}

interface IndexingIssuesData {
  [key: string]: IndexingIssue;
}

export default function SEODashboard() {
  const [results, setResults] = useState<PageSpeedResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [indexingIssues, setIndexingIssues] = useState<IndexingIssuesData | null>(null);
  const [loadingIssues, setLoadingIssues] = useState(true);
  const [issuesError, setIssuesError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [inspectingUrl, setInspectingUrl] = useState<string | null>(null);
  const [inspectionResult, setInspectionResult] = useState<any | null>(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        console.log('Fetching performance data...');
        
        // シンプルなキャッシュバスティング用タイムスタンプを追加
        const queryParams = new URLSearchParams();
        const timestamp = new Date().getTime();
        queryParams.append('_t', timestamp.toString());
        
        const res = await fetch(`/api/monitor/performance?${queryParams.toString()}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache, no-store',
            'Pragma': 'no-cache',
            'Accept': 'application/json'
          },
          cache: 'no-store',
          // リダイレクトを手動で処理し、リダイレクトループを検出できるようにする
          redirect: 'manual',
          // 認証情報を含める
          credentials: 'include'
        });
        
        // レスポンスのステータスコードに基づいて処理
        if (res.type === 'opaqueredirect') {
          console.error('リダイレクトが検出されました');
          throw new Error('リダイレクトループが検出されました。管理者にお問い合わせください。');
        }
        
        if (!res.ok) {
          if (res.status === 401) {
            console.error('Authentication error fetching performance data');
            throw new Error('認証エラー：ログインセッションが無効です');
          }
          throw new Error(`APIエラー: ${res.status} ${res.statusText}`);
        }
        
        // JSONレスポンスの解析を試みる
        let data;
        try {
          data = await res.json();
        } catch (parseError) {
          console.error('Error parsing JSON response:', parseError);
          throw new Error('レスポンスの解析に失敗しました');
        }
        
        if (!data.success) {
          throw new Error(data.error || 'パフォーマンスデータの取得に失敗しました');
        }

        setResults(data.results.map((item: any) => ({
          url: item.url,
          score: item.success && item.metrics ? 
            Math.round((item.metrics.lcp / 1000) * 10) / 10 : 
            null,
          error: item.error
        })));
      } catch (error) {
        console.error('Error fetching performance data:', error);
        setError(error instanceof Error ? error.message : '不明なエラーが発生しました');
        
        // リダイレクトループが検出された場合、ダミーデータを表示
        if (error instanceof Error && error.message.includes('リダイレクトループ')) {
          // エラーメッセージはそのまま表示
        } else {
          // その他のエラーの場合は、フォールバックとしてダミーデータを設定
          setResults([
            { url: 'https://example.com/page1', score: 85 },
            { url: 'https://example.com/page2', score: 72 },
            { url: 'https://example.com/page3', score: 93 }
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchIndexingIssues = async () => {
      try {
        console.log('Fetching indexing issues...');
        
        // セッション関連のデータをクエリパラメータとして追加
        const queryParams = new URLSearchParams();
        const timestamp = new Date().getTime();
        queryParams.append('_t', timestamp.toString());
        
        const res = await fetch(`/api/seo/search-console/issues?${queryParams.toString()}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache, no-store',
            'Pragma': 'no-cache',
            'Accept': 'application/json'
          },
          cache: 'no-store',
          // リダイレクトを手動で処理し、リダイレクトループを検出できるようにする
          redirect: 'manual',
          // 認証情報を含める
          credentials: 'include'
        });
        
        // レスポンスのステータスコードに基づいて処理
        if (res.type === 'opaqueredirect') {
          console.error('リダイレクトが検出されました (インデックス問題)');
          throw new Error('リダイレクトループが検出されました。管理者にお問い合わせください。');
        }
        
        if (!res.ok) {
          if (res.status === 401) {
            console.error('Authentication error fetching indexing issues');
            setIssuesError('認証エラー：ログインセッションが無効です');
            return;
          }
          
          throw new Error(`API responded with status: ${res.status}`);
        }
        
        // JSONレスポンスの解析を試みる
        let data;
        try {
          data = await res.json();
        } catch (parseError) {
          console.error('Error parsing JSON response:', parseError);
          throw new Error('レスポンスの解析に失敗しました');
        }
        
        if (!data.success) {
          throw new Error(data.error || 'インデックス問題の取得に失敗しました');
        }
        
        setIndexingIssues(data.data.issues);
      } catch (error) {
        console.error('Error fetching indexing issues:', error);
        
        // エラーメッセージを日本語で設定
        let errorMessage = 'インデックス問題の取得に失敗しました';
        
        // リダイレクトループエラーの検出
        if (error instanceof Error && error.message.includes('リダイレクトループ')) {
          errorMessage = error.message;
        } else if (error instanceof Error) {
          errorMessage = `エラー: ${error.message}`;
        }
        
        setIssuesError(errorMessage);
        
        // リダイレクトループ以外のエラーの場合は、ダミーデータを設定
        if (!(error instanceof Error && error.message?.includes('リダイレクトループ'))) {
          setIndexingIssues({
            'モバイル使用性の問題': {
              type: 'MOBILE_USABILITY',
              urls: ['https://example.com/page1', 'https://example.com/page2'],
              count: 2
            },
            'インデックス登録の問題': {
              type: 'INDEXING',
              urls: ['https://example.com/page3'],
              count: 1
            }
          });
        }
      } finally {
        setLoadingIssues(false);
      }
    };

    fetchPerformanceData();
    fetchIndexingIssues();
  }, []);

  // URLを検査する関数
  const inspectUrl = async (url: string) => {
    setInspectingUrl(url);
    setInspectionResult(null);

    try {
      const response = await fetch('/api/seo/search-console/inspect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: [url] }),
      });

      const data = await response.json();

      if (data.success && data.data.results && data.data.results.length > 0) {
        setInspectionResult(data.data.results[0]);
      } else {
        setInspectionResult({ error: data.error || '検査結果を取得できませんでした', url });
      }
    } catch (error) {
      setInspectionResult({ 
        error: error instanceof Error ? error.message : 'URL検査中にエラーが発生しました', 
        url 
      });
    } finally {
      setInspectingUrl(null);
    }
  };

  // カテゴリを選択する関数
  const selectCategory = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setInspectionResult(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">SEO管理画面</h1>
        <Link
          href="/admin/seo/search-console"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Search Console設定
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <p className="text-sm mt-2">
            一時的なエラーの可能性があります。しばらく待ってから再度お試しください。
          </p>
        </div>
      )}

      {/* PageSpeed Insights レポート */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium mb-4">PageSpeed Insights レポート</h2>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium">{result.url}</h3>
                  {result.error ? (
                    <p className="text-red-600 mt-2">{result.error}</p>
                  ) : (
                    <div className="mt-2">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 rounded">
                            <div
                              className={`h-2 rounded ${
                                result.score >= 90
                                  ? 'bg-green-500'
                                  : result.score >= 50
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${result.score}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {result.score}点
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              まだPageSpeed Insightsのデータがありません。
            </p>
          )}
        </div>
      </div>

      {/* Search Console インデックス問題 */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium mb-4">Search Console インデックス問題</h2>
          
          {issuesError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              <p>{issuesError}</p>
              <p className="text-sm mt-2">
                一時的なエラーの可能性があります。しばらく待ってから再度お試しください。
              </p>
            </div>
          )}
          
          {loadingIssues ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
          ) : indexingIssues ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(indexingIssues).map(([category, issue]) => (
                  <div 
                    key={category} 
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedCategory === category 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => selectCategory(category)}
                  >
                    <h3 className="font-medium">{category}</h3>
                    <div className="mt-2 flex justify-between items-center">
                      <span className={`text-2xl font-bold ${
                        issue.count > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {issue.count}
                      </span>
                      <span className="text-xs text-gray-500">ページ</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedCategory && indexingIssues[selectedCategory] && (
                <div className="mt-6 border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      {selectedCategory}の問題 ({indexingIssues[selectedCategory].count}件)
                    </h3>
                    <div className="text-sm text-gray-500">
                      {indexingIssues[selectedCategory].type}
                    </div>
                  </div>
                  
                  {indexingIssues[selectedCategory].error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                      <p>{indexingIssues[selectedCategory].error}</p>
                    </div>
                  ) : indexingIssues[selectedCategory].urls.length > 0 ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {indexingIssues[selectedCategory].urls.map((url, index) => (
                        <div 
                          key={index} 
                          className={`flex justify-between items-center p-3 border rounded ${
                            inspectionResult && inspectionResult.url === url
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="truncate flex-1 mr-2">
                            <a 
                              href={url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {url}
                            </a>
                          </div>
                          <button
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded"
                            onClick={(e) => {
                              e.preventDefault();
                              inspectUrl(url);
                            }}
                            disabled={inspectingUrl === url}
                          >
                            {inspectingUrl === url ? '検査中...' : '詳細検査'}
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">このカテゴリに問題はありません。</p>
                  )}
                </div>
              )}
              
              {inspectionResult && (
                <div className="mt-6 border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">検査結果</h3>
                  
                  {inspectionResult.error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                      <p>{inspectionResult.error}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-3 border rounded">
                        <div className="font-medium">URL</div>
                        <div className="mt-1 break-all">
                          <a 
                            href={inspectionResult.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {inspectionResult.url}
                          </a>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 border rounded">
                          <div className="font-medium">インデックス状態</div>
                          <div className="mt-1">
                            {inspectionResult.data?.inspectionResult?.indexStatusResult?.verdict || '不明'}
                          </div>
                        </div>
                        
                        <div className="p-3 border rounded">
                          <div className="font-medium">最終クロール</div>
                          <div className="mt-1">
                            {inspectionResult.data?.inspectionResult?.indexStatusResult?.lastCrawlTime || '未クロール'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded">
                        <div className="font-medium">問題の詳細</div>
                        <div className="mt-1">
                          {inspectionResult.data?.inspectionResult?.indexStatusResult?.sitemap?.issues?.length > 0 ? (
                            <ul className="list-disc pl-5">
                              {inspectionResult.data.inspectionResult.indexStatusResult.sitemap.issues.map((issue: string, i: number) => (
                                <li key={i}>{issue}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>特に問題は検出されていません</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded">
                        <div className="font-medium">対応策</div>
                        <div className="mt-1">
                          {selectedCategory === 'リダイレクト問題' && (
                            <ul className="list-disc pl-5">
                              <li>正しいリダイレクト先を確認してください</li>
                              <li>301リダイレクトが正しく設定されているか確認してください</li>
                              <li>リダイレクトループがないか確認してください</li>
                            </ul>
                          )}
                          {selectedCategory === '404エラー' && (
                            <ul className="list-disc pl-5">
                              <li>ページが削除された場合は、適切な代替ページにリダイレクトしてください</li>
                              <li>URLの綴りが正しいか確認してください</li>
                              <li>存在しないページへのリンクを修正してください</li>
                            </ul>
                          )}
                          {selectedCategory === '代替ページ' && (
                            <ul className="list-disc pl-5">
                              <li>正しいcanonicalタグが設定されているか確認してください</li>
                              <li>重複コンテンツがないか確認してください</li>
                            </ul>
                          )}
                          {selectedCategory === 'ソフト404' && (
                            <ul className="list-disc pl-5">
                              <li>適切な404ステータスコードを返すように修正してください</li>
                              <li>存在しないコンテンツに対して通常のページテンプレートを使用しないでください</li>
                            </ul>
                          )}
                          {selectedCategory === 'noindex除外' && (
                            <ul className="list-disc pl-5">
                              <li>インデックスさせたいページからnoindexタグを削除してください</li>
                              <li>robots.txtの設定を確認してください</li>
                            </ul>
                          )}
                          {selectedCategory === 'リダイレクトエラー' && (
                            <ul className="list-disc pl-5">
                              <li>リダイレクトループを解消してください</li>
                              <li>リダイレクトの連鎖が多すぎないか確認してください</li>
                            </ul>
                          )}
                          {selectedCategory === 'クロール済み未登録' && (
                            <ul className="list-disc pl-5">
                              <li>コンテンツの品質を向上させてください</li>
                              <li>メタデータ（タイトル、ディスクリプション）を最適化してください</li>
                              <li>内部リンク構造を改善してください</li>
                            </ul>
                          )}
                          {selectedCategory === '検出未登録' && (
                            <ul className="list-disc pl-5">
                              <li>サイトマップにURLを追加してください</li>
                              <li>内部リンクを強化してください</li>
                              <li>重要なページへの外部リンクを獲得してください</li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">
              Search Consoleのインデックス問題データがありません。
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 