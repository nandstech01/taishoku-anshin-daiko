'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export function PageViewTracker() {
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

  return null;
} 