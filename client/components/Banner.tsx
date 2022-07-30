import Image from 'next/image';
import bannerImg from '../assets/banner.jpg';

export const Banner = () => {
  return (
    <div className='px-4 md:px-10 lg:px-16 flex flex-col items-center h-screen lg:items-end justify-center lg:h-[100vh]  '>
      <div className='absolute top-0 left-0 -z-50 h-[100vh] w-full'>
        <Image src={bannerImg} layout='fill' objectFit='cover' />
      </div>
      <div className='lg:w-1/2 space-y-6 md:text-center md:w-2/3'>
        <h1 className='text-2xl lg:text-4xl text-[#ffc200] font-semibold font-sans '>
          Title Here
        </h1>
        <p className='text-white'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas
          dolor amet aut molestias tempora eum non placeat maiores culpa
          voluptatem, autem dolore doloremque facilis cum! Consectetur sit
          consequatur corrupti hic!
        </p>
        <button className='bg-[#ffc200] text-[#333] px-4 py-2 rounded font-semibold'>
          Book Now
        </button>
      </div>
    </div>
  );
};
