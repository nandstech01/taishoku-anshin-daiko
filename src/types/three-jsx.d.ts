import { Vector2 } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      directionalLight: any;
      ambientLight: any;
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      sphereGeometry: any;
    }
  }
}

declare module '@react-three/postprocessing' {
  interface ChromaticAberrationProps {
    offset: Vector2 | [number, number];
  }
} 