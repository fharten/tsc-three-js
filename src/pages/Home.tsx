import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';

import sakura from '../assets/sakura.mp3';
import Loader from '../components/Loader';
import HomeInfo from '../components/HomeInfo';
import { Tokyo } from '../models/Tokyo';
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

    if (window.innerWidth < 768) {
      screenScale = [0.4, 0.4, 0.4];
      screenPosition = [0.5, -3, -3];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -3, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustTokyoForScreenSize = () => {
    let screenScale: [number, number, number],
      screenPosition: [number, number, number];

    if (window.innerWidth < 768) {
      screenScale = [1, 1, 1];
      screenPosition = [0, -2, -20];
    } else {
      screenScale = [2, 2, 2];
      screenPosition = [-1, 2, -20];
    }

    return [screenScale, screenPosition];
  };

  const [hovercarScale, hovercarPosition] = adjustHovercarForScreenSize();
  const [tokyoScale, tokyoPosition] = adjustTokyoForScreenSize();

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
          <ambientLight intensity={1} />
          <hemisphereLight color='#b1e1ff' groundColor='#000' intensity={1} />

          <SkySkyline isRotating={isRotating} />
          <Tokyo
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={tokyoPosition}
            rotation={[0.2, 2.25, 0]}
            scale={tokyoScale}
          />
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
