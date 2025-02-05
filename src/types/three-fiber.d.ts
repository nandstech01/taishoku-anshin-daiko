import * as THREE from 'three';
import { Object3DNode } from '@react-three/fiber';

type ThreeObject3D = THREE.Object3D<THREE.Event>;
type Overwrite<T, U> = Omit<T, keyof U> & U;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: Overwrite<
        Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>,
        { intensity?: number; color?: string | number }
      >;
      directionalLight: Overwrite<
        Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>,
        { intensity?: number; color?: string | number; position?: [number, number, number] }
      >;
      group: Object3DNode<THREE.Group, typeof THREE.Group>;
      line: Overwrite<
        Object3DNode<THREE.Line, typeof THREE.Line>,
        { geometry?: THREE.BufferGeometry; material?: THREE.LineBasicMaterial }
      >;
      mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
    }
  }
} 