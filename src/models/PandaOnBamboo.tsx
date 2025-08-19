import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import pandaScene from '/assets/3d/pandaonbamboo.glb';
import { useFrame } from '@react-three/fiber';

export function PandaOnBamboo({ scale }: { scale: [number, number, number] }) {
  const pandaRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF(pandaScene);

  useFrame(({ clock }) => {
    if (pandaRef.current)
      pandaRef.current.rotation.y = Math.sin(clock.elapsedTime) * 0.2 + 0.5;
  });

  return (
    <mesh scale={scale} ref={pandaRef}>
      <primitive object={scene} />
    </mesh>
  );
}
