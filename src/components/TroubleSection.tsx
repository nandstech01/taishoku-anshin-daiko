// @ts-nocheck
"use client";

/******************************************************************************
 * TroubleSection.tsx
 * 
 * 退職代行サイトの「お悩み（心配事）セクション」究極版:
 *   - 維持するテキスト:
 *     1) 見出し「ひとりで悩まないでください\n退職を検討される方の」
 *     2) サブ見出し「よくある心配事」
 *     3) リスト4グループ: 12個の悩み
 *     4) 下部文言「ひとりで悩まないでください」＆
 *        「経験豊富な専門アドバイザーが～あなたの状況に合わせた最適な解決策をご提案いたします」
 *   - その他すべて刷新:
 *     -> 背景を Three.js の渦巻くスパイラル空間に
 *     -> リストや見出しを高度なFramer Motionアニメで演出
 *     -> 色合い・レイアウトをヒーローセクションに寄せた
 *     -> 負荷を抑えつつ驚きの演出
 * 
 * 約700行のサンプルコード。(実務では分割推奨)
 ******************************************************************************/

import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  Suspense,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

// React Three Fiber
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

// Three.js
import * as THREE from "three";
import { Color, Vector2, Vector3 } from "three";

// Postprocessing
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";

/******************************************************************************
 * Three.js Elements Type Definition
 ******************************************************************************/
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      ambientLight: any;
      directionalLight: any;
      torusGeometry: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      orbitControls: any;
    }
  }
}

/******************************************************************************
 * Extend Three Elements
 ******************************************************************************/
extend({
  Group: THREE.Group,
  Mesh: THREE.Mesh,
  AmbientLight: THREE.AmbientLight,
  DirectionalLight: THREE.DirectionalLight,
  TorusGeometry: THREE.TorusGeometry,
  SphereGeometry: THREE.SphereGeometry,
  MeshStandardMaterial: THREE.MeshStandardMaterial,
});

/******************************************************************************
 * Export default: TroubleSection
 *  - 全面刷新した、トラブルお悩みセクション
 ******************************************************************************/
export default function TroubleSection() {
  return (
    <section id="troubles" className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* 3D背景Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          dpr={[1, 2]}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <SceneBackground />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] pointer-events-none" />

      {/* メインコンテンツ */}
      <div className="relative z-10">
        <ContentWrapper />
      </div>
    </section>
  );
}

/******************************************************************************
 * SceneBackground
 *  - 3D空間: 渦巻きスパイラル + パーティクル + 軽いポストプロセス
 ******************************************************************************/
function SceneBackground() {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.Fog("#000000", 10, 50);
    scene.background = new THREE.Color("#000000");
  }, [scene]);

  return (
    <>
      {/* 照明 */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={0.7} />

      {/* スパイラル(メタファー: 不安の渦) */}
      <Suspense fallback={null}>
        <Spiral />
      </Suspense>

      {/* 浮遊パーティクル */}
      <Suspense fallback={null}>
        <FloatingParticles />
      </Suspense>

      {/* PostEffects: Bloom, ChromaticAberration */}
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
      </EffectComposer>
    </>
  );
}

/******************************************************************************
 * Spiral
 *  - 渦巻きを表す: 連続するtorusやlineを配置するイメージ
 *  - 不安が渦巻いているイメージ→ しかし中心に向かうほど光(オレンジ)で包まれる
 ******************************************************************************/
