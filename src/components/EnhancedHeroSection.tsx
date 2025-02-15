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
import { Vector2, Vector3 } from 'three';

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
        className="relative w-full h-screen text-white overflow-hidden bg-gradient-to-b from-white to-white"
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
      className="w-full h-full"
      dpr={[1, 2]}
      gl={{ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      }}
    >
      <Scene />
      <CameraController />
      <PostEffects />
    </Canvas>
  );
}

function Scene() {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.Fog("#ffffff", 10, 50);
    scene.background = new THREE.Color("#ffffff");
  }, [scene]);

  return (
    <>
      {/* ライト */}
      <directionalLight
        intensity={0.7}
        position={[10, 10, 10]}
        castShadow
      />
      <ambientLight intensity={0.2} />

      {/* 背景Plane + パーティクル */}
      <Suspense fallback={null}>
        <BackgroundAnimation />
      </Suspense>

      {/* 小さめスマホ (もっと下へ) */}
      <Suspense fallback={null}>
        <EvenSmallerSmartphone />
      </Suspense>
    </>
  );
}

/*****************************************************************************
 * 3) BackgroundAnimation
 *   - 波打つPlane + 浮遊パーティクル
 *****************************************************************************/
function BackgroundAnimation() {
  const groupRef = useRef<THREE.Group>(null);

  // トーラスの数を少し減らして、サイズを大きく
  const COUNT = 15;

  // メッシュ情報
  const [torusList] = useState(() => {
    const arr = [];
    for (let i = 0; i < COUNT; i++) {
      arr.push({
        angle: i * 0.3,
        radius: 2 + i * 0.4,
        y: i * -0.8,
        color: new THREE.Color(`hsl(${20 + i*2}, 70%, 50%)`),
      });
    }
    return arr;
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.3;
    if (!groupRef.current) return;
    groupRef.current.children.forEach((mesh, i) => {
      const data = torusList[i];
      const angle = data.angle + time;
      const x = Math.cos(angle) * data.radius;
      const z = Math.sin(angle) * data.radius;
      mesh.position.set(x, data.y, z);
      mesh.rotation.x = angle * 2;
      mesh.rotation.y = angle;
    });
  });

  return (
    <group>
      <group ref={groupRef}>
        {torusList.map((item, i) => (
          <mesh key={i} castShadow>
            <torusGeometry args={[0.8, 0.3, 16, 32]} />
            <meshStandardMaterial
              color={item.color}
              emissive={item.color.clone().offsetHSL(0, -0.3, -0.3)}
              emissiveIntensity={0.6}
              metalness={0.7}
              roughness={0.2}
              envMapIntensity={1.5}
            />
          </mesh>
        ))}
      </group>

      <FloatingParticles />
    </group>
  );
}

/*****************************************************************************
 * 3.1) FloatingParticles
 *****************************************************************************/
function FloatingParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const COUNT = 60;

  const [particles] = useState(() => {
    const arr = [];
    for (let i = 0; i < COUNT; i++) {
      arr.push({
        position: new Vector3(
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 35
        ),
        velocity: new Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        scale: 0.15 + Math.random() * 0.2,
      });
    }
    return arr;
  });

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((mesh, i) => {
      const particle = particles[i];
      particle.position.add(particle.velocity);

      // 境界チェックとバウンス
      ['x', 'y', 'z'].forEach((axis) => {
        const limit = axis === 'y' ? 12.5 : 17.5;
        if (Math.abs(particle.position[axis]) > limit) {
          particle.position[axis] = Math.sign(particle.position[axis]) * limit;
          particle.velocity[axis] *= -1;
        }
      });

      mesh.position.copy(particle.position);
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#ff6b00"
            emissive="#ff6b00"
            emissiveIntensity={0.4}
            metalness={0.6}
            roughness={0.2}
            envMapIntensity={1.5}
          />
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
  const phoneScale = useMemo(() => new THREE.Vector3(15, 15, 6), []);

  useFrame((state) => {
    if (!phoneRef.current) return;
    const t = state.clock.getElapsedTime();
    phoneRef.current.rotation.y = Math.sin(t * 0.2) * 0.25;
    phoneRef.current.rotation.x = Math.cos(t * 0.3) * 0.1;
  });

  return (
    <group ref={phoneRef} position={[0, -5.0, -8]} scale={phoneScale}>
      {/* メインボディ */}
      <RoundedBox args={[0.365, 0.725, 0.04]} radius={0.05} smoothness={4}>
        <meshStandardMaterial
          color="#f5f5f7"
          metalness={0.6}
          roughness={0.2}
          envMapIntensity={1}
        />
      </RoundedBox>

      {/* 画面ベゼル（黒枠） */}
      <RoundedBox args={[0.355, 0.715, 0.041]} radius={0.048} smoothness={4} position={[0, 0, 0.001]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* ノッチ */}
      <RoundedBox args={[0.12, 0.02, 0.01]} radius={0.005} smoothness={4} position={[0, 0.33, 0.021]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* サイドボタン */}
      <RoundedBox args={[0.002, 0.03, 0.01]} position={[0.183, 0.2, 0]} radius={0.001}>
        <meshStandardMaterial color="#e2e2e2" metalness={0.7} roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[0.002, 0.03, 0.01]} position={[0.183, 0.15, 0]} radius={0.001}>
        <meshStandardMaterial color="#e2e2e2" metalness={0.7} roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[0.002, 0.05, 0.01]} position={[-0.183, 0.15, 0]} radius={0.001}>
        <meshStandardMaterial color="#e2e2e2" metalness={0.7} roughness={0.2} />
      </RoundedBox>

      {/* カメラ島 */}
      <RoundedBox args={[0.08, 0.08, 0.015]} position={[-0.12, 0.3, -0.02]} radius={0.01}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </RoundedBox>

      {/* メインカメラレンズ */}
      <mesh position={[-0.12, 0.31, -0.012]}>
        <cylinderGeometry args={[0.015, 0.015, 0.01, 32]} />
        <meshStandardMaterial color="#223344" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.12, 0.29, -0.012]}>
        <cylinderGeometry args={[0.015, 0.015, 0.01, 32]} />
        <meshStandardMaterial color="#223344" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 画面UI */}
      <Html
        transform
        distanceFactor={1.0}
        position={[0, 0, 0.021]}
        style={{
          width: "360px",
          height: "680px",
          background: "linear-gradient(180deg, #ffffff 10%, #f8f8f8 90%)",
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
        background: "linear-gradient(180deg, #ffffff 10%, #f8f8f8 90%)",
      }}
    >
      <div style={{ flex: 1, overflow: "auto" }}>
        <h3
          style={{
            color: "#1a1a1a",
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
                color: "#1a1a1a"
              }}
            >
              {index === 0 && "「"}
              {char}
              {index === 9 && "」"}
            </motion.span>
          ))}
        </h3>

        <motion.p
          style={{
            color: "#1a1a1a",
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
                color: "#1a1a1a"
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
                color: "#1a1a1a"
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>

        <div
          style={{
            marginTop: "36px",
            fontSize: "1.1rem",
            color: "#1a1a1a",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          <strong style={{ 
            color: "#1a1a1a",
            fontSize: "1.2rem",
            display: "block",
            marginBottom: "12px"
          }}>なぜ2980円？</strong>
          AIでコスト削減＆広告費ゼロ！
          <br />
          さらに、<span style={{ color: "#ff8400" }}>弁護士</span>・
          <span style={{ color: "#ff8400" }}>社労士</span>監修の
          <br />
          システム導入で、
          <br />
          安心の低価格を実現しました。
        </div>

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
  const [count, setCount] = useState(1273);
  const [latestReview, setLatestReview] = useState("もう何の不安もありません！");

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < 1300) {
          // ランダムな確率で増加させる（約30%の確率）
          return Math.random() < 0.3 ? prev + 1 : prev;
        }
        return prev;
      });
    }, 2000); // 2秒ごとに判定
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
      style={{ maxWidth: "600px", margin: "0 auto", transform: "translateY(-40px)" }}
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
  return (
    <EffectComposer>
      <Bloom
        intensity={0.4}
        kernelSize={KernelSize.MEDIUM}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.7}
      />
      <ChromaticAberration
        offset={new Vector2(0.0005, 0.0005)}
        radialModulation={true}
        modulationOffset={0.5}
      />
      <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} />
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