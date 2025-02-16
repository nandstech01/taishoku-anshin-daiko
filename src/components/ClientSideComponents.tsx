'use client';

import React, { useState, useEffect } from 'react';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import LoadingScreen from './loading/LoadingScreen';

export default function ClientSideComponents() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* @ts-ignore */}
      <PageViewTracker page_type="lp" />
      {isLoading && <LoadingScreen />}
    </>
  );
} 