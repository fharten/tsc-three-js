import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import pandaScene from '/assets/3d/lazypanda.glb';
import { useFrame } from '@react-three/fiber';

interface PageProps {
  isRotating: boolean;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

// 3D Model from: https://sketchfab.com/3d-models/stylized-ww1-plane-c4edeb0e410f46e8a4db320879f0a1db
export function LazyPanda({ isRotating, ...props }: PageProps) {
  const pandaRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF(pandaScene);

  useFrame(({ clock }) => {
    if (!pandaRef.current || !isRotating) return;
    pandaRef.current.position.y =
      Math.sin(clock.elapsedTime) * 1 + props.position[1];
  });

  return (
    <mesh {...props} ref={pandaRef}>
      <primitive object={scene} />
    </mesh>
  );
}
