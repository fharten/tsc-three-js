import { Html } from '@react-three/drei';

const Loader = () => {
  return (
    <Html>
      <div className='flex justify-center items-center'>
        <div className='w-20 h-20 border-2 border-[#91d8eb] border-t-[#91d8eb] rounded-full border-opacity-20 animate-spin' />
      </div>
    </Html>
  );
};

export default Loader;
