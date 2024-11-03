'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HamburgerMenu from '../HamburgerMenu'; // HamburgerMenuをインポート

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50" style={{ height: '64px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        <div className="h-8 flex items-center">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="h-full w-auto"
            priority
          />
        </div>

        <nav className="hidden lg:flex space-x-4">
          {[
            { href: '/', label: 'ホーム' },
            { href: '/services', label: 'サービス' },
            { href: '/about', label: '会社概要' },
            { href: '/contact', label: 'お問い合わせ' }
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-gray-600 hover:text-gray-900"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="lg:hidden">
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
}