import { ReactNode } from 'react';
import { HTMLMotionProps } from 'framer-motion';

declare module 'framer-motion' {
  export interface MotionProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    id?: string;
    ref?: React.RefObject<HTMLElement | null>;
    initial?: any;
    animate?: any;
    transition?: any;
    whileHover?: any;
  }

  export interface ScrollConfig {
    target?: React.RefObject<HTMLElement | null>;
    offset?: [string, string];
  }

  export function useScroll(config?: ScrollConfig): {
    scrollYProgress: any;
  };
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      primitive: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
      directionalLight: any;

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
    }
  }
} 