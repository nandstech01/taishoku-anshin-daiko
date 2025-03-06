'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AdBannerProps {
  className?: string;
  variant?: 'horizontal' | 'vertical';
}

/**
 * ブログ記事内に表示する広告バナーコンポーネント
 * @param className - 追加のCSSクラス
 * @param variant - バナーのバリエーション（horizontal: 横長, vertical: 縦長）
 */
export default function AdBanner({ className = '', variant = 'horizontal' }: AdBannerProps) {
  // 横長バナーと縦長バナーの2種類を用意
  const bannerSrc = variant === 'horizontal' 
    ? '/images/ads/blog-banner-horizontal.jpg' 
    : '/images/ads/blog-banner-vertical.jpg';
  
  const bannerSize = variant === 'horizontal'
    ? { width: 800, height: 250 }
    : { width: 300, height: 400 };
  
  return (
    <div className={`ad-banner my-6 ${className}`}>
      <Link href="https://taishoku-anshin-daiko.com/" target="_blank" rel="noopener noreferrer">
        <div className="relative overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <Image
            src={bannerSrc}
            alt="退職あんしん代行サービス"
            width={bannerSize.width}
            height={bannerSize.height}
            className="w-full h-auto"
            priority={true}
          />
        </div>
      </Link>
    </div>
  );
} 