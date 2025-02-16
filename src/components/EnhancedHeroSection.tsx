// @ts-nocheck
'use client';

/***********************************************************************
 * EnhancedHeroSection.tsx
 * 
 * 3Dスマートフォンを使用したヒーローセクション
 * - 3Dモデル表示
 * - パフォーマンス最適化済み
 * - WebGLエラーハンドリング対応
 ***********************************************************************/

import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  Suspense,
  memo,
  lazy
} from "react";

import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { ErrorBoundary } from "./ErrorBoundary";

// Three.jsのコンポーネントを登録
extend({
  DirectionalLight: THREE.DirectionalLight,
  AmbientLight: THREE.AmbientLight,
  Group: THREE.Group,
});

// CSSをJSXから分離してstatic assetsに移動することを推奨
const marqueeStyles = `
  .blog-marquee {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    width: 100%;
    height: 32px;
    overflow: hidden;
    background: #ff8400;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 999;
    contain: content;
  }

  .blog-marquee-text {
    position: absolute;
    white-space: nowrap;
    will-change: transform;
    animation: marquee 25s linear infinite;
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 32px;
    padding: 0 1rem;
    width: max-content;
    letter-spacing: 0.02em;
    transform: translateZ(0);
  }

  @keyframes marquee {
    0% { transform: translateX(100%) }
    100% { transform: translateX(-100%) }
  }
`;

// WebGL対応チェック関数
const checkWebGLSupport = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      throw new Error('WebGL not supported');
    }
    return true;
  } catch (error) {
    console.warn('WebGL support check failed:', error);
    return false;
  }
};

// フォールバックコンテンツ
const FallbackHeroContent = () => (
  <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600">
    <div className="text-white text-center max-w-4xl mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        退職代行サービス
        <span className="block text-2xl md:text-3xl mt-2">
          業界最安値2,980円で即日対応
        </span>
      </h1>
      <p className="text-xl mt-4">
        弁護士監修で安心・安全な退職をサポート
      </p>
    </div>
  </div>
);

const EnhancedHeroSection = memo(() => {
  const [visible, setVisible] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const observerRef = useRef(null);

  const MemoizedMainMessages = useMemo(() => <MainMessages />, []);
  const MemoizedSocialProofSection = useMemo(() => <SocialProofSection />, []);

  useEffect(() => {
    // WebGL対応チェック
    setWebGLSupported(checkWebGLSupport());
    
    const timer = setTimeout(() => setVisible(true), 100);
    
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsInView(true);
          setIsLoaded(true);
          observerRef.current.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('#hero-section');
    if (section) {
      observerRef.current.observe(section);
    }

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoaded]);

  // WebGLが利用できない場合はフォールバックを表示
  if (!webGLSupported) {
    return <FallbackHeroContent />;
  }

  return (
    <>
      <style jsx>{marqueeStyles}</style>
      <section
        id="hero-section"
        className="relative w-full h-screen text-white overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #ff8400 0%, #ff6b00 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          contain: "layout"
        }}
      >
        {/* 3Dシーン - WebGL対応時のみレンダリング */}
        {isInView && webGLSupported && (
          <ErrorBoundary FallbackComponent={FallbackHeroContent}>
            <div className="absolute inset-0 z-[1]" style={{ contain: "content" }}>
              <Canvas
                shadows={false}
                className="w-full h-full"
                dpr={[1, 1.5]}
                gl={{ 
                  antialias: false,
                  alpha: false,
                  powerPreference: "high-performance",
                  stencil: false,
                  depth: true,
                  failIfMajorPerformanceCaveat: true,
                  onError: (error) => {
                    console.error('WebGL error:', error);
                    setWebGLSupported(false);
                  }
                }}
                performance={{
                  min: 0.5,
                  max: 1
                }}
                style={{
                  contain: "layout paint size",
                  willChange: "transform"
                }}
              >
                <Suspense fallback={null}>
                  <Scene />
                  <CameraController />
                </Suspense>
              </Canvas>
            </div>
          </ErrorBoundary>
        )}

        {/* メインコピー(上部) */}
        {visible && (
          <div
            className="absolute inset-x-0 top-0 flex flex-col items-center pointer-events-none pt-4 z-[2] animate-fadeIn"
            style={{ contain: "layout" }}
          >
            {MemoizedMainMessages}
          </div>
        )}

        {/* ソーシャルプルーフ(下部) */}
        {visible && (
          <div
            className="absolute inset-x-0 bottom-5 flex flex-col items-center pointer-events-none z-[2] animate-slideUp"
            style={{ contain: "layout" }}
          >
            {MemoizedSocialProofSection}
          </div>
        )}
      </section>
    </>
  );
});

EnhancedHeroSection.displayName = 'EnhancedHeroSection';

const Scene = memo(() => {
  const { scene } = useThree();
  const sceneRef = useRef();
  const initialized = useRef(false);

  useEffect(() => {
    if (scene && !initialized.current) {
      scene.background = new THREE.Color("#ff8400");
      initialized.current = true;
    }
  }, [scene]);

  const lights = useMemo(() => (
    <>
      <directionalLight
        intensity={0.7}
        position={[10, 10, 10]}
        castShadow={false}
      />
      <ambientLight intensity={0.3} />
    </>
  ), []);

  return (
    <group ref={sceneRef}>
      {lights}
      <EvenSmallerSmartphone />
    </group>
  );
});

