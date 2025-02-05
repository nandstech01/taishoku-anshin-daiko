/// <reference types="@react-three/fiber" />
/// <reference types="three" />

import { ReactNode } from 'react';
import { HTMLMotionProps, MotionStyle, MotionValue } from 'framer-motion';
import { Vector2 } from 'three';
import { ChromaticAberrationEffect } from 'postprocessing';
import { ThreeElements } from '@react-three/fiber';

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
      directionalLight: JSX.IntrinsicElements['mesh'] & {
        intensity?: number;
        position?: [number, number, number];
        castShadow?: boolean;
        'shadow-mapSize-width'?: number;
        'shadow-mapSize-height'?: number;
      };
      ambientLight: JSX.IntrinsicElements['mesh'] & {
        intensity?: number;
      };
      group: JSX.IntrinsicElements['mesh'];
      mesh: JSX.IntrinsicElements['mesh'];
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