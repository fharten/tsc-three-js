import { Link } from 'react-router-dom';

import { arrow } from '../assets/icons';

const HomeInfo = ({ currentStage }: { currentStage: number | null }) => {
  if (currentStage === 1)
    return (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Hi, ich bin
        <span className='font-semibold mx-2 text-white'>Lea.</span>
        <br />
        Gebärdensprachdolmetscherin aus Hamburg.
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Mein Kater Kormi <br /> folgt mir auf Schritt und Tritt.
        </p>

        <Link to='/kormi' className='neo-brutalism-white neo-btn'>
          Mehr
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          Von der Heil- und Krankenpflege über die Logopädie zum Dolmetschen.
        </p>

        <Link to='/vita' className='neo-brutalism-white neo-btn'>
          Lebenslauf
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Sehr geheime und ganz ungeheime <br /> Lieblingsorte in Hamburg.
        </p>

        <Link to='/contact' className='neo-brutalism-white neo-btn'>
          Überblick
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  return null;
};

export default HomeInfo;
