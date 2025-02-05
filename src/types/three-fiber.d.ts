/// <reference types="@react-three/fiber" />
/// <reference types="three" />

import { Vector2 } from 'three';
import { ThreeElements } from '@react-three/fiber';

declare module '@react-three/fiber' {
  interface ThreeElements {
    directionalLight: any;
    ambientLight: any;
    group: any;
    mesh: any;
    meshStandardMaterial: any;
    meshBasicMaterial: any;
    sphereGeometry: any;
  }
}

declare module '@react-three/postprocessing' {
  interface ChromaticAberrationProps {
    offset: Vector2 | [number, number];
    radialModulation?: boolean;
    modulationOffset?: number;
  }
} 