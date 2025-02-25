/**
 * framer-motionの最適化設定
 * アニメーションパフォーマンスを向上させるための構成を提供
 */

import { MotionProps } from 'framer-motion';
import { useEffect, useState } from 'react';

// 拡張されたNavigator型定義（TypeScriptエラー回避用）
interface ExtendedNavigator extends Navigator {
  getBattery?: () => Promise<{
    level: number;
    charging: boolean;
    addEventListener: (event: string, callback: () => void) => void;
    removeEventListener: (event: string, callback: () => void) => void;
  }>;
  connection?: {
    effectiveType: string;
    saveData: boolean;
  };
}

// 拡張されたPerformance型定義
interface ExtendedPerformance extends Performance {
  memory?: {
    usedJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

/**
 * パフォーマンスに最適化されたアニメーション設定
 * - スクロール連動アニメーションはモバイルでより軽量になる
 * - ブラウザのレンダリングパフォーマンスを考慮したtransition設定
 */
export const optimizedMotionConfig = {
  // スクロールアニメーション用の最適化設定
  scrollConfig: {
    // モバイルではより軽量な設定を使用
    mobile: {
      // モバイルではスクロール監視の精度を下げる
      viewport: { once: true, amount: 0.3 },
      transition: { 
        type: 'tween', 
        ease: 'easeOut',
        duration: 0.4 
      }
    },
    // デスクトップではよりリッチな体験を提供
    desktop: {
      viewport: { once: false, amount: 0.2 },
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30 
      }
    }
  },
  
  // アニメーション共通の最適化設定
  commonTransition: {
    // ブラウザのGPU支援レンダリングを利用する設定
    type: 'tween',
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.4
  },

  // TBT削減のための最適化されたモーション設定
  reduceMotion: {
    // 優先度の低いアニメーションの省略
    // プリファレンス対応 (prefers-reduced-motion)
    transition: { duration: 0 },
    initial: {},
    animate: {},
    exit: {},
  },
  
  // パララックス効果の最適化設定
  optimizedParallax: (strength = 100): MotionProps => ({
    initial: { y: 0 },
    style: { 
      willChange: 'transform', // GPUアクセラレーションのヒント
    },
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
    },
  }),
  
  // 画面内検出の最適化設定
  optimizedInView: {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '100px',
  },
  
  // モバイルデバイス検出
  isMobile: typeof window !== 'undefined' && window.innerWidth < 768,

  // 省電力モード用の軽量アニメーション設定
  powerSavingMode: {
    transition: { 
      duration: 0.2,
      ease: 'linear'
    },
    // ほとんどのアニメーションを無効化
    disableEffects: true,
    // アニメーションの総数を制限
    maxAnimations: 3
  }
};

/**
 * デバイスタイプに基づいて最適な設定を返す
 */
export function getDeviceOptimizedConfig() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return isMobile 
    ? optimizedMotionConfig.scrollConfig.mobile 
    : optimizedMotionConfig.scrollConfig.desktop;
}

/**
 * バッテリー状態と接続タイプに基づいてアニメーション設定を最適化するフック
 */
export function useAdaptiveMotion(minBatteryLevel = 0.2) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  
  useEffect(() => {
    // ブラウザ環境でない場合は何もしない
    if (typeof window === 'undefined') return;
    
    // 拡張型を使用
    const extendedNavigator = navigator as ExtendedNavigator;
    const extendedPerformance = performance as ExtendedPerformance;
    
    // バッテリーAPIが利用可能かチェック
    if (extendedNavigator.getBattery) {
      const checkBatteryAndConnection = async () => {
        try {
          const battery = await extendedNavigator.getBattery?.();
          
          // バッテリー残量が少ない場合
          if (battery && battery.level < minBatteryLevel && !battery.charging) {
            setShouldReduceMotion(true);
            return;
          }
          
          // ネットワーク接続状態をチェック
          if (extendedNavigator.connection) {
            // 2Gや低速接続の場合、アニメーションを減らす
            if (extendedNavigator.connection.effectiveType === '2g' || 
                extendedNavigator.connection.saveData) {
              setShouldReduceMotion(true);
              return;
            }
          }
          
          // モバイルデバイスかつ重いCPU使用時
          const isMobile = window.innerWidth < 768;
          if (isMobile && extendedPerformance && extendedPerformance.memory) {
            const { usedJSHeapSize, jsHeapSizeLimit } = extendedPerformance.memory;
            const memoryUsage = usedJSHeapSize / jsHeapSizeLimit;
            
            // メモリ使用率が高い場合
            if (memoryUsage > 0.7) {
              setShouldReduceMotion(true);
              return;
            }
          }
          
          setShouldReduceMotion(false);
        } catch (error) {
          console.warn('バッテリー/接続情報が取得できませんでした:', error);
          // エラーの場合はデフォルトの動作（省電力化しない）
          setShouldReduceMotion(false);
        }
      };
      
      // 初回チェック
      checkBatteryAndConnection();
      
      // バッテリー状態変化時に再チェック
      extendedNavigator.getBattery?.().then(battery => {
        if (battery) {
          battery.addEventListener('levelchange', checkBatteryAndConnection);
          battery.addEventListener('chargingchange', checkBatteryAndConnection);
          
          return () => {
            battery.removeEventListener('levelchange', checkBatteryAndConnection);
            battery.removeEventListener('chargingchange', checkBatteryAndConnection);
          };
        }
        return undefined;
      }).catch(() => {
        // エラー処理 - サイレントに失敗
      });
    }
    
    // メディアクエリでreduced-motionを検出
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      setShouldReduceMotion(true);
    }
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };
    
    prefersReducedMotion.addEventListener('change', handleReducedMotionChange);
    
    return () => {
      prefersReducedMotion.removeEventListener('change', handleReducedMotionChange);
    };
  }, [minBatteryLevel]);
  
  return {
    // アニメーションを削減すべきかどうか
    shouldReduceMotion,
    // 使用すべき設定
    motionConfig: shouldReduceMotion ? optimizedMotionConfig.reduceMotion : optimizedMotionConfig.commonTransition,
    // モバイルかどうか
    isMobile: optimizedMotionConfig.isMobile
  };
} 