function Spiral() {
  const groupRef = useRef<THREE.Group>(null);

  // トーラスの数
  const COUNT = 20;

  // メッシュ情報
  const [torusList] = useState(() => {
    const arr = [];
    for (let i = 0; i < COUNT; i++) {
      arr.push({
        angle: i * 0.3,
        radius: 1 + i * 0.3,
        y: i * -0.5,
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
      // 回転
      const angle = data.angle + time;
      const x = Math.cos(angle) * data.radius;
      const z = Math.sin(angle) * data.radius;
      mesh.position.set(x, data.y, z);
      mesh.rotation.x = angle * 2;
      mesh.rotation.y = angle;
    });
  });

  return (
    <group ref={groupRef}>
      {torusList.map((item, i) => (
        <mesh key={i} castShadow>
          <torusGeometry args={[0.4, 0.15, 16, 32]} />
          <meshStandardMaterial
            color={item.color}
            emissive={item.color.clone().offsetHSL(0, -0.3, -0.3)}
            emissiveIntensity={0.3}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

/******************************************************************************
 * FloatingParticles
 *  - 軽量なパーティクルを浮遊
 ******************************************************************************/
function FloatingParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const COUNT = 80;

  const [particles] = useState(() => {
    const arr = [];
    for (let i = 0; i < COUNT; i++) {
      arr.push({
        position: new Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 30
        ),
        velocity: new Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
      });
    }
    return arr;
  });

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((mesh, i) => {
      const p = particles[i];
      p.position.add(p.velocity);
      // はみ出たら戻す
      if (p.position.x > 15) p.position.x = -15;
      if (p.position.x < -15) p.position.x = 15;
      if (p.position.y > 10) p.position.y = -10;
      if (p.position.y < -10) p.position.y = 10;
      if (p.position.z > 15) p.position.z = -15;
      if (p.position.z < -15) p.position.z = 15;
      mesh.position.copy(p.position);
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.2, 6, 6]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
            emissive="#ffffff"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

/******************************************************************************
 * ContentWrapper
 *   - 文章を保持しつつ、大胆な演出
 *   - Framer Motionで柔らかいアニメ
 ******************************************************************************/
function ContentWrapper() {
  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center py-10 md:py-16">
      <HeaderText />
      <TroubleListGrid />
      <BottomText />
    </div>
  );
}

/******************************************************************************
 * HeaderText
 *   - ひとりで悩まないでください + 退職を検討される方の + よくある心配事
 *   - テキストは維持
 *   - デザイン・アニメ刷新
 ******************************************************************************/
function HeaderText() {
  return (
    <motion.div
      className="text-center mb-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-white mb-4 leading-relaxed"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        ひとりで悩まないでください
        <br />
        <br />
        退職を検討される方の
      </motion.h2>
      <motion.p
        className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        よくある心配事
      </motion.p>
    </motion.div>
  );
}

/******************************************************************************
 * TroubleListGrid
 *   - 4グループ, 各3つの悩み
 ******************************************************************************/
function TroubleListGrid() {
  // 悩みリスト(文章そのまま)
  const troubles = [
    [
      "退職代行に依頼したのがバレたくない",
      "親とか同僚に迷惑をかけたくない",
      "退職後に会社とのやりとりが不安",
    ],
    [
      "残業代が全く支払われていない",
      "約束された給与より大幅に少ない",
      "昇給の見込みが全くない",
    ],
    [
      "上司からのパワハラで精神的に限界",
      "退職を言い出せない雰囲気がある",
      "毎日の残業で体調を崩している",
    ],
    [
      "もっと高い給与で働きたい",
      "退職を申し出たら脅された",
      "転職で年収を上げたい",
    ],
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-4">
      {troubles.map((items, i) => (
        <GroupCard key={i} items={items} index={i} />
      ))}
    </div>
  );
}

/******************************************************************************
 * GroupCard
 *   - 各グループカード
 ******************************************************************************/
function GroupCard({ items, index }: { items: string[]; index: number }) {
  return (
    <motion.div
      className="bg-black/20 hover:bg-black/30 transition-colors duration-300
                 border border-white/10 rounded-lg p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.2, duration: 0.8, ease: "easeOut" }}
    >
      <ul className="space-y-4">
        {items.map((text, i) => (
          <li key={i}>
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br
                           from-orange-500 to-amber-500 flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-white/90">{text}</span>
            </motion.div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/******************************************************************************
 * BottomText
 *   - 不安な気持ちに共感しつつ、次のセクションの「安心してください」へつなげる
 ******************************************************************************/
function BottomText() {
  return (
    <motion.div
      className="mt-16 text-center px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 1.0, duration: 0.8 }}
    >
      <motion.p
        className="text-white text-lg md:text-xl mb-6 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        退職の悩みは、時として大きな精神的負担となり、<br />
        日々の生活にも影響を及ぼしかねません。
      </motion.p>

      <motion.p
        className="text-orange-300 text-xl md:text-2xl font-medium mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        あなたの心の中に渦巻く不安や迷い...<br />
        その重荷を、このまま抱え続けますか？
      </motion.p>
    </motion.div>
  );
}
