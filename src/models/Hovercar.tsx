import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

import hovercarScene from '/assets/3d/hovercar.glb';
import { useFrame } from '@react-three/fiber';

interface PageProps {
  isRotating: boolean;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

// 3D Model from: https://sketchfab.com/3d-models/stylized-ww1-plane-c4edeb0e410f46e8a4db320879f0a1db
export function Hovercar({ isRotating, ...props }: PageProps) {
  const hovercarRef = useRef<THREE.Mesh>(null);
  // Load the 3D model and its animations
  const { scene, animations } = useGLTF(hovercarScene);
  // Get animation actions associated with the plane
  const { actions } = useAnimations(animations, hovercarRef);

  // Use an effect to control the plane's animation based on 'isRotating'
  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  useEffect(() => {
    actions['Take 01']?.play();
  }, [actions]);

  useFrame(({ clock }) => {
    if (!hovercarRef.current || !isRotating) return;
    // Update the Y position to simulate bird-like motion using a sine wave
    hovercarRef.current.position.y =
      Math.sin(clock.elapsedTime) * 1 + props.position[1];
  });

  return (
    <mesh {...props} ref={hovercarRef}>
      // use the primitive element when you want to directly embed a complex 3D
      model or scene
      <primitive object={scene} />
    </mesh>
  );
}
