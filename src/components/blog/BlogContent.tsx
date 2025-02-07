'use client';

import * as React from 'react';
import { useEffect, useRef } from 'react';

interface BlogContentProps {
  content: string;
}

export default function BlogContentProcessor({ content }: BlogContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 初期コンテンツを設定
    containerRef.current.innerHTML = content;

    // h3とh4の数字を非表示にする処理
    const headings = containerRef.current.querySelectorAll('h3:not(.blog-toc-title), h4:not(.blog-toc-title)');
    headings.forEach(heading => {
      const text = heading.textContent || '';
      // 数字パターン（例：5-1. や 4-1-1.）にマッチする正規表現
      const match = text.match(/^(\d+[-\.]\d+(?:[-\.]\d+)?\.)\s*(.+)$/);
      if (match) {
        const [, number, title] = match;
        heading.innerHTML = `<span class="hidden">${number}</span>${title}`;
      }
    });

    // h2要素を探す（blog-toc-titleクラスを持たないh2要素のみを対象とする）
    const h2Elements = Array.from(
      containerRef.current.querySelectorAll('h2:not(.blog-toc-title)')
    );
    
    // デバッグ用のログ
    console.log('Found h2 elements:', h2Elements.length);
    
    // 3番目と7番目のセクションを特定
    const targetIndices = [2, 6];
    
    targetIndices.forEach(index => {
      const h2 = h2Elements[index];
      if (h2) {
        console.log(`Processing section with h2: ${h2.textContent}`);
        
        // 次のh2要素を見つける
        const nextH2 = h2Elements[index + 1];
        
        // セクションの最後の要素を見つける
        let lastElement = h2;
        let currentElement = h2.nextElementSibling;
        
        while (currentElement && 
               (!nextH2 || !currentElement.isSameNode(nextH2)) && 
               currentElement.tagName !== 'H2') {
          lastElement = currentElement;
          currentElement = currentElement.nextElementSibling;
        }
        
        // ボタンのHTMLを構築
        const buttonHTML = `
          <div class="my-12 mx-auto max-w-2xl">
            <a 
              href="https://lin.ee/h1kk42r" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="group block w-full text-center text-white bg-gradient-to-r from-[#ff8210] to-[#f59e0b] rounded-none shadow-[0_0_20px_rgba(255,130,16,0.3)] hover:shadow-[0_0_25px_rgba(255,130,16,0.5)] hover:scale-[1.02] transform transition-all duration-300 relative overflow-hidden"
            >
              <div class="py-3 px-8 text-sm text-white/90 border-b border-white/20">
                退職に関する不安や悩みをご相談ください
              </div>
              <div class="py-5 px-8">
                <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 group-hover:via-white/30 transition-all duration-500" style="animation: shine 2.5s infinite ease-in-out;"></div>
                <div class="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-300" style="background: linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%);"></div>
                <span class="relative flex items-center justify-center gap-3 text-white text-xl font-bold tracking-wider">
                  <svg class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.193 0-.378-.104-.483-.274L12.952 11.1v1.542c0 .348-.282.63-.631.63-.345 0-.627-.282-.627-.63V8.108c0-.27.174-.51.432-.596.064-.021.133-.031.199-.031.193 0 .378.104.483.274l1.444 2.132V8.108c0-.348.282-.63.63-.63.346 0 .628.282.628.63v4.771zm-5.741 0c0 .348-.282.63-.631.63-.345 0-.627-.282-.627-.63V8.108c0-.348.282-.63.63-.63.346 0 .628.282.628.63v4.771zm-2.466 0c0 .348-.282.63-.63.63s-.629-.282-.629-.63V8.108c0-.348.281-.63.63-.63.347 0 .629.282.629.63v4.771zM24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314z"/>
                  </svg>
                  LINEで無料相談
                </span>
              </div>
            </a>
          </div>
          <style>
            @keyframes shine {
              0% { transform: translateX(-200%) skewX(-30deg); }
              100% { transform: translateX(200%) skewX(-30deg); }
            }
          </style>
        `;
        
        // 新しい要素を作成してセクションの最後に挿入
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = buttonHTML;
        const buttonElement = tempDiv.firstElementChild;
        if (buttonElement && lastElement.parentNode) {
          lastElement.parentNode.insertBefore(buttonElement, lastElement.nextSibling);
        }
      }
    });
  }, [content]);

  return <div ref={containerRef} className="blog-content-processor" />;
}