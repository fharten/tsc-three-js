import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';

import sakura from '../assets/sakura.mp3';
import Loader from '../components/Loader';
import Sky from '../models/Sky';
import { MainBird } from '../models/MainBird';
import LowPolyBird from '../models/LowPolyBird';
import { PirateIsland } from '../models/PirateIsland';
import HomeInfo from '../components/HomeInfo';

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState<number | null>(1);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  const adjustMainBirdForScreenSize = () => {
    let screenScale: [number, number, number],
      screenPosition: [number, number, number];

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustLowPolyBirdForScreenSize = () => {
    let screenScale: [number, number, number],
      screenPosition: [number, number, number];

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [2, 2, -10];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale: [number, number, number],
      screenPosition: [number, number, number];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [3.6, -2, -3.419];
    } else {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [1.6, -4, -14];
    }

    return [screenScale, screenPosition];
  };

  const [mainBirdScale, mainBirdPosition] = adjustMainBirdForScreenSize();
  const [lowPolyBirdScale, lowPolyBirdPosition] =
    adjustLowPolyBirdForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            color='#b1e1ff'
            groundColor='#000000'
            intensity={1}
          />

          <Sky isRotating={isRotating} />
          <LowPolyBird
            position={lowPolyBirdPosition}
            scale={lowPolyBirdScale}
          />
          <PirateIsland
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.2, 2.7077, 0]}
            scale={islandScale}
          />
          <MainBird
            isRotating={isRotating}
            position={mainBirdPosition}
            rotation={[0, 20.1, 0]}
            scale={mainBirdScale}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
