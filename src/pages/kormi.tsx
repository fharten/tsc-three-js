import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';

import { Kormi } from '../models/Kormi';
import Loader from '../components/Loader';

const Contact = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollStopDelay = 500;

  useEffect(() => {
    let scrollTimeout: number | undefined;

    const handleScroll = () => {
      setIsScrolling(true);

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, scrollStopDelay);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in Touch</h1>
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
          expedita incidunt quibusdam provident autem? Necessitatibus ratione
          unde esse nisi aut quam recusandae, repudiandae temporibus ad? Dolore
          reprehenderit consequatur quas sint tempore cupiditate doloremque et
          laudantium quia facere natus tempora voluptatem, pariatur in
          perspiciatis optio, repellendus, error ratione laborum iure quisquam?
          Delectus, a eum earum reiciendis, beatae quo accusantium maxime iste
          vitae molestiae debitis temporibus quasi minus. Quia deleniti
          provident blanditiis iusto ab vero? Magnam, ullam perferendis? Error
          dolorum praesentium debitis fugit labore doloribus soluta assumenda
          esse, consequuntur, cum sunt impedit necessitatibus quod et deserunt
          beatae voluptatem voluptate vel ipsam dolores itaque atque velit non
          corrupti? Nihil, dolores! Minus necessitatibus facilis eius amet
          corrupti sint aut rem labore adipisci sunt dicta ratione, alias
          deleniti iure doloribus quaerat fugit cumque impedit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Natus illo, fugiat
          excepturi iste dolores beatae laborum quam exercitationem saepe?
          Accusamus, est doloremque! Perspiciatis minima natus tempora? Adipisci
          corporis porro culpa ratione neque, modi a, voluptatum quam pariatur
          dolores itaque, exercitationem suscipit molestias. Quasi provident
          incidunt quaerat minus repellendus ipsam itaque, obcaecati maxime
          labore iusto nobis beatae delectus inventore, perspiciatis ullam
          officia ipsa a optio tenetur saepe! Molestias, at tenetur repudiandae
          animi maxime, iste itaque dolorum nisi earum omnis officia. Deserunt
          corrupti ullam possimus iste eligendi molestias quia qui a atque in
          recusandae iure perferendis itaque quo, asperiores praesentium nisi
          corporis sed, nihil nostrum. Ullam molestias nihil quasi maxime
          voluptatem debitis dolorem quos nisi consequuntur voluptatibus?
          Debitis iste non libero, ex magnam numquam provident voluptatibus,
          quaerat qui molestias pariatur. Nesciunt doloremque omnis vero, labore
          dolores minima expedita maxime earum sapiente odio tempora non
          consectetur facere repellat voluptatem harum asperiores id unde
          tenetur nisi. Quasi ea tenetur ipsam, beatae harum eaque voluptates
          fugiat doloribus eligendi perspiciatis alias voluptas deleniti
          delectus sapiente? Harum laboriosam possimus rerum quos quibusdam fuga
          ipsa optio fugit distinctio consectetur quod cum sequi natus, sapiente
          facilis quis hic est at soluta doloremque cumque, odit expedita! Odit
          similique error accusamus excepturi earum iure sequi itaque nobis!
          Molestias minus vel explicabo, aut illo autem quia quos distinctio
          sint. Suscipit recusandae est repellendus consectetur. Quis nulla ut
          porro laudantium possimus nisi iste molestias eligendi. Inventore
          dolores voluptatibus dolorem? Corporis ut qui assumenda eaque
          consequatur, architecto possimus alias aspernatur aperiam sapiente
          vitae voluptatum nihil earum numquam laudantium a quaerat? Repudiandae
          quaerat consequuntur nulla nam, debitis excepturi animi odit. Commodi
          exercitationem harum eligendi ex laborum consectetur repellat
          laudantium, eveniet reiciendis magnam doloribus neque. Saepe autem
          adipisci nostrum minus voluptatum, possimus exercitationem. Optio
          molestias perferendis praesentium quas nisi corporis, sequi qui alias
          nostrum cumque molestiae unde pariatur repudiandae ducimus voluptatem
          delectus rem nulla assumenda maxime? Quam nostrum reprehenderit,
          nesciunt omnis dolorum suscipit sed at quo qui natus aliquid animi
          sit, quis fugit accusamus repellat aut beatae facilis officia tenetur
          architecto magnam doloremque consequuntur. Sint laboriosam explicabo
          aspernatur cupiditate ea corporis, distinctio quia expedita minus.
          Iste nisi aspernatur dicta neque quis, soluta, fuga veniam illum omnis
          esse praesentium adipisci odit laborum dignissimos similique,
          recusandae impedit ducimus ad autem. Harum perferendis, deserunt
          assumenda aut officiis beatae sunt ullam numquam asperiores. Odio,
          assumenda dolore voluptates unde quaerat architecto incidunt nam ex
          ratione non nesciunt repudiandae doloribus possimus sequi.
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
            <Kormi
              isScrolling={isScrolling}
              position={[0, 0.35, 0]}
              rotation={[13, 0.6, 0]}
              scale={[1.3, 1.3, 1.3]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
