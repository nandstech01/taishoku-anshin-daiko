/// <reference types="@react-three/fiber" />
/// <reference types="three" />
/// <reference types="react" />

import { ReactNode } from 'react';
import { HTMLMotionProps, MotionStyle, MotionValue } from 'framer-motion';
import { Vector2 } from 'three';
import { ChromaticAberrationEffect } from 'postprocessing';
import { ThreeElements, Object3DNode } from '@react-three/fiber';
import * as THREE from 'three';

declare module '@react-three/fiber' {
  interface ThreeElements {
    effectComposer: any;
    bloom: any;
    chromaticAberration: {
      offset?: Vector2 | [number, number];
      radialModulation?: boolean;
      modulationOffset?: number;
    };
    depthOfField: any;
    vignette: any;
  }
}

declare module 'framer-motion' {
  interface MotionProps {
    style?: MotionStyle;
    children?: ReactNode | MotionValue<number> | MotionValue<string>;
    className?: string;
    initial?: any;
    animate?: any;
    exit?: any;
    whileHover?: any;
    variants?: any;
    transition?: any;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
  }

  // パフォーマンス最適化のための拡張型
  interface OptimizedMotionConfig {
    scrollConfig: {
      mobile: {
        viewport: { once: boolean, amount: number },
        transition: {
          type: string,
          ease: string,
          duration: number
        }
      },
      desktop: {
        viewport: { once: boolean, amount: number },
        transition: {
          type: string,
          stiffness: number,
          damping: number
        }
      }
    },
    commonTransition: {
      type: string,
      ease: number[],
      duration: number
    },
    reduceMotion: {
      transition: { duration: number },
      initial: Record<string, any>,
      animate: Record<string, any>,
      exit: Record<string, any>
    },
    optimizedParallax: (strength?: number) => MotionProps,
    optimizedInView: {
      threshold: number,
      triggerOnce: boolean,
      rootMargin: string
    },
    isMobile: boolean
  }

  // willChangeプロパティを明示的に型定義
  interface MotionStyle {
    willChange?: string;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // HTML elements with motion
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & HTMLMotionProps<"div">;
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & HTMLMotionProps<"span">;
      h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & HTMLMotionProps<"h1">;
      h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & HTMLMotionProps<"h2">;
      h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & HTMLMotionProps<"h3">;
      h4: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & HTMLMotionProps<"h4">;
      p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & HTMLMotionProps<"p">;
      a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & HTMLMotionProps<"a">;
      img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & HTMLMotionProps<"img">;
      br: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
      main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HTMLMotionProps<"main">;
      svg: React.SVGProps<SVGSVGElement> & HTMLMotionProps<"svg">;
      path: React.SVGProps<SVGPathElement>;
      'motion.div': HTMLMotionProps<"div">;
      'motion.span': HTMLMotionProps<"span">;
      'motion.h1': HTMLMotionProps<"h1">;
      'motion.h2': HTMLMotionProps<"h2">;
      'motion.p': HTMLMotionProps<"p">;
      'motion.section': HTMLMotionProps<"section">;
      'motion.button': HTMLMotionProps<"button">;
      'motion.a': HTMLMotionProps<"a">;

      // Three.js elements
      ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
      group: Object3DNode<THREE.Group, typeof THREE.Group>;
      line: Object3DNode<THREE.Line, typeof THREE.Line> & {
        geometry?: THREE.BufferGeometry;
        material?: THREE.LineBasicMaterial;
      };
      mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      primitive: Object3DNode<THREE.Object3D, typeof THREE.Object3D>;
      meshStandardMaterial: JSX.IntrinsicElements['mesh'] & {
        color?: string | number;
        emissive?: string | number;
        emissiveIntensity?: number;
        side?: number;
        metalness?: number;
        roughness?: number;
      };
      meshBasicMaterial: JSX.IntrinsicElements['mesh'] & {
        color?: string | number;
        transparent?: boolean;
        opacity?: number;
      };
      sphereGeometry: JSX.IntrinsicElements['mesh'] & {
        args?: [number, number, number];
      };
    }
  }
}

declare module '@react-three/postprocessing' {
  interface ChromaticAberrationProps {
    offset: Vector2 | [number, number];
    radialModulation?: boolean;
    modulationOffset?: number;
  }
}

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
  }
}

export {} 