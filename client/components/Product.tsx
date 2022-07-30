import Image from 'next/image';
import React from 'react';
import gas from '../assets/beximco.png';

const product = [
  { imgUrl: gas, name: 'Product Name', price: 1200 },
  { imgUrl: gas, name: 'Product Name', price: 1200 },
  { imgUrl: gas, name: 'Product Name', price: 1200 },
  { imgUrl: gas, name: 'Product Name', price: 1200 },
  { imgUrl: gas, name: 'Product Name', price: 1200 },
  { imgUrl: gas, name: 'Product Name', price: 1200 }
];

export const Product = () => {
  return (
    <div id='product' className='py-12 flex flex-col justify-center'>
      <div className='text-center space-y-4'>
        <h1 className='lg:text-4xl font-semibold'>Products</h1>
        <p className='text-gray-500'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste aliquam
          sapiente repellat,
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-6 md:grid-cols-2 mt-10'>
        {product.map(item => {
          return (
            <div className=' flex flex-col items-center  justify-center space-y-2 transition duration-200 hover:shadow-xl cursor-pointer py-3'>
              <Image src={item.imgUrl} alt='product' width={150} height={250} />
              <h1 className='text-2xl font-semibold'>{item.name}</h1>
              <p className='text-gray-500'>{item.price} tk</p>
              <button className='bg-[#ffc200] text-[#333] px-4 py-2 rounded font-semibold'>
                Order Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
