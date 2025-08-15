/**
 * IMPORTANT: Loading glTF models into a Three.js scene is a lot of work.
 * Before we can configure or animate our model’s meshes, we need to iterate through
 * each part of our model’s meshes and save them separately.
 *
 * But luckily there is an app that turns gltf or glb files into jsx components
 * For this model, visit https://gltf.pmnd.rs/
 * And get the code. And then add the rest of the things.
 * YOU DON'T HAVE TO WRITE EVERYTHING FROM SCRATCH
 */

import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

import scene from '/assets/3d/tuxedocat.glb';
import type { KormiGLTF } from '../types/KormiGLTF';

interface PageProps {
  isScrolling: boolean;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

// 3D Model from: https://sketchfab.com/3d-models/fox-f372c04de44640fbb6a4f9e4e5845c78
export function Kormi({ isScrolling, ...props }: PageProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    scene,
  ) as unknown as KormiGLTF;
  const { actions } = useAnimations(animations, group);

  // This effect will run whenever the currentAnimation prop changes
  useEffect(() => {
    if (isScrolling) {
      actions['Take 001']?.play();
    } else {
      actions['Take 001']?.stop();
    }
  }, [actions, isScrolling]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Sketchfab_Scene'>
        <group name='Sketchfab_model' rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name='bb98b272cebc4af68c489a5355d252d2fbx'
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name='Object_2'>
              <group name='RootNode'>
                <group name='smellCat'>
                  <group name='Object_5'>
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name='Object_7'
                      geometry={nodes.Object_7.geometry}
                      material={materials.body}
                      skeleton={nodes.Object_7.skeleton}
                    />
                    <skinnedMesh
                      name='Object_8'
                      geometry={nodes.Object_8.geometry}
                      material={materials['whiskers.002']}
                      skeleton={nodes.Object_8.skeleton}
                    />
                    <group name='choucat' />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(scene);
