import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';

import Loader from '../components/Loader';

const CoffeeGuide = () => {
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col gap-y-5'>
        <h1 className='head-text'>TOKYO COFFEE CULTURE GUIDE</h1>
        <h2 className='text-2xl'>
          Discovering Japan's Unique Coffee Traditions
        </h2>
        <p>
          Tokyo's coffee culture is a fascinating blend of traditional Japanese
          hospitality and modern innovation. Our guide explores how this city's
          coffee scene has evolved from simple café culture to world-renowned
          specialty coffee experiences.
        </p>
        <p>
          Traditional vs. Modern: From the early 1900s when coffee shops first
          opened in Tokyo, through the post-war era of coffee house culture, to
          today's third-wave specialty coffee movement, our neighborhood has
          witnessed a remarkable transformation.
        </p>

        <p>
          Local Favorites: We recommend trying traditional Japanese coffee
          preparation methods like the pour-over ceremony, which emphasizes
          mindfulness and precision. Our seasonal menu features local
          ingredients like matcha, yuzu, and cherry blossoms that reflect
          Tokyo's distinct seasons.
        </p>

        <p>
          Coffee Etiquette: Tokyo's coffee culture values respect for space and
          quiet contemplation. Our small shop maintains this tradition with
          designated quiet zones, proper cup handling techniques, and the art of
          savoring your coffee slowly rather than rushing through it.
        </p>
        <p>
          Whether you're a first-time visitor or longtime resident, our guide
          helps you appreciate the unique way Tokyo has embraced coffee as both
          a beverage and a lifestyle.
        </p>
      </div>
    </section>
  );
};

export default CoffeeGuide;
