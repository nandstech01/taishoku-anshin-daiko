'use client';

import { useEffect, useState } from 'react';

export default function GoogleAuthPage() {
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/auth/google')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.authUrl) {
          window.location.href = data.authUrl;
        } else {
          setStatus('error');
          setError(data.error || 'Failed to get auth URL');
        }
      })
      .catch(err => {
        setStatus('error');
        setError(err.message);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="text-center">
        {status === 'loading' && (
          <>
            <h1 className="text-2xl font-bold mb-4">Google認証を準備中...</h1>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-4">エラーが発生しました</h1>
            <p className="text-gray-600">{error}</p>
          </>
        )}

        {status === 'ready' && (
          <h1 className="text-2xl font-bold mb-4">Googleにリダイレクトしています...</h1>
        )}
      </div>
    </div>
  );
} 