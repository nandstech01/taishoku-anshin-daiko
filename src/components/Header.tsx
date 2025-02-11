'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMenu } from '@/contexts/MenuContext';
import HamburgerMenu from '@/components/HamburgerMenu';

export function Header() {
  const pathname = usePathname();
  const { isMenuOpen } = useMenu();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <a className="hover:opacity-80 transition-opacity" href="/">
            <img
              alt="Logo"
              fetchPriority="high"
              width="32"
              height="32"
              decoding="async"
              data-nimg="1"
              className="h-8 w-auto"
              style={{ color: 'transparent' }}
              src="/images/logo.svg"
            />
          </a>
          <p className="hidden lg:block text-sm font-bold text-gray-900">
            株式会社エヌアンドエスが運営する公式オフィシャルサイトです。退職に関する不安や悩みを解消するお得情報を毎日配信中!!
          </p>
        </div>
        <div className="lg:hidden flex items-center">
          <Link 
            href="/resignation"
            className="w-10 h-10 flex items-center justify-center bg-orange-600 rounded-sm text-white text-xs mr-2"
          >
            退
          </Link>
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
} 