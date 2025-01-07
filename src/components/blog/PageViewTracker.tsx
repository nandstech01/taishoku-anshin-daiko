'use client';

import { useEffect } from 'react';

interface PageViewTrackerProps {
  slug?: string;
  page_type: 'blog_post' | 'blog_top' | 'lp';
}

export function PageViewTracker({ slug, page_type }: PageViewTrackerProps) {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        console.log('Tracking page view:', {
          slug,
          page_path: window.location.pathname,
          page_type
        });

        const response = await fetch('/api/analytics/page-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            slug: slug || null,
            page_path: window.location.pathname,
            page_type
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(`Failed to track page view: ${response.status} ${response.statusText}${errorData ? ` - ${JSON.stringify(errorData)}` : ''}`);
        }

        console.log('Page view tracked successfully');
      } catch (error) {
        console.error('Error tracking page view:', {
          error,
          slug,
          page_path: window.location.pathname,
          page_type
        });
      }
    };

    trackPageView();
  }, [slug, page_type]);

  return null;
} 