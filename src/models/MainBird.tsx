import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

import planeScene from '/assets/3d/mainbird.glb';
import { useFrame } from '@react-three/fiber';

interface PageProps {
  isRotating: boolean;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

// 3D Model from: https://sketchfab.com/3d-models/stylized-ww1-plane-c4edeb0e410f46e8a4db320879f0a1db
export function MainBird({ isRotating, ...props }: PageProps) {
  const birdRef = useRef<THREE.Mesh>(null);
  // Load the 3D model and its animations
  const { scene, animations } = useGLTF(planeScene);
  // Get animation actions associated with the plane
  const { actions } = useAnimations(animations, birdRef);

  // Use an effect to control the plane's animation based on 'isRotating'
  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  useEffect(() => {
    if (isRotating) {
      actions['Armature|ArmatureAction']?.play();
    } else {
      actions['Armature|ArmatureAction']?.stop();
    }
  }, [actions, isRotating]);

  return (
    <mesh {...props} ref={birdRef}>
      // use the primitive element when you want to directly embed a complex 3D
      model or scene
      <primitive object={scene} />
    </mesh>
  );
}
