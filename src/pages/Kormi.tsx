import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import Loader from '../components/Loader';
import { Jellyfish } from '../models/Jellyfish';

const Kormi = () => {
  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Kormibär</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
          voluptatem iste deleniti dolorum exercitationem quidem molestiae,
          blanditiis culpa veritatis alias aliquid assumenda quibusdam ad est
          totam beatae laudantium commodi necessitatibus distinctio eaque
          sapiente perspiciatis! Accusamus similique unde possimus qui
          perferendis! Reprehenderit, rerum. Perferendis delectus aspernatur
          assumenda similique maiores dolorem libero ex in fugit, expedita hic
          nihil voluptatum, esse itaque, labore repellendus eum ullam beatae
          architecto voluptas quidem velit! Repudiandae labore ipsam vitae,
          perferendis, voluptate dignissimos ex facilis tempore nemo commodi
          expedita incidunt quibusdam provident autem?
        </p>
      </div>

      <div className='w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />

          <Suspense fallback={<Loader />}>
            <Jellyfish
              position={[0, 30, -60]}
              rotation={[1.5, 1.2, 0]}
              scale={[3.5, 3.5, 3.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Kormi;
