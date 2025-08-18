import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='mt-5 pb-10 flex flex-col col-span-1 md:col-span-5'>
      <div className='flex flex-col justify-center mx-7 md:mx-auto gap-4'>
        <p className='text-center'>
          &copy; {new Date().getFullYear()} florian harten
        </p>
        <div className='flex gap-5 justify-center md:justify-start'>
          <Link to='/impressum'>
            <p className='text-stone-400 hover:text-stone-300'>Impressum</p>
          </Link>
          <Link to='/datenschutz'>
            <p className='text-stone-400 hover:text-stone-300'>Datenschutz</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
