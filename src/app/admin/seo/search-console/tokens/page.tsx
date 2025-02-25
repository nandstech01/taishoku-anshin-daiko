'use client';

import { useSearchParams } from 'next/navigation';

export default function TokensPage() {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  const success = searchParams.get('success') === 'true';

  if (!success) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">認証エラー</h2>
        <p className="text-gray-600">認証プロセスでエラーが発生しました。</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4">認証成功</h2>
      <p className="text-gray-600 mb-4">
        以下のトークンを.env.localファイルに追加してください：
      </p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <p className="font-mono text-sm mb-2">
          GOOGLE_ACCESS_TOKEN="{accessToken}"
        </p>
        <p className="font-mono text-sm">
          GOOGLE_REFRESH_TOKEN="{refreshToken}"
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
        <p className="text-sm">
          ⚠️ これらのトークンは機密情報です。安全に保管してください。
        </p>
      </div>
    </div>
  );
} 