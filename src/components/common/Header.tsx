'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HamburgerMenu from '../HamburgerMenu';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
          </Link>
          <p className="hidden lg:block text-sm font-bold text-gray-900">
          株式会社エヌアンドエスが運営する公式オフィシャルサイトです。退職に関する不安や悩みを解消するお得情報を毎日配信中!!
          </p>
        </div>

        <div className="lg:hidden flex items-center">
          <Link 
            href="/resignation"
            className="group w-24 h-8 flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 rounded-sm text-white mr-2 leading-tight relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-300 to-blue-100">
              <div className="h-full w-24 animate-shimmer bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
            </div>
            <span className="text-[11px] font-medium tracking-wide">退職届</span>
            <span className="text-[9px] opacity-90">30秒で自動生成</span>
          </Link>
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
}