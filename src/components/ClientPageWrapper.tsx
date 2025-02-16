'use client';

import React, { useState, useEffect } from 'react';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import LoadingScreen from './loading/LoadingScreen';

interface ClientPageWrapperProps {
  children: React.ReactNode;
}

export default function ClientPageWrapper({ children }: ClientPageWrapperProps) {
  const [showContent, setShowContent] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageViewTracker page_type="lp" />
      {isLoading && <LoadingScreen />}
      <div style={{ 
        opacity: !isLoading ? 1 : 0, 
        transition: 'opacity 0.5s',
        position: isLoading ? 'absolute' : 'relative',
        visibility: isLoading ? 'hidden' : 'visible',
      }}>
        {children}
      </div>
    </>
  );
} 