import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import SkyScene from '/assets/3d/skycity.glb';

const SkyCity = ({ isRotating }: { isRotating: boolean }) => {
  const skyRef = useRef<THREE.Mesh>(null);
  const sky = useGLTF(SkyScene);

  useFrame((_, delta) => {
    if (isRotating && skyRef.current) {
      skyRef.current.rotation.y += 0.15 * delta;
    }
  });

  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene} />
    </mesh>
  );
};

export default SkyCity;
