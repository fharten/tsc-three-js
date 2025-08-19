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

import { useEffect, useRef } from 'react';
import { a } from '@react-spring/three';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { TokyoGLTF } from '../types/TokyoGLTF';

import islandScene from '/assets/3d/tokyosmall.glb';

interface pageProps {
  isRotating: boolean;
  setIsRotating: (value: boolean) => void;
  setCurrentStage: (stage: number | null) => void;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export function Tokyo({
  isRotating,
  setIsRotating,
  setCurrentStage,
  ...props
}: pageProps) {
  const tokyoRef = useRef<THREE.Group>(null);
  // Get access to the Three.js renderer and viewport
  const { gl, viewport } = useThree();
  const { nodes, materials, animations } = useGLTF(
    islandScene,
  ) as unknown as TokyoGLTF;
  const { actions } = useAnimations(animations || [], tokyoRef);

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event: PointerEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event: PointerEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event: PointerEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      if (tokyoRef.current)
        tokyoRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Handle keydown events
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      if (!isRotating) setIsRotating(true);

      if (tokyoRef.current) tokyoRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === 'ArrowRight') {
      if (!isRotating) setIsRotating(true);

      if (tokyoRef.current) tokyoRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  // Handle keyup events
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      setIsRotating(false);
    }
  };

  // Touch events for mobile devices
  const handleTouchStart = (e: TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches[0].clientX;
    lastX.current = clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = e.touches[0].clientX;
      const delta = (clientX - lastX.current) / viewport.width;

      if (tokyoRef.current)
        tokyoRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchmove', handleTouchMove);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useEffect(() => {
    actions['Take 001']?.play();
  }, [actions]);

  // This function is called on each frame update
  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      if (tokyoRef.current)
        tokyoRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = tokyoRef?.current?.rotation.y;
      if (rotation === undefined) return;
      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 3.5 && normalizedRotation <= 4.5:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 5 && normalizedRotation <= 6:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 0.2 && normalizedRotation <= 1.2:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 1.4 && normalizedRotation <= 2.4:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    // {Island 3D model from: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907}
    <a.group ref={tokyoRef} {...props}>
      <group name='Sketchfab_Scene'>
        <group
          name='Sketchfab_model'
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.019}
        >
          <group name='root'>
            <group name='GLTF_SceneRootNode' rotation={[Math.PI / 2, 0, 0]}>
              <group
                name='RootNode_(gltf_orientation_matrix)_0'
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <group name='RootNode_(model_correction_matrix)_1'>
                  <group
                    name='4cd116fc63ca40809810ca0842dc78edfbx_2'
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <group name='_3'>
                      <group name='RootNode_4'>
                        <group name='_5'>
                          <group name='GLTF_created_0'>
                            <primitive
                              object={nodes.GLTF_created_0_rootJoint}
                            />
                            <skinnedMesh
                              name='Object_12'
                              geometry={nodes.Object_12.geometry}
                              material={materials.normal}
                              skeleton={nodes.Object_12.skeleton}
                            />
                            <skinnedMesh
                              name='Object_14'
                              geometry={nodes.Object_14.geometry}
                              material={materials.metalmat}
                              skeleton={nodes.Object_14.skeleton}
                            />
                            <skinnedMesh
                              name='Object_16'
                              geometry={nodes.Object_16.geometry}
                              material={materials.normal}
                              skeleton={nodes.Object_16.skeleton}
                            />
                            <skinnedMesh
                              name='Object_18'
                              geometry={nodes.Object_18.geometry}
                              material={materials.normal}
                              skeleton={nodes.Object_18.skeleton}
                            />
                            <skinnedMesh
                              name='Object_20'
                              geometry={nodes.Object_20.geometry}
                              material={materials.normal}
                              skeleton={nodes.Object_20.skeleton}
                            />
                            <skinnedMesh
                              name='Object_22'
                              geometry={nodes.Object_22.geometry}
                              material={materials.normal}
                              skeleton={nodes.Object_22.skeleton}
                            />
                            <skinnedMesh
                              name='Object_24'
                              geometry={nodes.Object_24.geometry}
                              material={materials.normal}
                              skeleton={nodes.Object_24.skeleton}
                            />
                            <skinnedMesh
                              name='Object_26'
                              geometry={nodes.Object_26.geometry}
                              material={materials.normal}
                              skeleton={nodes.Object_26.skeleton}
                            />
                            <group name='_8' />
                            <group name='_9' />
                            <group name='_11' />
                            <group name='_13' />
                            <group name='_15' />
                            <group name='_17' />
                            <group name='_19' />
                            <group name='_21' />
                            <group
                              name='Object078_53'
                              position={[76.075, 163.937, 118.597]}
                              rotation={[-Math.PI / 3, 0, 0]}
                              scale={3.099}
                            >
                              <group
                                name='_54'
                                position={[-97.409, -7.128, -96.27]}
                              >
                                <group name='Object078_Plastic_Soft_0_55'>
                                  <mesh
                                    name='Object_30'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_30.geometry}
                                    material={materials.Plastic_Soft}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='body_56'
                              position={[41.054, -198.364, 208.679]}
                              rotation={[-Math.PI / 2, 0, 0.947]}
                            >
                              <group name='_57' position={[0, -0.254, 1.817]}>
                                <group name='body_normal_0_58'>
                                  <mesh
                                    name='Object_34'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_34.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                              <group
                                name='leaf_59'
                                position={[-0.015, 1.307, 8.04]}
                              >
                                <group
                                  name='_60'
                                  position={[0.015, -1.561, -6.223]}
                                >
                                  <group name='leaf_normal_0_61'>
                                    <mesh
                                      name='Object_38'
                                      castShadow
                                      receiveShadow
                                      geometry={nodes.Object_38.geometry}
                                      material={materials.normal}
                                    />
                                  </group>
                                </group>
                              </group>
                              <group
                                name='hand2_62'
                                position={[2.127, -0.734, 5.063]}
                                rotation={[0, Math.PI / 3, 0]}
                              >
                                <group
                                  name='_63'
                                  position={[-2.127, 0.48, -3.246]}
                                >
                                  <group name='hand2_normal_0_64'>
                                    <mesh
                                      name='Object_42'
                                      castShadow
                                      receiveShadow
                                      geometry={nodes.Object_42.geometry}
                                      material={materials.normal}
                                    />
                                  </group>
                                </group>
                              </group>
                              <group
                                name='hand1_65'
                                position={[-2.169, -0.734, 5.084]}
                                rotation={[0, -Math.PI / 3, 0]}
                              >
                                <group
                                  name='_66'
                                  position={[2.169, 0.48, -3.267]}
                                >
                                  <group name='hand1_normal_0_67'>
                                    <mesh
                                      name='Object_46'
                                      castShadow
                                      receiveShadow
                                      geometry={nodes.Object_46.geometry}
                                      material={materials.normal}
                                    />
                                  </group>
                                </group>
                              </group>
                              <group
                                name='foot2_68'
                                position={[2.428, -0.923, 2.02]}
                              >
                                <group
                                  name='_69'
                                  position={[-2.428, 0.669, -0.203]}
                                >
                                  <group name='foot2_normal_0_70'>
                                    <mesh
                                      name='Object_50'
                                      castShadow
                                      receiveShadow
                                      geometry={nodes.Object_50.geometry}
                                      material={materials.normal}
                                    />
                                  </group>
                                </group>
                              </group>
                              <group
                                name='foot1_71'
                                position={[-2.491, -0.923, 1.978]}
                              >
                                <group
                                  name='_72'
                                  position={[2.491, 0.669, -0.161]}
                                >
                                  <group name='foot1_normal_0_73'>
                                    <mesh
                                      name='Object_54'
                                      castShadow
                                      receiveShadow
                                      geometry={nodes.Object_54.geometry}
                                      material={materials.normal}
                                    />
                                  </group>
                                </group>
                              </group>
                            </group>
                            <group
                              name='Object608_75'
                              position={[-54.38, 114.483, -87.573]}
                              rotation={[-Math.PI / 2, 0, 0]}
                              scale={3.099}
                            >
                              <group
                                name='_76'
                                position={[-55.32, -73.646, -80.314]}
                              >
                                <group name='Object608_metalmat_0_77'>
                                  <mesh
                                    name='Object_58'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_58.geometry}
                                    material={materials.metalmat}
                                  />
                                </group>
                                <group name='Object608_paintmat_0_78'>
                                  <mesh
                                    name='Object_60'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_60.geometry}
                                    material={materials.paintmat}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Object649_79'
                              position={[-85.046, 5.403, -25.433]}
                              rotation={[-Math.PI / 2, 0, 0]}
                            >
                              <group name='Object649_normal_0_80'>
                                <mesh
                                  name='Object_63'
                                  castShadow
                                  receiveShadow
                                  geometry={nodes.Object_63.geometry}
                                  material={materials.normal}
                                />
                              </group>
                              <group name='Object649_paintmat_0_81'>
                                <mesh
                                  name='Object_65'
                                  castShadow
                                  receiveShadow
                                  geometry={nodes.Object_65.geometry}
                                  material={materials.paintmat}
                                />
                              </group>
                              <group name='Object649_metalmat_0_82'>
                                <mesh
                                  name='Object_67'
                                  castShadow
                                  receiveShadow
                                  geometry={nodes.Object_67.geometry}
                                  material={materials.metalmat}
                                />
                              </group>
                              <group name='Object649_Plastic_Soft_0_83'>
                                <mesh
                                  name='Object_69'
                                  castShadow
                                  receiveShadow
                                  geometry={nodes.Object_69.geometry}
                                  material={materials.Plastic_Soft}
                                />
                              </group>
                              <group name='Object649_alpha_glass_0_84'>
                                <mesh
                                  name='Object_71'
                                  castShadow
                                  receiveShadow
                                  geometry={nodes.Object_71.geometry}
                                  material={materials.alpha_glass}
                                />
                              </group>
                              <group name='Object649_glassmat_0_85'>
                                <mesh
                                  name='Object_73'
                                  castShadow
                                  receiveShadow
                                  geometry={nodes.Object_73.geometry}
                                  material={materials.glassmat}
                                />
                              </group>
                              <group name='Object649_Material_#5511_0_86'>
                                <mesh
                                  name='Object_75'
                                  castShadow
                                  receiveShadow
                                  geometry={nodes.Object_75.geometry}
                                  material={materials.Material_5511}
                                />
                              </group>
                              <group name='Object649_Material_#5512_0_87'>
                                <mesh
                                  name='Object_77'
                                  castShadow
                                  receiveShadow
                                  geometry={nodes.Object_77.geometry}
                                  material={materials.Material_5512}
                                />
                              </group>
                              <group name='Object649_glass_transp_0_88'>
                                <mesh
                                  name='Object_79'
                                  castShadow
                                  receiveShadow
                                  geometry={nodes.Object_79.geometry}
                                  material={materials.glass_transp}
                                />
                              </group>
                              <group name='Object649_interiors_0_89'>
                                <mesh
                                  name='Object_81'
                                  castShadow
                                  receiveShadow
                                  geometry={nodes.Object_81.geometry}
                                  material={materials.interiors}
                                />
                              </group>
                              <group name='Object649_alpha_0_90'>
                                <mesh
                                  name='Object_83'
                                  castShadow
                                  receiveShadow
                                  geometry={nodes.Object_83.geometry}
                                  material={materials.alpha}
                                />
                              </group>
                            </group>
                            <group
                              name='wire7_91'
                              position={[53.443, -91.07, 179.833]}
                              rotation={[-1.534, 0, 0]}
                            >
                              <group
                                name='_92'
                                position={[-138.488, 205.266, 96.473]}
                              >
                                <group name='wire7_normal_0_93'>
                                  <mesh
                                    name='Object_87'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_87.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Object674_94'
                              position={[-85.046, 5.403, -25.433]}
                              rotation={[-Math.PI / 2, 0, 0]}
                            >
                              <group name='Object674_outline_0_95'>
                                <mesh
                                  name='Object_90'
                                  castShadow
                                  receiveShadow
                                  geometry={nodes.Object_90.geometry}
                                  material={materials.outline}
                                />
                              </group>
                              <group name='Object674_outline_0_96'>
                                <mesh
                                  name='Object_92'
                                  castShadow
                                  receiveShadow
                                  geometry={nodes.Object_92.geometry}
                                  material={materials.outline}
                                />
                              </group>
                            </group>
                            <group
                              name='Object675_97'
                              position={[85.462, -196.519, -246.386]}
                              rotation={[-Math.PI / 2, 0, 3.113]}
                            >
                              <group name='_98' position={[0, 0, 76.43]}>
                                <group name='Object675_metalmat_0_99'>
                                  <mesh
                                    name='Object_96'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_96.geometry}
                                    material={materials.metalmat}
                                  />
                                </group>
                                <group name='Object675_paintmat_0_100'>
                                  <mesh
                                    name='Object_98'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_98.geometry}
                                    material={materials.paintmat}
                                  />
                                </group>
                                <group name='Object675_glassmat_0_101'>
                                  <mesh
                                    name='Object_100'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_100.geometry}
                                    material={materials.glassmat}
                                  />
                                </group>
                                <group name='Object675_outline_0_102'>
                                  <mesh
                                    name='Object_102'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_102.geometry}
                                    material={materials.outline}
                                  />
                                </group>
                              </group>
                              <group
                                name='Object680_103'
                                position={[-12.887, 0, 8.351]}
                              >
                                <group
                                  name='_104'
                                  position={[12.887, 0, 68.079]}
                                >
                                  <group name='Object680_metalmat_0_105'>
                                    <mesh
                                      name='Object_106'
                                      castShadow
                                      receiveShadow
                                      geometry={nodes.Object_106.geometry}
                                      material={materials.metalmat}
                                    />
                                  </group>
                                </group>
                              </group>
                              <group
                                name='Object681_106'
                                position={[14.29, 0, 8.351]}
                              >
                                <group
                                  name='_107'
                                  position={[12.887, 0, 68.079]}
                                >
                                  <group name='Object681_metalmat_0_108'>
                                    <mesh
                                      name='Object_110'
                                      castShadow
                                      receiveShadow
                                      geometry={nodes.Object_110.geometry}
                                      material={materials.metalmat}
                                    />
                                  </group>
                                </group>
                              </group>
                            </group>
                            <group
                              name='Object532_109'
                              position={[-29.258, -38.731, -7.815]}
                              rotation={[-Math.PI / 2, 0, -0.698]}
                              scale={3.099}
                            >
                              <group
                                name='_110'
                                position={[-17.707, -77.448, -30.882]}
                                rotation={[0, 0, 0.698]}
                              >
                                <group name='Object532_normal_0_111'>
                                  <mesh
                                    name='Object_114'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_114.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Object531_112'
                              position={[-29.696, -38.731, -8.183]}
                              rotation={[-Math.PI / 2, 0, 0]}
                              scale={3.099}
                            >
                              <group
                                name='_113'
                                position={[-63.347, -47.947, -30.882]}
                              >
                                <group name='Object531_normal_0_114'>
                                  <mesh
                                    name='Object_118'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_118.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Object689_115'
                              position={[-245.525, -161.782, -259.308]}
                              rotation={[-1.627, -0.067, -0.7]}
                            >
                              <group name='_116' rotation={[0, 0, 0.698]}>
                                <group name='Object689_metalmat_0_117'>
                                  <mesh
                                    name='Object_122'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_122.geometry}
                                    material={materials.metalmat}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Plane001_118'
                              position={[-101.44, 184.595, -141.828]}
                              rotation={[-Math.PI / 2, 0, -0.14]}
                            >
                              <group
                                name='_119'
                                position={[-0.965, -3.606, -2.09]}
                              >
                                <group name='Plane001_normal_0_120'>
                                  <mesh
                                    name='Object_126'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_126.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Plane003_121'
                              position={[-95.311, 184.595, -140.965]}
                              rotation={[Math.PI / 2, 0, 0.14]}
                              scale={-1}
                            >
                              <group
                                name='_122'
                                position={[-0.965, -3.606, -2.09]}
                              >
                                <group name='Plane003_normal_0_123'>
                                  <mesh
                                    name='Object_130'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_130.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Plane104_125'
                              position={[-83.171, 184.595, -140.38]}
                              rotation={[-Math.PI / 2, 0, 0.3]}
                            >
                              <group
                                name='_126'
                                position={[-0.965, -3.606, -2.09]}
                              >
                                <group name='Plane104_normal_0_127'>
                                  <mesh
                                    name='Object_134'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_134.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Plane103_128'
                              position={[-77.258, 184.595, -142.209]}
                              rotation={[Math.PI / 2, 0, -0.3]}
                              scale={-1}
                            >
                              <group
                                name='_129'
                                position={[-0.965, -3.606, -2.09]}
                              >
                                <group name='Plane103_normal_0_130'>
                                  <mesh
                                    name='Object_138'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_138.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Plane105_132'
                              position={[133.481, 48.269, -68.276]}
                              rotation={[-Math.PI / 2, 0, -1.892]}
                            >
                              <group
                                name='_133'
                                position={[-0.965, -3.606, -2.09]}
                              >
                                <group name='Plane105_normal_0_134'>
                                  <mesh
                                    name='Object_142'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_142.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Plane106_136'
                              position={[131.529, 48.269, -62.403]}
                              rotation={[Math.PI / 2, 0, 1.892]}
                              scale={-1}
                            >
                              <group
                                name='_137'
                                position={[-0.965, -3.606, -2.09]}
                              >
                                <group name='Plane106_normal_0_138'>
                                  <mesh
                                    name='Object_146'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_146.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Plane108_139'
                              position={[148.082, 111.708, 190.16]}
                              rotation={[-Math.PI / 2, 0, 2.969]}
                            >
                              <group
                                name='_140'
                                position={[-0.965, -3.606, -2.09]}
                              >
                                <group name='Plane108_normal_0_141'>
                                  <mesh
                                    name='Object_150'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_150.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Plane107_143'
                              position={[141.985, 111.708, 189.096]}
                              rotation={[Math.PI / 2, 0, -2.969]}
                              scale={-1}
                            >
                              <group
                                name='_144'
                                position={[-0.965, -3.606, -2.09]}
                              >
                                <group name='Plane107_normal_0_145'>
                                  <mesh
                                    name='Object_154'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_154.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Plane109_147'
                              position={[172.103, 108.396, 188.554]}
                              rotation={[-Math.PI / 2, 0, 2.068]}
                            >
                              <group
                                name='_148'
                                position={[-0.965, -3.606, -2.09]}
                              >
                                <group name='Plane109_normal_0_149'>
                                  <mesh
                                    name='Object_158'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_158.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Plane110_150'
                              position={[169.153, 108.396, 183.113]}
                              rotation={[Math.PI / 2, 0, -2.068]}
                              scale={-1}
                            >
                              <group
                                name='_151'
                                position={[-0.965, -3.606, -2.09]}
                              >
                                <group name='Plane110_normal_0_152'>
                                  <mesh
                                    name='Object_162'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_162.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Plane111_153'
                              position={[38.825, 198.597, 68.564]}
                              rotation={[1.571, 0, -0.135]}
                              scale={-1}
                            >
                              <group
                                name='_154'
                                position={[-0.965, -3.606, -2.09]}
                              >
                                <group name='Plane111_normal_0_155'>
                                  <mesh
                                    name='Object_166'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_166.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Plane112_156'
                              position={[32.692, 198.597, 69.394]}
                              rotation={[-Math.PI / 2, 0, 0.135]}
                            >
                              <group
                                name='_157'
                                position={[-0.965, -3.606, -2.09]}
                              >
                                <group name='Plane112_normal_0_158'>
                                  <mesh
                                    name='Object_170'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_170.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Object704_160'
                              position={[-134.881, -36.701, -123.583]}
                              rotation={[-1.576, 0.01, -0.018]}
                            >
                              <group
                                name='_161'
                                position={[49.835, -98.15, 42.104]}
                              >
                                <group name='Object704_Plastic_Soft_0_162'>
                                  <mesh
                                    name='Object_174'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_174.geometry}
                                    material={materials.Plastic_Soft}
                                  />
                                </group>
                                <group name='Object704_metalmat_0_163'>
                                  <mesh
                                    name='Object_176'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_176.geometry}
                                    material={materials.metalmat}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='wire1_164'
                              position={[11.349, -53.562, -65.672]}
                              rotation={[-1.748, -0.095, 0.141]}
                            >
                              <group
                                name='_165'
                                position={[-101.137, -36.732, 53.01]}
                                rotation={[0.189, 0, -0.143]}
                              >
                                <group name='wire1_Plastic_Soft_0_166'>
                                  <mesh
                                    name='Object_180'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_180.geometry}
                                    material={materials.Plastic_Soft}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='wire2_167'
                              position={[51.826, -43.974, -45.541]}
                              rotation={[-1.607, -0.035, -0.803]}
                            >
                              <group
                                name='_168'
                                position={[-80.707, -112.36, 49.377]}
                                rotation={[0, 0, 0.802]}
                              >
                                <group name='wire2_Plastic_Soft_0_169'>
                                  <mesh
                                    name='Object_184'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_184.geometry}
                                    material={materials.Plastic_Soft}
                                  />
                                </group>
                              </group>
                              <group
                                name='Object081_170'
                                position={[3.654, -65.195, -24.493]}
                                rotation={[0.043, 0.012, -2.868]}
                                scale={3.099}
                              >
                                <group
                                  name='_171'
                                  position={[-91.861, 2.868, -19.124]}
                                  rotation={[0, 0, -0.519]}
                                >
                                  <group name='Object081_normal_0_172'>
                                    <mesh
                                      name='Object_188'
                                      castShadow
                                      receiveShadow
                                      geometry={nodes.Object_188.geometry}
                                      material={materials.normal}
                                    />
                                  </group>
                                </group>
                              </group>
                              <group
                                name='Object332_173'
                                position={[3.799, -102.162, -21.43]}
                                rotation={[0.051, -0.078, -2.349]}
                                scale={3.099}
                              >
                                <group
                                  name='_174'
                                  position={[-78.668, -54.735, -19.124]}
                                >
                                  <group name='Object332_normal_0_175'>
                                    <mesh
                                      name='Object_192'
                                      castShadow
                                      receiveShadow
                                      geometry={nodes.Object_192.geometry}
                                      material={materials.normal}
                                    />
                                  </group>
                                </group>
                              </group>
                              <group
                                name='Object682_176'
                                position={[0.542, -22.699, -18.803]}
                                rotation={[0.076, -0.03, -1.641]}
                                scale={3.099}
                              >
                                <group
                                  name='_177'
                                  position={[-78.668, -54.735, -19.124]}
                                >
                                  <group name='Object682_normal_0_178'>
                                    <mesh
                                      name='Object_196'
                                      castShadow
                                      receiveShadow
                                      geometry={nodes.Object_196.geometry}
                                      material={materials.normal}
                                    />
                                  </group>
                                </group>
                              </group>
                            </group>
                            <group
                              name='wire3_179'
                              position={[-3.768, -84.443, -56.369]}
                              rotation={[-Math.PI / 2, 0, 0.069]}
                            >
                              <group
                                name='_180'
                                position={[-83.209, -25.286, 89.846]}
                                rotation={[0, 0, -0.069]}
                              >
                                <group name='wire3_normal_0_181'>
                                  <mesh
                                    name='Object_200'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_200.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='wire4_182'
                              position={[50.921, -99.013, -52.273]}
                              rotation={[-1.559, 0.072, -0.166]}
                            >
                              <group
                                name='_183'
                                position={[-129.692, -48.861, 104.416]}
                                rotation={[0, 0, 0.165]}
                              >
                                <group name='wire4_normal_0_184'>
                                  <mesh
                                    name='Object_204'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_204.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='wire5_185'
                              position={[77.672, -109.814, -59.703]}
                              rotation={[-1.557, -0.049, 0.285]}
                            >
                              <group
                                name='_186'
                                position={[-165.796, 12.777, 115.217]}
                                rotation={[0, 0, -0.284]}
                              >
                                <group name='wire5_normal_0_187'>
                                  <mesh
                                    name='Object_208'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_208.geometry}
                                    material={materials.normal}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Object705_188'
                              position={[-85.046, 5.403, -25.433]}
                              rotation={[-Math.PI / 2, 0, 0]}
                            >
                              <group name='Object705_Material_#5516_0_189'>
                                <mesh
                                  name='Object_211'
                                  castShadow
                                  receiveShadow
                                  geometry={nodes.Object_211.geometry}
                                  material={materials.Material_5516}
                                />
                              </group>
                            </group>
                            <group
                              name='treezzzzz_190'
                              position={[-173.389, -142.472, 79.929]}
                              rotation={[-Math.PI / 2, 0, 0]}
                            >
                              <group
                                name='Object619_191'
                                position={[80.208, -105.995, -2.985]}
                                rotation={[-0.32, 0.86, -1.371]}
                                scale={0.792}
                              >
                                <group
                                  name='_192'
                                  position={[0.668, 3.969, 17.987]}
                                >
                                  <group name='Object619_alpha_0_193'>
                                    <mesh
                                      name='Object_216'
                                      castShadow
                                      receiveShadow
                                      geometry={nodes.Object_216.geometry}
                                      material={materials.alpha_0}
                                    />
                                  </group>
                                </group>
                              </group>
                              <group
                                name='Object620_194'
                                position={[-62.026, -105.946, -1.428]}
                                rotation={[-0.32, 0.86, -1.371]}
                                scale={0.792}
                              >
                                <group
                                  name='_195'
                                  position={[0.668, 3.969, 17.987]}
                                >
                                  <group name='Object620_alpha_0_196'>
                                    <mesh
                                      name='Object_220'
                                      castShadow
                                      receiveShadow
                                      geometry={nodes.Object_220.geometry}
                                      material={materials.alpha_0}
                                    />
                                  </group>
                                </group>
                              </group>
                              <group
                                name='Object621_197'
                                position={[-81.053, 105.386, -0.664]}
                                rotation={[-0.32, 0.86, -1.371]}
                                scale={0.792}
                              >
                                <group
                                  name='_198'
                                  position={[0.668, 3.969, 17.987]}
                                >
                                  <group name='Object621_alpha_0_199'>
                                    <mesh
                                      name='Object_224'
                                      castShadow
                                      receiveShadow
                                      geometry={nodes.Object_224.geometry}
                                      material={materials.alpha_0}
                                    />
                                  </group>
                                </group>
                              </group>
                            </group>
                            <group
                              name='Object622_200'
                              position={[-85.046, 5.403, -25.433]}
                              rotation={[-Math.PI / 2, 0, 0]}
                            >
                              <group name='Object622_alpha_0_201'>
                                <mesh
                                  name='Object_227'
                                  castShadow
                                  receiveShadow
                                  geometry={nodes.Object_227.geometry}
                                  material={materials.alpha_0}
                                />
                              </group>
                            </group>
                            <group
                              name='Object706_202'
                              position={[26.374, -164.473, 185.106]}
                              rotation={[-Math.PI / 2, 0, 0]}
                            >
                              <group
                                name='_203'
                                position={[-111.42, 210.54, 169.876]}
                              >
                                <group name='Object706_Material_#5518_0_204'>
                                  <mesh
                                    name='Object_231'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_231.geometry}
                                    material={materials.Material_5518}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Object707_205'
                              position={[26.374, -163.141, 185.106]}
                              rotation={[-Math.PI / 2, 0, 0]}
                            >
                              <group
                                name='_206'
                                position={[-111.42, 210.54, 168.544]}
                              >
                                <group name='Object707_Material_#5518_0_207'>
                                  <mesh
                                    name='Object_235'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_235.geometry}
                                    material={materials.Material_5518}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Object708_208'
                              position={[-121.509, 153.741, 54.209]}
                              rotation={[-Math.PI / 2, 0, 0]}
                            >
                              <group
                                name='_209'
                                position={[-111.42, 210.54, 169.876]}
                              >
                                <group name='Object708_Material_#5518_0_210'>
                                  <mesh
                                    name='Object_239'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_239.geometry}
                                    material={materials.Material_5518}
                                  />
                                </group>
                              </group>
                            </group>
                            <group
                              name='Object709_211'
                              position={[-121.509, 155.073, 54.209]}
                              rotation={[-Math.PI / 2, 0, 0]}
                            >
                              <group
                                name='_212'
                                position={[-111.42, 210.54, 168.544]}
                              >
                                <group name='Object709_Material_#5518_0_213'>
                                  <mesh
                                    name='Object_243'
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_243.geometry}
                                    material={materials.Material_5518}
                                  />
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </a.group>
  );
}
