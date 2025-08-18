import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';

import Loader from '../components/Loader';

const Story = () => {
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col gap-y-5'>
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

        <p>
          Our space reflects our philosophy: a warm, welcoming environment where
          neighbors become friends, where the gentle sound of the espresso
          machine creates a soundtrack for thoughtful conversations, and where
          every visit feels like coming home. We're not just serving coffee -
          we're creating moments of connection in the heart of Tokyo's bustling
          streets.
        </p>
      </div>
    </section>
  );
};

export default Story;
