'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { MenuProvider } from '@/contexts/MenuContext';
import { Suspense } from 'react';

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="relative w-16 h-16">
        {/* 中央のロゴ */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 bg-[#FF6B00] rounded-full" />
        </div>
        {/* 外側の回転する円 */}
        <div className="absolute inset-0">
          <div className="w-full h-full border-4 border-[#FF6B00] border-t-transparent rounded-full animate-[spin_1s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
}

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthProvider>
        <MenuProvider>
          {children}
        </MenuProvider>
      </AuthProvider>
    </Suspense>
  );
} 