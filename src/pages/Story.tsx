import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import Loader from '../components/Loader';
import Attribution from '../components/Attribution';
import { PandaOnBamboo } from '../models/PandaOnBamboo';

const Story = () => {
  const adjustPandaForScreenSize = () => {
    let screenScale: [number, number, number];

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale];
  };

  const [pandaScale] = adjustPandaForScreenSize();

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col gap-y-5 mb-20'>
        <h1 className='head-text tracking-widest'>OUR STORY & PHILOSOPHY</h1>
        <h2 className='text-2xl'>
          Welcome to Tokyo Supreme Coffee - Where Tradition Meets Modern Tokyo
        </h2>
        <p>
          Founded in 2018 by Maria Tanaka, a former barista from Vienna who fell
          in love with Tokyo's vibrant coffee culture, our small corner shop
          represents the perfect blend of international inspiration and local
          craftsmanship.
        </p>
        <p>
          We believe that every cup tells a story - not just of the beans
          themselves, but of the people who tend to them, roast them, and brew
          them with passion. Our commitment to ethically sourced, single-origin
          beans from small farms across Central America, Africa, and Southeast
          Asia ensures that each sip carries authentic flavor profiles that
          connect you to the farmers who grow them.
        </p>

        <p className='mb-5'>
          Our space reflects our philosophy: a warm, welcoming environment where
          neighbors become friends, where the gentle sound of the espresso
          machine creates a soundtrack for thoughtful conversations, and where
          every visit feels like coming home. We're not just serving coffee -
          we're creating moments of connection in the heart of Tokyo's bustling
          streets.
        </p>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight position={[0, 0, 1]} intensity={1.5} />
          <ambientLight intensity={0.5} />

          <Suspense fallback={<Loader />}>
            <PandaOnBamboo scale={pandaScale} />
          </Suspense>
        </Canvas>
      </div>

      <Attribution
        title='Panda'
        link='https://skfb.ly/opuRA'
        author='Pisfil'
        licence='Creative
      Commons Attribution'
        licenceLink='http://creativecommons.org/licenses/by/4.0/'
      />
    </section>
  );
};

export default Story;
