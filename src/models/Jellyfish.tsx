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

import scene from '/assets/3d/jellyfish.glb';
import type { ToonCatGLTF } from '../types/JellyfishGLTF';

interface PageProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

// 3D Model from: https://sketchfab.com/3d-models/fox-f372c04de44640fbb6a4f9e4e5845c78
export function Jellyfish({ ...props }: PageProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    scene,
  ) as unknown as ToonCatGLTF;
  const { actions } = useAnimations(animations, group);

  // This effect will run whenever the currentAnimation prop changes
  useEffect(() => {
    actions['200']?.play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Sketchfab_Scene'>
        <group
          name='Sketchfab_model'
          position={[3.454, -2.309, 0]}
          rotation={[-Math.PI / 2, 0.962, 0]}
        >
          <group name='root'>
            <group name='GLTF_SceneRootNode' rotation={[Math.PI / 2, 0, 0]}>
              <group name='Crystal-jelly_arm_78'>
                <group name='GLTF_created_0'>
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh
                    name='Object_7'
                    geometry={nodes.Object_7.geometry}
                    material={materials['Crystal-jelly_tentacle']}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name='Object_8'
                    geometry={nodes.Object_8.geometry}
                    material={materials['Crystal-jelly_bell1']}
                    skeleton={nodes.Object_8.skeleton}
                  />
                  <skinnedMesh
                    name='Object_9'
                    geometry={nodes.Object_9.geometry}
                    material={materials['Crystal-jelly_bell2']}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <group name='Crystal-jelly_mesh_77' />
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
