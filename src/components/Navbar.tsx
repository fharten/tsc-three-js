import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink
        to='/'
        className='w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md'
      >
        {/* <p className='blue-gradient_text'>TSC</p> */}
        <p className='text-stone-900'>TSC</p>
      </NavLink>
      <nav className='flex text-lg gap-5 md:gap-7 font-medium'>
        <NavLink
          to='/story'
          className={({ isActive }) =>
            isActive ? 'text-[#91d8eb]' : 'text-stone-50'
          }
        >
          Our Story
        </NavLink>
        <NavLink
          to='/menu'
          className={({ isActive }) =>
            isActive ? 'text-[#91d8eb]' : 'text-stone-50'
          }
        >
          Menu
        </NavLink>

        <NavLink
          to='/contact'
          className={({ isActive }) =>
            isActive ? 'text-[#91d8eb]' : 'text-stone-50'
          }
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
