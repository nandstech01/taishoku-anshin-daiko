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
    
    // ローディング時間と同じ2秒後に表示開始
    const visibilityTimer = setTimeout(() => setVisible(true), 2000);
    
    // IntersectionObserverの設定
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          // ローディング時間後にアニメーション開始
          setTimeout(() => {
            setIsInView(true);
            setIsLoaded(true);
            observerRef.current?.disconnect();
          }, 2000);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('#hero-section');
    if (section) {
      observerRef.current.observe(section);
    }

    return () => {
      clearTimeout(visibilityTimer);
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
  const [isVisible, setIsVisible] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [typedDesc1, setTypedDesc1] = useState("");
  const [typedDesc2, setTypedDesc2] = useState("");
  
  const screenContent = useMemo(() => ({
    title: "もう無理しなくていい",
    description: ["あなたの新しい人生を支援する", "確かな退職代行"],
    features: {
      title: "なぜ２,980円?",
      points: [
        "AIで業務効率化で実現",
        "弁護士などの連携システム導入"
      ]
    },
    buttonText: "退職をはじめる"
  }), []);

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

  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    const typeTitle = setInterval(() => {
      if (currentIndex <= screenContent.title.length) {
        setTypedTitle(screenContent.title.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeTitle);
        
        // Start typing first description
        let descIndex1 = 0;
        const typeDesc1 = setInterval(() => {
          if (descIndex1 <= screenContent.description[0].length) {
            setTypedDesc1(screenContent.description[0].slice(0, descIndex1));
            descIndex1++;
          } else {
            clearInterval(typeDesc1);
            
            // Start typing second description
            let descIndex2 = 0;
            const typeDesc2 = setInterval(() => {
              if (descIndex2 <= screenContent.description[1].length) {
                setTypedDesc2(screenContent.description[1].slice(0, descIndex2));
                descIndex2++;
              } else {
                clearInterval(typeDesc2);
              }
            }, 200);
            return () => clearInterval(typeDesc2);
          }
        }, 200);
        return () => clearInterval(typeDesc1);
      }
    }, 200);

    return () => clearInterval(typeTitle);
  }, [isVisible, screenContent]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Html
      transform
      distanceFactor={1.0}
      position={[0, 0, 0]}
      style={screenStyle}
      prepend
    >
      <div className="w-full h-full flex flex-col items-center justify-start p-6">
        {isVisible && (
          <motion.div
            className="text-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 pt-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 min-h-[32px]">
                {typedTitle}
              </h2>
              <p className="text-gray-600">
                <span className="block min-h-[24px]">{typedDesc1}</span>
                <span className="block min-h-[24px]">{typedDesc2}</span>
              </p>
            </div>

            <div className="mt-12 mb-8">
              <h3 className="text-xl font-bold text-orange-500 mb-4">
                {screenContent.features.title}
              </h3>
              {screenContent.features.points.map((point, index) => (
                <p key={index} className="text-gray-700 mb-2">
                  {point}
                </p>
              ))}
            </div>

            <button
              className="bg-orange-500 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-lg hover:scale-105 hover:bg-orange-600 transition-all duration-200"
              onClick={() => window.open('https://lin.ee/h1kk42r', '_blank')}
            >
              {screenContent.buttonText}
            </button>
          </motion.div>
        )}
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
const socialMessages = [
  "もう何の不安もありません！",
  "意外と簡単に退職できました！",
  "親身になって相談に乗ってくれました！",
  "こんなに安くて大丈夫かと思いましたが、とても丁寧でした！",
  "退職後の生活まで考えてくれて安心でした！",
  "すぐに対応してもらえて助かりました！",
  "上司との交渉も全て任せられて楽でした！"
];

const SocialProofSection = memo(() => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [count] = useState(1273);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % socialMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center transform -translate-y-8">
      <div className="mb-3">
        <span className="text-xl font-bold text-gray-900">
          {count.toLocaleString()}
        </span>
        <span className="text-sm ml-2 text-gray-900">人が利用中</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-sm md:text-base font-medium text-gray-900"
        >
          {socialMessages[messageIndex]}
        </motion.p>
      </AnimatePresence>
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