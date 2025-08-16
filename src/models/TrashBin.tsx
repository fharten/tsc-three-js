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

import scene from '/assets/3d/trashbin.glb';
import type { TrashBinGLTF } from '../types/TrashBin';

interface PageProps {
  currentAnimation: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export function TrashBin({ currentAnimation, ...props }: PageProps) {
  const group = useRef<THREE.Mesh>(null);
  const { nodes, materials, animations } = useGLTF(
    scene,
  ) as unknown as TrashBinGLTF;
  const { actions } = useAnimations(animations, group);

  // This effect will run whenever the currentAnimation prop changes
  useEffect(() => {
    if (actions[currentAnimation]) {
      actions[currentAnimation].repetitions = 0;
      actions[currentAnimation].play();
    }
  }, [actions, currentAnimation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Sketchfab_Scene'>
        <group
          name='Sketchfab_model'
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.435}
        >
          <group name='modelfbx' rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name='Object_2'>
              <group name='RootNode'>
                <group
                  name='Body_low'
                  position={[0, 225.039, 26.963]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name='Body_low_Mat_Sci_Fi_Trash_Bin_0'
                    castShadow
                    receiveShadow
                    geometry={nodes.Body_low_Mat_Sci_Fi_Trash_Bin_0.geometry}
                    material={materials.Mat_Sci_Fi_Trash_Bin}
                  />
                  <group
                    name='Recepticle_Door_low'
                    position={[0, 0.719, -0.602]}
                  >
                    <mesh
                      name='Recepticle_Door_low_Mat_Sci_Fi_Trash_Bin_0'
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Recepticle_Door_low_Mat_Sci_Fi_Trash_Bin_0
                          .geometry
                      }
                      material={materials.Mat_Sci_Fi_Trash_Bin}
                    />
                  </group>
                </group>
                <group
                  name='Light'
                  position={[-346.977, 471.708, -201.687]}
                  rotation={[1.89, 0.881, -2.045]}
                  scale={100}
                >
                  <group name='Object_9' rotation={[Math.PI / 2, 0, 0]}>
                    <group name='Object_10' />
                  </group>
                </group>
                <group
                  name='Light001'
                  position={[154.858, 502.812, 282.738]}
                  rotation={[1.89, 0.881, -2.045]}
                  scale={100}
                >
                  <group name='Object_12' rotation={[Math.PI / 2, 0, 0]}>
                    <group name='Object_13' />
                  </group>
                </group>
                <group
                  name='Paper_Ball'
                  position={[0, 45.39, 36.402]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name='Paper_Ball_Material001_0'
                    castShadow
                    receiveShadow
                    geometry={nodes.Paper_Ball_Material001_0.geometry}
                    material={materials['Material.001']}
                  />
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
