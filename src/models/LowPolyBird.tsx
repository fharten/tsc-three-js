import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

import planeScene from '/assets/3d/lowpolybird.glb';
import { useFrame } from '@react-three/fiber';

interface PageProps {
  position: [number, number, number];
  scale: [number, number, number];
}

// 3D Model from: https://sketchfab.com/3d-models/stylized-ww1-plane-c4edeb0e410f46e8a4db320879f0a1db
export default function LowPolyBird({ ...props }: PageProps) {
  const birdRef = useRef<THREE.Mesh>(null);
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, birdRef);

  useEffect(() => {
    actions['Armature.001|Scene|Scene']?.play();
  }, [actions]);

  useFrame(({ clock, camera }) => {
    if (!birdRef.current) return;

    // Create a circular/oval path around the island
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    // Check if the bird reached a certain endpoint relative to the camera
    if (birdRef.current.position.x > camera.position.x + 10) {
      // Change direction to backward and rotate the bird 180 degrees on the y-axis
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x - 10) {
      // Change direction to forward and reset the bird's rotation
      birdRef.current.rotation.y = 0;
    }

    // Update the X and Z positions based on the direction
    if (birdRef.current.rotation.y === 0) {
      // Moving forward
      birdRef.current.position.x += 0.01;
      birdRef.current.position.z -= 0.01;
    } else {
      // Moving backward
      birdRef.current.position.x -= 0.01;
      birdRef.current.position.z += 0.01;
    }
  });

  return (
    <mesh {...props} ref={birdRef}>
      <primitive object={scene} />
    </mesh>
  );
}
