import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Banner, Header, Product } from '../components';

const Home: NextPage = () => {
  return (
    <div className=' relative'>
      <Head>
        <title>Home - Borno IT LPG</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Banner />
      <main className='px-4 md:px-10 lg:px-16'>
        <section>
          <Product />
        </section>
      </main>
      <footer className='py-4 bg-black px-4 md:px-10 lg:px-16 text-white text-center'>
        <p>
          Copyright Reserved <a href='https://bornoit.com'>Borno IT</a> &copy;{' '}
          {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Home;
