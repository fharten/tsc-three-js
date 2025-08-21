import {
  ColdCoffeeCreations,
  EspressoClassics,
  NonCoffeeAndLight,
  SmallBitesAndPastries,
} from '../constants';

const Menu = () => {
  return (
    <section className='relative flex lg:flex-row flex-col overflow-hidden'>
      <div className='flex-1 min-w-[50%] flex flex-col gap-y-5'>
        <div className='max-w-5xl mx-auto sm:p-16 !pt-[126px] px-8'>
          <h1 className='head-text'>MENU</h1>

          <h1 className='text-3xl font-black pt-12'>ESPRESSO CLASSICS</h1>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            {EspressoClassics.map((item, index) => (
              <div className='flex flex-col'>
                <div className='flex gap-x-5' key={index}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='size-24 rounded-md'
                  />
                  <div className='flex flex-col flex-1'>
                    <h2 className='text-xl font-bold'>{item.name}</h2>
                    <p>{item.description}</p>
                  </div>
                  <div className='flex flex-col gap-y-2'>
                    {item.price.map((p) => (
                      <div key={p.sum}>
                        <h2 className='font-bold text-right'>{p.sum}</h2>
                        <p className='text-right text-sm -mt-1'>{p.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className='mt-5' />
              </div>
            ))}
          </div>
        </div>

        <div className='bg-stone-50 text-stone-900 pb-5 '>
          <div className='max-w-5xl mx-auto sm:px-16 px-8'>
            <h1 className='text-3xl font-black mt-12'>COLD COFFEE CREATIONS</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
              {ColdCoffeeCreations.map((item, index) => (
                <div className='flex flex-col'>
                  <div className='flex gap-x-5' key={index}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='size-24 rounded-md'
                    />
                    <div className='flex flex-col flex-1'>
                      <h2 className='text-xl font-bold'>{item.name}</h2>
                      <p>{item.description}</p>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                      {item.price.map((p) => (
                        <div key={p.sum}>
                          <h2 className='font-bold text-right'>{p.sum}</h2>
                          <p className='text-right text-sm -mt-1'>{p.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <hr className='mt-5' />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='max-w-5xl mx-auto sm:px-16 px-8'>
          <h1 className='text-3xl font-black mt-12'>NON COFFEE & LIGHT</h1>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            {NonCoffeeAndLight.map((item, index) => (
              <div className='flex flex-col'>
                <div className='flex gap-x-5' key={index}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='size-24 rounded-md'
                  />
                  <div className='flex flex-col flex-1'>
                    <h2 className='text-xl font-bold'>{item.name}</h2>
                    <p>{item.description}</p>
                  </div>
                  <div className='flex flex-col gap-y-2'>
                    {item.price.map((p) => (
                      <div key={p.sum}>
                        <h2 className='font-bold text-right'>{p.sum}</h2>
                        <p className='text-right text-sm -mt-1'>{p.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className='mt-5' />
              </div>
            ))}
          </div>
        </div>

        <div className='bg-stone-50 text-stone-900 pb-5'>
          <div className='max-w-5xl mx-auto sm:px-16 px-8'>
            <h1 className='text-3xl font-black mt-12'>
              SMALL BITES & PASTRIES
            </h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
              {SmallBitesAndPastries.map((item, index) => (
                <div className='flex flex-col'>
                  <div className='flex gap-x-5' key={index}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='size-24 rounded-md'
                    />
                    <div className='flex flex-col flex-1'>
                      <h2 className='text-xl font-bold'>{item.name}</h2>
                      <p>{item.description}</p>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                      {item.price.map((p) => (
                        <div key={p.sum}>
                          <h2 className='font-bold text-right'>{p.sum}</h2>
                          <p className='text-right text-sm -mt-1'>{p.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <hr className='mt-5' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
