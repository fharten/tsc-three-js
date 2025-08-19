import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';

import sakura from '../assets/sakura.mp3';
import Loader from '../components/Loader';
import HomeInfo from '../components/HomeInfo';
import { Tokyo } from '../models/Tokyo';
import SkySkyline from '../models/SkySkyline';
import Attribution from '../components/Attribution';
import { LazyPanda } from '../models/LazyPanda';

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState<number | null>(1);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  const adjustLazyPandaForScreenSize = () => {
    let screenScale: [number, number, number],
      screenPosition: [number, number, number];

    if (window.innerWidth < 768) {
      screenScale = [0.4, 0.4, 0.4];
      screenPosition = [0.5, -3, -3];
    } else {
      screenScale = [1.5, 1.5, 1.5];
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

  const [lazyPandaScale, lazyPandaPosition] = adjustLazyPandaForScreenSize();
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
            intensity={0.5}
            color={'#ad57ff'}
          />
          <pointLight position={[6, 4, 10]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight color='#b1e1ff' groundColor='#000' intensity={2} />

          <SkySkyline isRotating={isRotating} />
          <Tokyo
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={tokyoPosition}
            rotation={[0.2, 2.25, 0]}
            scale={tokyoScale}
          />
          <LazyPanda
            isRotating={isRotating}
            position={lazyPandaPosition}
            rotation={[0, 1.8, 0]}
            scale={lazyPandaScale}
          />
        </Suspense>
      </Canvas>
      <Attribution
        title='Vaporwave Tokyo: Sketchfab 3D Editor Challenge'
        link='https://skfb.ly/6DCIU'
        author='William Domeyer'
        licence='Creative Commons Attribution'
        licenceLink='http://creativecommons.org/licenses/by/4.0/'
        title2='Lazy panda'
        link2='https://skfb.ly/oo87M'
        author2='Manogna S'
        licence2='Creative Commons Attribution'
        licence2Link='http://creativecommons.org/licenses/by/4.0/'
      />
    </section>
  );
};

export default Home;
