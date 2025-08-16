import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';

import sakura from '../assets/sakura.mp3';
import Loader from '../components/Loader';
import Sky from '../models/Sky';
import { MainBird } from '../models/MainBird';
import LowPolyBird from '../models/LowPolyBird';
import { PirateIsland } from '../models/PirateIsland';
import HomeInfo from '../components/HomeInfo';
import { CyberpunkApartment } from '../models/CyberPunkApartment';
import SkyCyberpunk from '../models/SkyCyberpunk';
import { Tokyo } from '../models/Tokyo';
import SkyCity from '../models/SkyCity';
import SkyTokyo from '../models/SkyTokyo';
import SkySkyline from '../models/SkySkyline';
import { Hovercar } from '../models/Hovercar';

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState<number | null>(1);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  const adjustHovercarForScreenSize = () => {
    let screenScale: [number, number, number],
      screenPosition: [number, number, number];

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -3, -4];
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
      screenScale = [2, 2, 2];
      screenPosition = [1.6, -4, -14];
    }

    return [screenScale, screenPosition];
  };

  const adjustTokyoForScreenSize = () => {
    let screenScale: [number, number, number],
      screenPosition: [number, number, number];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [3.6, -2, -3.419];
    } else {
      screenScale = [2, 2, 2];
      screenPosition = [-1, 2, -20];
    }

    return [screenScale, screenPosition];
  };

  const [hovercarScale, hovercarPosition] = adjustHovercarForScreenSize();
  const [lowPolyBirdScale, lowPolyBirdPosition] =
    adjustLowPolyBirdForScreenSize();
  const [tokyoScale, tokyoPosition] = adjustTokyoForScreenSize();
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
          <directionalLight
            position={[1, 1, 1]}
            intensity={1}
            color={'#ad57ff'}
          />
          <pointLight position={[6, 4, 10]} intensity={2} />
          <directionalLight
            position={[3.5, 4, -12]}
            intensity={1}
            color={'#fff'}
          />
          <directionalLight
            position={[-2, 4, -12]}
            intensity={1}
            color={'#ad57ff'}
          />
          <directionalLight
            position={[-4, 20, -6]}
            intensity={1.5}
            color={'#fff'}
          />
          <directionalLight
            position={[-18, -9, 6]}
            intensity={1}
            color={'#fff'}
          />
          <directionalLight
            position={[7, 20, -1]}
            intensity={1}
            color={'#fff'}
          />
          {/* <ambientLight intensity={1} /> */}
          {/* <hemisphereLight color='#b1e1ff' groundColor='#000' intensity={1} /> */}

          {/* <Sky isRotating={isRotating} /> */}
          {/* <SkyCyberpunk isRotating={isRotating} /> */}
          {/* <SkyCity isRotating={isRotating} /> */}
          {/* <SkyTokyo isRotating={isRotating} /> */}
          <SkySkyline isRotating={isRotating} />
          {/* <LowPolyBird
            position={lowPolyBirdPosition}
            scale={lowPolyBirdScale}
          /> */}
          {/* <PirateIsland
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.2, 2.7077, 0]}
            scale={islandScale}
          /> */}
          {/* <CyberpunkApartment
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={tokyoPosition}
            rotation={[0.2, 1, 0]}
            scale={tokyoScale}
          /> */}
          <Tokyo
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={tokyoPosition}
            rotation={[0.2, 2.25, 0]}
            scale={tokyoScale}
          />
          {/* <MainBird
            isRotating={isRotating}
            position={mainBirdPosition}
            rotation={[0, 20.1, 0]}
            scale={mainBirdScale}
          /> */}
          <Hovercar
            isRotating={isRotating}
            position={hovercarPosition}
            rotation={[0, 1.8, 0]}
            scale={hovercarScale}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
