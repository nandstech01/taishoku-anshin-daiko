'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HamburgerMenu from '../HamburgerMenu';

export default function Header() {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // プリロードされたイメージを使用するためのフラグ
  useEffect(() => {
    // ロゴがすでにブラウザにキャッシュされている場合、即座にロード完了とマーク
    const img = new window.Image();
    img.src = '/images/logo.svg';
    
    if (img.complete) {
      setImageLoaded(true);
    }
  }, []);
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={120}
              height={30}
              priority
              fetchPriority="high"
              className="h-[60px] w-auto max-w-[240px] transition-opacity"
              onLoad={() => setImageLoaded(true)}
              style={{
                opacity: 1, // 常に不透明度1で表示し、ちらつきを防止
                objectFit: 'contain',
                transform: 'translateZ(0)' // GPUアクセラレーションのヒント
              }}
            />
          </Link>
          <p className="hidden lg:block text-sm font-bold text-gray-900">
          株式会社エヌアンドエスが運営する公式オフィシャルサイトです。退職に関する不安や悩みを解消するお得情報を毎日配信中!!
          </p>
        </div>

        <div className="lg:hidden flex items-center">
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
}