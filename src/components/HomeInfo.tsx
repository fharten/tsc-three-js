import { Link } from 'react-router-dom';

import { ArrowRight } from 'lucide-react';

const HomeInfo = ({ currentStage }: { currentStage: number | null }) => {
  if (currentStage === 1)
    return (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-stone-800 mx-5'>
        Hi, we're
        <span className='font-semibold mx-2 font-chela tracking-widest'>
          TOKYO SUPREME COFFEE
        </span>
        ✌️
        <br />
        Your new favorite coffee place.
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Our story of passion, tradition, <br /> and community in Tokyo's
          coffee scene.
        </p>

        <Link to='/story' className='neo-brutalism-white neo-btn'>
          Philosophy
          <ArrowRight />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          Coffee like you've never experienced it. <br /> Not just coffee.{' '}
          <span className='font-bold font-chela'>EXPERIENCE.</span>
        </p>

        <Link to='/menu' className='neo-brutalism-white neo-btn'>
          Learn more
          <ArrowRight />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Have any questions or want more information? <br /> We're just a few
          keystrokes away
        </p>

        <Link to='/contact' className='neo-brutalism-white neo-btn'>
          Let's talk
          <ArrowRight />
        </Link>
      </div>
    );
  }

  return null;
};

export default HomeInfo;
