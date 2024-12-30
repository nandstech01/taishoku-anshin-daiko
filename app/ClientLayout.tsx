'use client';

import { MenuProvider } from '@/contexts/MenuContext';
import { AuthProvider } from '@/contexts/AuthContext';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <AuthProvider>
      <MenuProvider>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </MenuProvider>
    </AuthProvider>
  );
} 