"use client";

import React, { useEffect, useRef, useState } from 'react';
import './PixelCard.css';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

type Pixel = {
  x: number;
  y: number;
  delay: number;
  size: number;
};

export type PixelCardProps = {
  children: React.ReactNode;
  variant?: 'blue' | 'emerald' | 'amber';
  className?: string;
  pixelDensity?: number;
  imageSrc?: string;
  imageAlt?: string;
};

export default function PixelCard({
  children,
  variant = 'blue',
  className = '',
  pixelDensity = 0.0008, // 若干濃度を上げる
  imageSrc,
  imageAlt = '',
}: PixelCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: '50%', y: '50%' });
  
  // Calculate pixels based on card dimensions
  useEffect(() => {
    const calculatePixels = () => {
      if (!cardRef.current) return [];
      
      const { width, height } = cardRef.current.getBoundingClientRect();
      const area = width * height;
      const pixelCount = Math.floor(area * pixelDensity);
      
      return Array.from({ length: pixelCount }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 10,
        size: Math.random() * 1.5 + 1, // サイズを若干大きく
      }));
    };
    
    setPixels(calculatePixels());
    
    // Recalculate on resize
    const handleResize = () => setPixels(calculatePixels());
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [pixelDensity]);
  
  // Handle mouse movement for glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x: `${x}%`, y: `${y}%` });
  };
  
  return (
    <div 
      ref={cardRef}
      className={twMerge(`pixel-card ${variant}`, className)}
      onMouseMove={handleMouseMove}
    >
      {/* Glow effect */}
      <div 
        className="glow" 
        style={{ 
          '--x': mousePosition.x, 
          '--y': mousePosition.y 
        } as React.CSSProperties} 
      />
      
      {/* Pixel canvas */}
      <div className="pixel-canvas">
        {pixels.map((pixel, index) => (
          <div
            key={index}
            className="pixel-dot"
            style={{
              left: `${pixel.x}%`,
              top: `${pixel.y}%`,
              width: `${pixel.size}px`,
              height: `${pixel.size}px`,
              animationDelay: `${pixel.delay}s`,
            }}
          />
        ))}
      </div>
      
      {/* 画像があれば表示 */}
      {imageSrc && (
        <div className="mb-4 relative rounded-md overflow-hidden aspect-video w-full">
          <Image 
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="content">
        {children}
      </div>
    </div>
  );
} 