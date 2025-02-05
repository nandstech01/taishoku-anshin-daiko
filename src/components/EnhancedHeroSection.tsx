// @ts-nocheck
'use client';

/***********************************************************************
 * OneMoreSizeSmallerHeroSectionV4.tsx
 * 
 * 退職代行サービスLP:
 *  - オレンジ系グラデーション背景
 *  - やや小さめの3Dスマホ（さらに下にオフセット）
 *  - テキスト（「もう無理しなくていい」「あなたの新しい人生を支援する 確かな退職代行」）
 *  - 背景Plane + パーティクル + カメラ制御 + Postprocessing
 * 
 * 700行超のサンプル。
 ***********************************************************************/

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  Suspense,
} from "react";

import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
} from "@react-three/postprocessing";
import { ChromaticAberration } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import * as THREE from "three";
import { Vector2 } from 'three';

// Three.jsのコンポーネントを登録
extend({
  DirectionalLight: THREE.DirectionalLight,
  AmbientLight: THREE.AmbientLight,
  Group: THREE.Group,
  Mesh: THREE.Mesh,
  MeshStandardMaterial: THREE.MeshStandardMaterial,
  MeshBasicMaterial: THREE.MeshBasicMaterial,
  SphereGeometry: THREE.SphereGeometry,
});

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
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5),
                 0 0 20px rgba(255, 255, 255, 0.3),
                 0 0 30px rgba(255, 255, 255, 0.2);
  }

  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

/*****************************************************************************
 * 1) OneMoreSizeSmallerHeroSectionV4 (エクスポート)
 *****************************************************************************/
export default function OneMoreSizeSmallerHeroSectionV4() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx>{marqueeStyles}</style>
      <section
        className="relative w-full h-screen text-white overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400"
        style={{ backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* 3Dシーン */}
        <div className="absolute inset-0 z-[1]">
          <SceneContainer />
        </div>

        {/* メインコピー(上部) */}
        <AnimatePresence>
          {visible && (
            <motion.div
              className="absolute inset-x-0 top-0 flex flex-col items-center pointer-events-none pt-4 z-[2]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <MainMessages />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ソーシャルプルーフ(下部) */}
        <AnimatePresence>
          {visible && (
            <motion.div
              className="absolute inset-x-0 bottom-5 flex flex-col items-center pointer-events-none z-[2]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
            >
              <SocialProofSection />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

/*****************************************************************************
 * 2) SceneContainer
 *   - Canvas + カメラ + Postprocessing
 *****************************************************************************/
function SceneContainer() {
  return (
    <Canvas
      shadows
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#000000"), 0);
      }}
      className="w-full h-full"
      dpr={[1, 2]}
    >
      <CameraController />

      {/* ライト */}
      <directionalLight
        intensity={0.7}
        position={[10, 20, 15]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <ambientLight intensity={0.3} />

      {/* 背景Plane + パーティクル */}
      <Suspense fallback={null}>
        <BackgroundAnimation />
      </Suspense>

      {/* 小さめスマホ (もっと下へ) */}
      <Suspense fallback={null}>
        <EvenSmallerSmartphone />
      </Suspense>

      {/* ポストエフェクト */}
      <PostEffects />
    </Canvas>
  );
}

/*****************************************************************************
 * 3) BackgroundAnimation
 *   - 波打つPlane + 浮遊パーティクル
 *****************************************************************************/
function BackgroundAnimation() {
  const planeRef = useRef<THREE.Mesh>(null);

  const planeGeo = useMemo(() => {
    return new THREE.PlaneGeometry(180, 180, 160, 160);
  }, []);

  // Wave animation
  useFrame((state) => {
    if (!planeRef.current) return;
    const time = state.clock.getElapsedTime() * 0.4;
    const geo = planeRef.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;

    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const wave = Math.sin(x * 0.3 + time) + Math.sin(y * 0.4 + time * 0.6);
      posAttr.setZ(i, wave * 0.7);
    }
    posAttr.needsUpdate = true;

    planeRef.current.rotation.z = time * 0.03;
  });

  return (
    <group>
      <mesh
        ref={planeRef}
        geometry={planeGeo}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -5, 0]}
      >
        <meshStandardMaterial
          color="#8d5223"
          emissive="#2d1500"
          emissiveIntensity={0.4}
          side={THREE.DoubleSide}
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>

      <FloatingParticles />
    </group>
  );
}

/*****************************************************************************
 * 3.1) FloatingParticles
 *****************************************************************************/
function FloatingParticles() {
  const groupRef = useRef<THREE.Group>(null);

  const COUNT = 400;
  const [positions] = useState(() => {
    const arr: { x: number; y: number; z: number; seed: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 160,
        y: (Math.random() - 0.5) * 50,
        z: (Math.random() - 0.5) * 160,
        seed: Math.random() * 1000,
      });
    }
    return arr;
  });

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime() * 0.12;

    groupRef.current.children.forEach((obj, i) => {
      const data = positions[i];
      const mesh = obj as THREE.Mesh;
      const t = time + data.seed;
      mesh.position.y = data.y + Math.sin(t * 2) * 0.8;
      mesh.position.x = data.x + Math.cos(t * 1.3) * 0.4;
      mesh.position.z = data.z + Math.sin(t * 1.4) * 0.4;
    });
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/*****************************************************************************
 * 4) EvenSmallerSmartphone
 *   - scale (15,15,6) のまま
 *   - position をさらに下げ: y = -5.0 (前回 -3.0)
 *****************************************************************************/
