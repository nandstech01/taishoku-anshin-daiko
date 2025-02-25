'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export interface PageViewTrackerProps {
  page_type: string;
}

/**
 * ページビューをトラッキングするコンポーネント
 * パフォーマンスに影響を与えないよう最適化済み
 */
export function PageViewTracker({ page_type }: PageViewTrackerProps) {
  const pathname = usePathname();
  const trackedRef = useRef<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // サーバーサイドでは実行しない
    if (typeof window === 'undefined') return;
    
    // 同じページで複数回トラッキングしないようにする
    if (trackedRef.current) return;

    // 低優先度の分析処理
    const trackPageView = () => {
      // すでにトラッキング済みなら何もしない
      if (trackedRef.current) return;
      trackedRef.current = true;
      
      const analyticsData = {
        page_type,
        page_path: pathname,
        timestamp: Date.now(),
      };

      // メイドル時に実行
      const sendAnalyticsData = () => {
        // ブラウザが sendBeacon をサポートしているか確認
        if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
          const blob = new Blob([JSON.stringify(analyticsData)], { 
            type: 'application/json' 
          });
          navigator.sendBeacon('/api/analytics/page-view', blob);
        } else {
          // フォールバック
          fetch('/api/analytics/page-view', {
            method: 'POST',
            keepalive: true,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(analyticsData),
          }).catch(() => {}); // 静かに失敗
        }
      };
      
      // アイドル時に実行
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => sendAnalyticsData(), { timeout: 2000 });
      } else {
        // フォールバック - 低優先度のタスクとして実行
        setTimeout(sendAnalyticsData, 1);
      }
    };
    
    // 遅延実行
    const scheduleTracking = () => {
      // 既存のタイマーをクリア
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // ページロード後に実行
      if (document.readyState === 'complete') {
        timeoutRef.current = setTimeout(trackPageView, 2000);
      } else {
        const handleLoad = () => {
          timeoutRef.current = setTimeout(trackPageView, 2000);
        };
        
        window.addEventListener('load', handleLoad);
        
        return () => {
          window.removeEventListener('load', handleLoad);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };
      }
    };
    
    // トラッキングをスケジュール
    scheduleTracking();
    
    // クリーンアップ
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, page_type]);

  // ページ遷移時にトラッキングフラグをリセット
  useEffect(() => {
    trackedRef.current = false;
  }, [pathname]);

  return null;
}

// TypeScriptの型定義を追加
declare global {
  interface Window {
    requestIdleCallback: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions
    ) => number;
  }
} 