Scene.displayName = 'Scene';

/*****************************************************************************
 * 4) EvenSmallerSmartphone
 *   - scale (15,15,6) のまま
 *   - position をさらに下げ: y = -5.0 (前回 -3.0)
 *****************************************************************************/
const EvenSmallerSmartphone = memo(() => {
  const phoneRef = useRef();
  const phoneScale = useMemo(() => new THREE.Vector3(15, 15, 6), []);
  const lastUpdate = useRef(0);
  const frameInterval = 1000 / 30; // 30FPS制限
  const animationPhase = useRef(0);

  useFrame(() => {
    if (!phoneRef.current) return;
    
    const now = performance.now();
    if (now - lastUpdate.current < frameInterval) return;
    
    animationPhase.current += 0.02;
    phoneRef.current.rotation.y = Math.sin(animationPhase.current) * 0.1;
    phoneRef.current.rotation.x = Math.sin(animationPhase.current * 0.6) * 0.05;
    
    lastUpdate.current = now;
  });

  const MemoizedSmartphoneScreen = useMemo(() => <SmartphoneScreen />, []);

  return (
    <group ref={phoneRef} position={[0, -5.0, -8]} scale={phoneScale}>
      {MemoizedSmartphoneScreen}
    </group>
  );
});

EvenSmallerSmartphone.displayName = 'EvenSmallerSmartphone';

const SmartphoneScreen = memo(() => {
  const screenStyle = useMemo(() => ({
    width: "360px",
    height: "680px",
    background: "linear-gradient(180deg, #ffffff 10%, #f8f8f8 90%)",
    borderRadius: "20px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    pointerEvents: "auto",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    transform: "translateZ(0)",
    willChange: "transform",
    contain: "content"
  }), []);

  return (
    <Html
      transform
      distanceFactor={1.0}
      position={[0, 0, 0]}
      style={screenStyle}
    >
      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <div className="text-center animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            もう無理しなくていい
          </h2>
          <p className="text-gray-600 mb-8">
            あなたの新しい人生を支援する
            <br />
            確かな退職代行
          </p>
          <button
            className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:bg-orange-600 transition-all duration-200"
          >
            退職をはじめる
          </button>
        </div>
      </div>
    </Html>
  );
});

SmartphoneScreen.displayName = 'SmartphoneScreen';

/*****************************************************************************
 * 5) MainMessages
 *   - 上部 メインコピー (既存フレーズ)
 *****************************************************************************/
const MainMessages = memo(() => {
  return (
    <div className="blog-marquee">
      <h2 className="blog-marquee-text" style={{ margin: 0 }}>
        退職代行サービス 業界最安値2,980円で即日対応!!退職のノウハウから、キャリアプランまであなたの新しい一歩を、私たちがサポートします!!
      </h2>
    </div>
  );
});

MainMessages.displayName = 'MainMessages';

/*****************************************************************************
 * 6) SocialProofSection (下部)
 *****************************************************************************/
const SocialProofSection = memo(() => {
  const [count] = useState(1273);
  const [latestReview] = useState("もう何の不安もありません！");

  return (
    <div
      className="pointer-events-none px-4 text-center flex flex-col gap-3"
      style={{ 
        maxWidth: "600px", 
        margin: "0 auto", 
        transform: "translateY(-40px)",
        contain: "content" 
      }}
    >
      <div>
        <span className="text-2xl font-bold" style={{ color: "#1a1a1a" }}>
          {count.toLocaleString()}
        </span>
        <span className="text-sm ml-2" style={{ color: "#1a1a1a" }}>人が利用中</span>
      </div>
      <div className="text-sm italic" style={{ color: "#1a1a1a" }}>「{latestReview}」</div>
    </div>
  );
});

SocialProofSection.displayName = 'SocialProofSection';

/*****************************************************************************
 * 7) CameraController
 *   - baseZ=10
 *****************************************************************************/
const CameraController = memo(() => {
  const { camera } = useThree();
  const targetPosition = useRef({ x: 0, y: 2, z: 10 });
  const lastUpdate = useRef(0);
  const updateInterval = 50; // 50ms間隔で更新
  const rafId = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const now = performance.now();
      if (now - lastUpdate.current < updateInterval) return;
      
      targetPosition.current.z = 10 + window.scrollY * 0.02;
      lastUpdate.current = now;
    };

    const handleMouse = (e) => {
      const now = performance.now();
      if (now - lastUpdate.current < updateInterval) return;
      
      targetPosition.current.x = (e.clientX - window.innerWidth / 2) * 0.001;
      targetPosition.current.y = 2 + (e.clientY - window.innerHeight / 2) * 0.001;
      lastUpdate.current = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouse, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  useFrame(() => {
    rafId.current = requestAnimationFrame(() => {
      camera.position.x += (targetPosition.current.x - camera.position.x) * 0.1;
      camera.position.y += (targetPosition.current.y - camera.position.y) * 0.1;
      camera.position.z += (targetPosition.current.z - camera.position.z) * 0.1;
      camera.lookAt(0, 0, 0);
    });
  });

  return null;
});

CameraController.displayName = 'CameraController';

/*****************************************************************************
 * 9) Placeholder
 *****************************************************************************/
export function FutureExtensionsPlaceholder() {
  return null;
}

// デフォルトエクスポートを追加
export default EnhancedHeroSection;

