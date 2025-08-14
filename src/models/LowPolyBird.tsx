import { useGLTF } from '@react-three/drei';
import birdScene from '/assets/3d/lowpolybird.glb';

const LowPolyBird = () => {
  const { scene, animations } = useGLTF(birdScene);

  return (
    <mesh position={[2, 2, 1]} scale={[3, 3, 3]}>
      <primitive object={scene} />
    </mesh>
  );
};

export default LowPolyBird;
