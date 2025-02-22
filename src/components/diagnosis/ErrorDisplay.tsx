"use client";

import React from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  onBack?: () => void;
}

export default function ErrorDisplay({ error, onRetry, onBack }: ErrorDisplayProps) {
  // エラーメッセージをユーザーフレンドリーな形式に変換
  const getErrorMessage = (error: string) => {
    if (error.includes('network')) {
      return 'ネットワーク接続に問題が発生しました。インターネット接続をご確認ください。';
    }
    if (error.includes('timeout')) {
      return 'サーバーからの応答がありません。時間をおいて再度お試しください。';
    }
    if (error.includes('parse')) {
      return 'データの処理中にエラーが発生しました。';
    }
    return error || 'エラーが発生しました。もう一度お試しください。';
  };

  return (
    <div 
      className="max-w-2xl mx-auto px-4 py-8"
      role="alert"
      aria-live="assertive"
    >
      <div className="bg-white border-l-4 border-red-500 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-red-500" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900" id="error-heading">
                エラーが発生しました
              </h2>
              <p className="mt-2 text-gray-600" id="error-description">
                {getErrorMessage(error)}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                aria-describedby="error-description"
              >
                <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                もう一度試す
              </button>
            )}
            {onBack && (
              <button
                onClick={onBack}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                前のページに戻る
              </button>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <p>
              問題が解決しない場合は、以下をお試しください：
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>ページを再読み込みする</li>
              <li>ブラウザのキャッシュをクリアする</li>
              <li>時間をおいて再度アクセスする</li>
            </ul>
          </div>

          {/* スクリーンリーダー用の詳細情報 */}
          <div className="sr-only">
            <p>エラーコード: {error}</p>
            <p>このエラーが続く場合は、サポートまでお問い合わせください。</p>
          </div>
        </div>
      </div>
    </div>
  );
} 