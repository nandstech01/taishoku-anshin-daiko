'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export interface PageViewTrackerProps {
  page_type: string;
}

export function PageViewTracker({ page_type }: PageViewTrackerProps) {
  const pathname = usePathname();

  useEffect(() => {
    const trackPageView = async () => {
      const supabase = createClient();
      
      try {
        await supabase.from('analytics').insert([
          {
            page_path: pathname,
            user_agent: navigator.userAgent,
            referrer: document.referrer,
            created_at: new Date().toISOString(),
          },
        ]);
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();
  }, [pathname]);

  useEffect(() => {
    // ページビューを記録
    fetch('/api/analytics/page-view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_type,
        page_path: window.location.pathname,
      }),
    }).catch(console.error);
  }, [page_type]);

  return null;
} 