'use client';

import React, { useEffect, useRef, useState } from 'react';

const AIAnalysisLoader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 640px)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    // 文字セットを英語のみに変更
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const symbols = '><[]{}=_-+*%$#@';
    const binary = '10';
    const ai = 'AI';

    // 文字列をシャッフルする関数
    const shuffleString = (str: string) => {
      return str.split('').sort(() => Math.random() - 0.5).join('');
    };

    // 初期文字列を生成
    const baseAlphabet = shuffleString(ai.repeat(3) + letters + nums + binary + symbols);

    const fontSize = 20;  // フォントサイズを20pxに増加
    const verticalSpacing = fontSize * 1.3; // 縦の間隔を30%広げる
    const columns = Math.floor(canvas.offsetWidth / (fontSize * 1.2));  // 横の間隔は1.2倍を維持

    // 列ごとの状態を管理
    interface ColumnState {
      y: number;
      speed: number;
      nextChangeTime: number;
      chars: string;
      lastAITime: number;
      glowIntensity: number;
      isActive: boolean;  // 列がアクティブかどうかを管理
      clusterHead: boolean; // クラスターの先頭かどうかを管理
    }

    // ハッカー風の空間パターンを生成
    const generateSpacePattern = () => {
      const pattern = new Array(columns).fill(false);
      let currentLength = 0;
      
      // ランダムなクラスター（かたまり）を作成
      for (let i = 0; i < columns; i++) {
        if (currentLength > 0) {
          pattern[i] = true;
          currentLength--;
        } else if (Math.random() > 0.7) { // 30%の確率で新しいクラスターを開始
          const length = Math.floor(Math.random() * 4) + 2; // 2-5列のクラスター
          currentLength = length - 1;
          pattern[i] = true;
        }
      }
      return pattern;
    };

    // 初期の列状態を設定
    const columnStates: ColumnState[] = Array(columns).fill(0).map((_, index) => {
      const spacePattern = generateSpacePattern();
      return {
        y: Math.random() * canvas.offsetHeight / fontSize,
        speed: Math.random() * 0.8 + 0.8, // スピードを0.8-1.6の範囲に減速
        nextChangeTime: Math.random() * 1000,
        chars: shuffleString(baseAlphabet),
        lastAITime: 0,
        glowIntensity: 0,
        isActive: spacePattern[index],
        clusterHead: Math.random() > 0.7  // クラスターの先頭かどうか
      };
    });

    let time = 0;
    const cycleLength = 2000;

    // 爽やかな色味の定義
    const colors = {
      normal: 'rgba(255, 255, 255, 0.75)',
      bright: 'rgba(255, 255, 255, 0.85)',
      glow: 'rgba(255, 255, 255, 0.95)',
      ai: 'rgba(255, 255, 255, 0.95)'
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // 残像をより強く
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      time = (time + 16) % cycleLength;

      columnStates.forEach((state, i) => {
        if (!state.isActive) return;

        // 列の状態を更新
        state.y += state.speed;
        if (state.y * fontSize > canvas.offsetHeight) {
          state.y = 0;
          state.speed = Math.random() * 0.8 + 0.8; // 再生成時も同じ速度範囲を使用
          state.chars = shuffleString(baseAlphabet);
          
          // クラスターヘッドの場合、新しいパターンを生成
          if (state.clusterHead) {
            const newPattern = generateSpacePattern();
            columnStates.forEach((s, idx) => {
              s.isActive = newPattern[idx];
            });
          }
        }

        // 文字を描画する位置を計算
        const x = i * (fontSize * 1.2);
        const baseY = state.y * fontSize;

        // この列の文字を描画
        const charCount = Math.floor((canvas.offsetHeight / verticalSpacing) * 0.85);
        for (let j = 0; j < charCount; j++) {
          if (Math.random() > 0.9) continue; // 10%の確率で文字をスキップ

          const y = (baseY + j * verticalSpacing) % canvas.offsetHeight;
          const charIndex = j % state.chars.length;
          const char = state.chars[charIndex];

          // AIの出現を制御（クラスターヘッドでより頻繁に）
          const shouldShowAI = (state.clusterHead ? Math.random() > 0.995 : Math.random() > 0.998) && 
                             time - state.lastAITime > 500;
          const text = shouldShowAI ? 'AI' : char;

          if (shouldShowAI) {
            state.lastAITime = time;
            state.glowIntensity = 1;
          }

          // 色とサイズを設定
          const distanceFromTop = j / charCount;
          const alpha = Math.max(0.1, 1 - distanceFromTop);
          
          if (text === 'AI') {
            ctx.font = `${fontSize * 1.2}px "SF Mono", "Courier New", monospace`;
            ctx.fillStyle = colors.ai;
            ctx.shadowColor = colors.glow;
            ctx.shadowBlur = 10; // グロー効果を少し強く
          } else {
            ctx.font = `${fontSize}px "SF Mono", "Courier New", monospace`;
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`; // 不透明度を少し上げる
            ctx.shadowBlur = 0;
          }

          // 文字を描画
          ctx.fillText(text, x, y);

          // グロー効果の減衰（クラスターヘッドでより強く）
          if (state.glowIntensity > 0) {
            state.glowIntensity *= state.clusterHead ? 0.97 : 0.95;
            if (j === 0) {
              ctx.shadowColor = colors.glow;
              ctx.shadowBlur = state.clusterHead ? 20 : 15 * state.glowIntensity;
              ctx.fillStyle = colors.bright;
              ctx.fillText(text, x, y);
            }
          }
        }

        // 周期的な文字の変化
        if (time > state.nextChangeTime) {
          state.chars = shuffleString(state.chars);
          state.nextChangeTime = time + Math.random() * 1000 + 500;
        }
      });

      ctx.shadowBlur = 0;
    };

    const interval = setInterval(draw, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#000814] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header Section */}
        <div className="relative mb-4 overflow-hidden rounded-none sm:rounded-lg bg-gradient-to-r from-[#001440] via-[#002466] to-[#001440] p-4 sm:p-6 animate-cyber-pulse backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066ff]/10 via-[#00ccff]/10 to-[#0066ff]/10 animate-hologram"></div>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="relative">
                <div className="text-2xl sm:text-3xl font-light text-white tracking-[0.2em] animate-pulse">
                  AI ANALYSIS
                </div>
                <div className="text-xs sm:text-sm font-light text-[#80ccff] tracking-[0.15em] opacity-80">
                  QUANTUM PROCESSING
                </div>
              </div>
            </div>
            <div className="relative w-12 h-12 sm:w-16 sm:h-16">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0066ff] via-[#00ccff] to-[#0066ff] rounded-full animate-spin-slow opacity-20"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-[#00ccff] via-[#80ccff] to-[#00ccff] rounded-full animate-reverse-spin opacity-30"></div>
              <div className="absolute inset-4 bg-white rounded-full animate-pulse opacity-40"></div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#001440] via-[#002466] to-[#001440] p-4 sm:p-6 backdrop-blur-sm group hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0066ff]/5 via-[#00ccff]/5 to-[#0066ff]/5 animate-hologram"></div>
              
              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-[#001440] rounded-full mb-4 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#0066ff] via-[#00ccff] to-[#0066ff] animate-progress"></div>
              </div>

              {/* Content Lines */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-1/3 bg-[#001440] rounded animate-pulse"></div>
                  <div className="h-3 w-1/4 bg-[#001440] rounded animate-shimmer"></div>
                </div>
                
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-2 bg-[#001440] rounded animate-shimmer" style={{
                      width: `${85 - (j * 15)}%`,
                      animationDelay: `${j * 200}ms`
                    }}>
                      <div className="h-full w-full bg-gradient-to-r from-transparent via-[#00ccff]/20 to-transparent animate-wave"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00ccff] to-transparent animate-data-stream"></div>
              <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00ccff] to-transparent animate-quantum-scan"></div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0066ff]/0 via-[#00ccff]/5 to-[#0066ff]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="relative p-4">
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#001440] via-[#002466] to-[#001440] p-4 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0066ff]/5 via-[#00ccff]/5 to-[#0066ff]/5 animate-hologram"></div>
            <div className="flex items-center justify-center space-x-4">
              <div className="h-2 w-2 bg-[#00ccff] rounded-full animate-pulse"></div>
              <div className="h-2 w-2 bg-[#00ccff] rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
              <div className="h-2 w-2 bg-[#00ccff] rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisLoader; 