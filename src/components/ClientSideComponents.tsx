'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from './loading/LoadingScreen';

// 解析トラッカーを遅延ロード
const PageViewTracker = dynamic(
  () => import('@/components/analytics/PageViewTracker').then(mod => ({ 
    default: mod.PageViewTracker 
  })),
  { 
    ssr: false,
    loading: () => null
  }
);

export default function ClientSideComponents() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ロード時間を300msに短縮
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!isLoading && <PageViewTracker page_type="lp" />}
      {isLoading && <LoadingScreen />}
    </>
  );
} 