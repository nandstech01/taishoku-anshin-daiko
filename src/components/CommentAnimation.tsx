'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useAnimation } from 'framer-motion';
import Comment from './Comment';

// 高度なコメントデータ
const comments = [
    'もうやめたい',
    'もういきたくない',
    'もうむり',
    'もう限界かも',
    '疲れた…',
    '逃げ出したい',
    '助けて',
    'もう我慢できない',
    '毎日がつらい',
    '息苦しい',
    'なんとかしてほしい',
    'もう続けたくない',
    'もう会いたくない',
    '怖くて眠れない',
    '吐き気がする',
    'パニック状態',
    '心が折れそう',
    '体調が限界',
    'もう戻りたくない',
    '涙が止まらない'
];

interface CommentAnimationProps {
    className?: string;
    onComplete?: () => void;
}

interface Comment3D {
    id: string;
    text: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    isLeft: boolean;
    size: number;
    rotation: {
        x: number;
        y: number;
        z: number;
    };
    depth: number;
    intensity: number;
    velocity: number;
    blur: number;
    glow: string;
}

const CommentAnimation: React.FC<CommentAnimationProps> = ({ className, onComplete }) => {
    const [phase, setPhase] = useState<'comments' | 'message'>('comments');
    const [activeComments, setActiveComments] = useState<Array<Comment3D>>([]);
    const [commentCount, setCommentCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 3Dパララックス効果
    const parallaxX = useTransform(mouseX, [0, window?.innerWidth || 1000], [-20, 20]);
    const parallaxY = useTransform(mouseY, [0, window?.innerHeight || 1000], [-20, 20]);
    const smoothX = useSpring(parallaxX, { stiffness: 100, damping: 30 });
    const smoothY = useSpring(parallaxY, { stiffness: 100, damping: 30 });

    // マウス追跡
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // フィボナッチ数列を生成する関数
    const generateFibonacciSequence = (n: number): number[] => {
        const sequence = [1, 1];
        for (let i = 2; i < n; i++) {
            sequence[i] = sequence[i - 1] + sequence[i - 2];
        }
        return sequence;
    };

    // 黄金螺旋に基づく3D位置計算
    const calculate3DPosition = useMemo(() => (index: number, isLeft: boolean) => {
        const PHI = (1 + Math.sqrt(5)) / 2; // 黄金比
        const fibonacci = generateFibonacciSequence(10);
        const theta = index * PHI * Math.PI * 2;
        
        // フィボナッチ数列を使用して半径を計算
        const radius = fibonacci[Math.min(index, fibonacci.length - 1)] * 5;
        
        // 黄金螺旋に基づく座標計算
        const baseX = isLeft ? 35 : 65;
        const x = baseX + (Math.cos(theta) * radius * 0.3);
        const y = 50 + (Math.sin(theta) * radius * 0.4);
        const z = Math.cos(theta * PHI) * radius * 0.2;

        return { x, y, z };
    }, []);

    // 改良された流体力学シミュレーション
    const calculateFluidDynamics = (position: { x: number; y: number; z: number }) => {
        const time = Date.now() * 0.001;
        const vorticity = 0.05; // 渦度
        const viscosity = 0.02; // 粘性
        
        // Navier-Stokes方程式の簡略化バージョン
        const turbulence = Math.sin(position.x * vorticity + time) * 
                          Math.cos(position.y * vorticity - time) *
                          Math.sin(position.z * vorticity + time * 0.5);

        return {
            x: position.x + turbulence * (1 - viscosity),
            y: position.y + Math.sin(time) * (1 - viscosity),
            z: position.z + Math.cos(time * 1.5) * (1 - viscosity)
        };
    };

    // 高度なグローエフェクト生成
    const generateGlow = (isLeft: boolean, intensity: number) => {
        const baseColor = isLeft ? '156,163,175' : '209,213,219';
        const alpha = 0.1 + (intensity * 0.2);
        return `rgba(${baseColor},${alpha})`;
    };

    // 量子的なノイズ生成（より自然なランダム性）
    const quantumNoise = () => {
        const array = new Uint32Array(4);
        crypto.getRandomValues(array);
        return Array.from(array).map(x => x / 0xffffffff);
    };

    // 3D回転計算の関数を追加
    const calculate3DRotation = useMemo(() => (position: { x: number; y: number; z: number }) => {
        return {
            x: Math.sin(position.y * 0.1) * 15,
            y: Math.cos(position.x * 0.1) * 15,
            z: Math.sin(position.z * 0.1) * 5
        };
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (phase === 'comments') {
            timeoutId = setTimeout(() => setPhase('message'), 500);

            const interval = setInterval(() => {
                if (commentCount < 12) {
                    const isLeft = commentCount % 2 === 0;
                    const basePosition = calculate3DPosition(commentCount, isLeft);
                    const fluidPosition = calculateFluidDynamics(basePosition);
                    const rotation = calculate3DRotation(fluidPosition);
                    const [noise1, noise2, noise3, noise4] = quantumNoise();
                    
                    setActiveComments(prev => [
                        ...prev,
                        {
                            id: `comment-${Date.now()}-${noise1.toString(36)}`,
                            text: comments[Math.floor(noise2 * comments.length)],
                            position: fluidPosition,
                            isLeft,
                            size: 0.9 + noise3 * 0.2,
                            rotation,
                            depth: noise4,
                            intensity: 0.7 + noise1 * 0.3,
                            velocity: 0.8 + noise2 * 0.4,
                            blur: noise3 * 2,
                            glow: generateGlow(isLeft, noise4)
                        }
                    ]);
                    setCommentCount(prev => prev + 1);
                }
            }, 150);

            return () => {
                clearInterval(interval);
                clearTimeout(timeoutId);
            };
        } else if (phase === 'message') {
            timeoutId = setTimeout(() => onComplete?.(), 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [phase, commentCount, calculate3DPosition, calculate3DRotation, onComplete, quantumNoise]);

    useEffect(() => {
        if (activeComments.length > 0) {
            const timer = setTimeout(() => {
                setActiveComments(prev => prev.slice(1));
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [activeComments]);

    return (
        <motion.div 
            ref={containerRef}
            className={`relative w-full h-screen overflow-hidden bg-gray-50/95 ${className || ''}`}
            style={{ 
                perspective: '1200px',
                perspectiveOrigin: '50% 50%'
            }}
        >
            {/* 背景パターンの色を調整 */}
            <motion.div 
                className="absolute inset-0 opacity-[0.08]"
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                    filter: ['blur(0px)', 'blur(1.5px)', 'blur(0px)']
                }}
                transition={{
                    duration: 25,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
                style={{
                    backgroundImage: `
                        linear-gradient(45deg, #94a3b8 1px, transparent 1px),
                        linear-gradient(-45deg, #94a3b8 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}
            />

            <AnimatePresence mode="sync">
                {phase === 'comments' && (
                    <div className="relative w-full h-full px-8">
                        {activeComments.map(comment => (
                            <motion.div
                                key={comment.id}
                                initial={{ 
                                    opacity: 0,
                                    x: comment.isLeft ? -30 : 30,
                                    scale: 0,
                                    rotateX: comment.rotation.x,
                                    rotateY: comment.rotation.y,
                                    rotateZ: comment.rotation.z,
                                    filter: `blur(${comment.blur}px) contrast(150%)`
                                }}
                                animate={{ 
                                    opacity: comment.intensity,
                                    x: 0,
                                    scale: comment.size,
                                    rotateX: 0,
                                    rotateY: 0,
                                    rotateZ: 0,
                                    filter: 'blur(0px) contrast(120%)'
                                }}
                                exit={{ 
                                    opacity: 0,
                                    y: 20,
                                    scale: 0.8,
                                    filter: `blur(${comment.blur * 2}px) contrast(80%)`
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 25,
                                    velocity: comment.velocity
                                }}
                                style={{
                                    position: 'absolute',
                                    left: `${comment.position.x}%`,
                                    top: `${comment.position.y}%`,
                                    transform: `translate(${comment.isLeft ? '0' : '-100'}%, -50%) translateZ(${comment.position.z}px)`,
                                    zIndex: Math.floor(comment.depth * 100)
                                }}
                                className={`
                                    px-4 py-2 rounded-2xl
                                    ${comment.isLeft 
                                        ? 'bg-gradient-to-r from-gray-800/90 to-gray-700/90 text-gray-100 rounded-tl-none' 
                                        : 'bg-gradient-to-r from-gray-700/90 to-gray-600/90 text-gray-100 rounded-tr-none'}
                                    shadow-lg backdrop-blur-sm
                                    font-medium text-sm sm:text-base
                                    border border-gray-500/10
                                    hover:border-gray-400/30
                                    transition-colors duration-300
                                `}
                                whileHover={{
                                    scale: comment.size * 1.05,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <motion.span
                                    style={{
                                        display: 'block',
                                        textShadow: `0 0 15px ${comment.glow}, 0 0 20px rgba(255,255,255,0.2)`
                                    }}
                                >
                                    {comment.text}
                                </motion.span>
                            </motion.div>
                        ))}
                    </div>
                )}

                {phase === 'message' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1,
                            filter: 'blur(0px)',
                            y: [0, -5, 0]
                        }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        transition={{ 
                            duration: 0.8,
                            ease: [0.19, 1, 0.22, 1],
                            y: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <span className="text-gray-900 text-3xl font-bold tracking-widest">
                            退職したい…
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ライティング効果も白系に調整 */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100/20 via-transparent to-gray-100/20" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
                <motion.div 
                    className="absolute inset-0"
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        filter: ['blur(40px)', 'blur(70px)', 'blur(40px)']
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    style={{
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 70%)'
                    }}
                />
            </div>
        </motion.div>
    );
};

export default CommentAnimation;
