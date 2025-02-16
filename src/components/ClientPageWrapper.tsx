'use client';

import React from 'react';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import LoadingScreen from './loading/LoadingScreen';

interface ClientPageWrapperProps {
  children: React.ReactNode;
}

export default function ClientPageWrapper({ children }: ClientPageWrapperProps) {
  return (
    <>
      <PageViewTracker page_type="lp" />
      <LoadingScreen />
      <div>
        {children}
      </div>
    </>
  );
} 