function EvenSmallerSmartphone() {
  const phoneRef = useRef<THREE.Group>(null);

  // 同じscale
  const phoneScale = useMemo(() => new THREE.Vector3(15, 15, 6), []);

  useFrame((state) => {
    if (!phoneRef.current) return;
    const t = state.clock.getElapsedTime();
    phoneRef.current.rotation.y = Math.sin(t * 0.2) * 0.25;
    phoneRef.current.rotation.x = Math.cos(t * 0.3) * 0.1;
  });

  // 位置だけさらに下げてヘッダーとの距離を確保
  return (
    <group ref={phoneRef} position={[0, -5.0, -8]} scale={phoneScale}>
      {/* 画面UI */}
      <Html
        transform
        distanceFactor={1.0}
        position={[0, 0, 0.03]}
        style={{
          width: "360px",
          height: "680px",
          background: "linear-gradient(180deg, #2c2c2c 10%, #1e1e1e 90%)",
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          pointerEvents: "auto",
        }}
      >
        <SmartphoneScreen />
      </Html>
    </group>
  );
}

/*****************************************************************************
 * 4.1) SmartphoneScreen
 *   - テキスト変更はそのまま継承:
 *     「もう無理しなくていい」「あなたの新しい人生を支援する 確かな退職代行」
 *****************************************************************************/
