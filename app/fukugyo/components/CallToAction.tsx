"use client";

import Link from 'next/link';
import { ArrowRight, LightbulbIcon, Sparkles, PhoneCall } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function CallToAction() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Optional: Unobserve after animation starts
            // observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = ctaRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section 
      ref={ctaRef}
      className="relative w-full bg-black text-white py-20 px-4 overflow-hidden"
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)'
        }}
      />
      
      <div 
        className={`relative max-w-5xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
          <Sparkles className="h-4 w-4 text-yellow-300" />
          <span className="text-sm font-medium">2025年のAI人材需要に備えよう</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          まずは退職相談から<br className="md:hidden" />始めましょう
        </h2>
        
        <p className="max-w-2xl mx-auto text-lg opacity-90 mb-10">
          退職支援の代行からAIスキル習得、転職成功まで。
          あなたの新しいキャリアを完全サポートします。
        </p>
        
        <div className="flex justify-center">
          <Link 
            href="https://lin.ee/w105og9"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md shadow-sm text-black bg-white hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 h-12"
          >
            まずは退職相談する <PhoneCall className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {['退職支援', 'AIエンジニア', 'AIコンテクリエイター', 'プロンプトエンジニア', 'AI×SEO', 'データアナリスト'].map((service) => (
            <div key={service} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
              {service}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 