function SmartphoneScreen() {
  const ctaControls = useAnimation();

  const handleMouseEnter = useCallback(() => {
    ctaControls.start({ scale: 1.07, transition: { duration: 0.2 } });
  }, [ctaControls]);

  const handleMouseLeave = useCallback(() => {
    ctaControls.start({ scale: 1.0, transition: { duration: 0.2 } });
  }, [ctaControls]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #2c2c2c 10%, #1e1e1e 90%)",
      }}
    >
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* 「もう無理しなくていい」 */}
        <h3
          style={{
            color: "#ffffff",
            fontSize: "1.6rem",
            textAlign: "center",
            marginTop: "16px",
            marginBottom: "14px",
            fontWeight: "700",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {["も", "う", "無", "理", "し", "な", "く", "て", "い", "い"].map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.15,
                ease: [0.175, 0.885, 0.32, 1.275]
              }}
              style={{
                display: "inline-block",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                position: "relative",
              }}
            >
              {index === 0 && "「"}
              {char}
              {index === 9 && "」"}
            </motion.span>
          ))}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 1, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 1,
              times: [0, 0.4, 0.8, 1]
            }}
            style={{
              position: "absolute",
              right: "-20px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "3px",
              height: "1.6em",
              background: "#ffffff",
              display: "inline-block",
              transformOrigin: "center",
              boxShadow: "0 0 8px rgba(255,255,255,0.5)"
            }}
          />
        </h3>

        {/* 「あなたの新しい人生を支援する 確かな退職代行」 */}
        <motion.p
          style={{
            color: "#ffffff",
            fontSize: "1.2rem",
            textAlign: "center",
            margin: "16px",
            lineHeight: 1.6,
          }}
        >
          {["あ","な","た","の","新","し","い","人","生","を","支","援","す","る"].map((char, index) => (
            <motion.span
              key={`line1-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 2.0 + (index * 0.12),
                ease: [0.175, 0.885, 0.32, 1.275]
              }}
              style={{
                display: "inline-block",
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {char}
            </motion.span>
          ))}
          <br />
          {["確","か","な","退","職","代","行"].map((char, index) => (
            <motion.span
              key={`line2-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 3.8 + (index * 0.12),
                ease: [0.175, 0.885, 0.32, 1.275]
              }}
              style={{
                display: "inline-block",
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>

        {/* CTAボタン */}
        <motion.button
          style={{
            background: "linear-gradient(135deg, #ff8400, #ff6b2b)",
            color: "#fff",
            fontWeight: "800",
            fontSize: "1.6rem",
            borderRadius: "9999px",
            padding: "1.2rem 2.4rem",
            margin: "36px auto 0",
            cursor: "pointer",
            display: "block",
            border: "none",
            boxShadow: "0 4px 15px rgba(255, 132, 0, 0.3), 0 8px 25px rgba(255, 107, 43, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
            position: "relative",
            overflow: "hidden",
            transform: "translateY(0)",
            transition: "transform 0.2s ease",
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 6px 20px rgba(255, 132, 0, 0.4), 0 12px 30px rgba(255, 107, 43, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
          }}
          whileTap={{
            scale: 0.98,
            boxShadow: "0 2px 10px rgba(255, 132, 0, 0.3), 0 4px 15px rgba(255, 107, 43, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
          }}
          animate={ctaControls}
          onClick={() => {
            window.open('https://lin.ee/h1kk42r', '_blank', 'noopener,noreferrer');
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
              transform: "translateX(-100%)",
            }}
            animate={{
              transform: ["translateX(-100%)", "translateX(100%)"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0.5,
            }}
          />
          <motion.div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))",
              }}
            >
              <path
                d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
                fill="currentColor"
              />
            </svg>
            <span
              style={{
                textShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
                letterSpacing: "0.05em",
              }}
            >
              退職を始める
            </span>
          </motion.div>
        </motion.button>

        <div
          style={{
            marginTop: "36px",
            fontSize: "1.1rem",
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          <strong style={{ 
            color: "#fff",
            fontSize: "1.2rem",
            display: "block",
            marginBottom: "12px"
          }}>なぜ2980円？</strong>
          当社は徹底的なコスト削減と、
          <br />
          <span style={{ color: "#ffd965" }}>弁護士監修</span>のシステムを導入。
          <br />
          <span style={{ color: "#ffd965" }}>行政書士</span>や
          <span style={{ color: "#ffd965" }}>社労士</span>
          との提携で
          <br />
          低価格を実現しました。
        </div>
      </div>
    </div>
  );
}

/*****************************************************************************
 * 5) MainMessages
 *   - 上部 メインコピー (既存フレーズ)
 *****************************************************************************/
function MainMessages() {
  return (
    <div className="blog-marquee">
      <h1 className="blog-marquee-text">
        退職代行サービス 業界最安値2,980円で即日対応!!退職のノウハウから、キャリアプランまであなたの新しい一歩を、私たちがサポートします!!
      </h1>
    </div>
  );
}

/*****************************************************************************
 * 6) SocialProofSection (下部)
 *****************************************************************************/
function SocialProofSection() {
  const [count, setCount] = useState(12997);
  const [latestReview, setLatestReview] = useState("もう何の不安もありません！");

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < 13000) {
          return prev + 1;
        }
        return prev;
      });
    }, 3000); // 3秒ごとに1人増加
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const reviews = [
      "もう何の不安もありません！",
      "2980円でスピード退職できた",
      "本当にあっという間でした",
      "安くて驚きました…",
      "職場のストレスから解放されました！",
    ];
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * reviews.length);
      setLatestReview(reviews[randomIndex]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="pointer-events-none px-4 text-center flex flex-col gap-3"
      style={{ maxWidth: "600px", margin: "0 auto", transform: "translateY(-80px)" }}
    >
      <div className="text-sm text-white italic">「{latestReview}」</div>
      <div>
        <span className="text-2xl font-bold text-yellow-200">
          {count.toLocaleString()}
        </span>
        <span className="text-sm text-white ml-2">人が利用中</span>
      </div>
    </div>
  );
}

/*****************************************************************************
 * 7) CameraController
 *   - baseZ=10
 *****************************************************************************/
function CameraController() {
  const { camera, size } = useThree();
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useFrame(() => {
    const baseZ = 10;
    const scrollOffset = scrollY * 0.02;
    const newZ = baseZ + scrollOffset;

    const mouseOffsetX = (mouse.x - size.width / 2) * 0.001;
    const mouseOffsetY = (mouse.y - size.height / 2) * 0.001;

    camera.position.set(mouseOffsetX, 2 + mouseOffsetY, newZ);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/*****************************************************************************
 * 8) PostEffects
 *****************************************************************************/
function PostEffects() {
  const offset = new Vector2(0.0005, 0.0005);

  return (
    <EffectComposer>
      <Bloom
        intensity={0.6}
        kernelSize={KernelSize.LARGE}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.8}
      />
      <ChromaticAberration 
        offset={offset}
        radialModulation={false}
        modulationOffset={0.5}
      />
      <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} />
      <Vignette eskil={false} offset={0.2} darkness={1.1} />
    </EffectComposer>
  );
}

/*****************************************************************************
 * 9) Placeholder
 *****************************************************************************/
export function FutureExtensionsPlaceholder() {
  return null;
}

/*****************************************************************************
 * (約700行以上)
 * 
 * 【変更点まとめ】
 *  - スマホの y座標をさらに下げ (position={[0, -5.0, -8]}) 
 *    -> 前回 -3.0 から 2.0下がった形で、ヘッダー被りをより防止
 *  - スマホscale = (15,15,6), カメラ baseZ=10 は据え置き
 *  - テキストは「もう無理しなくていい」「あなたの新しい人生を支援する 確かな退職代行」
 *    のまま。
 *****************************************************************************/
