import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';

interface Input {
  name?: string;
  email: string;
  password: string;
}

const login = () => {
  const [formMode, setFormMode] = React.useState('login');
  const router = useRouter();

  const { login, signUp, user, token, error } = useAuth();
  if (token) {
    router.push('/');
  }
  if (error) {
    alert(error);
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async ({ email, password, name }) => {
    if (formMode === 'login') {
      await login(email, password);
    } else if (name) {
      await signUp(name, email, password);
    }
  };

  return (
    <div className='flex items-center justify-center w-full h-screen text-white'>
      <Head>
        <title>Login - Borno IT LPG</title>
      </Head>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative space-y-8 mt-24 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
      >
        <div className='flex flex-col space-y-4'>
          {formMode === 'register' && (
            <label className='inline-block'>
              <input
                className='input'
                type='text'
                placeholder='Name'
                {...register(
                  'name',
                  formMode === 'register'
                    ? { required: true }
                    : {
                        required: false
                      }
                )}
              />
            </label>
          )}
          <label className='inline-block'>
            <input
              className='input'
              type='email'
              placeholder='Email'
              {...register('email', { required: true })}
            />
          </label>
          <label className='inline-block'>
            <input
              className='input'
              type='password'
              placeholder='Password'
              {...register('password', { required: true })}
            />
          </label>
        </div>
        <div>
          {formMode === 'login' ? (
            <button className='bg-black text-white px-4 py-2 rounded font-semibold'>
              Login
            </button>
          ) : (
            <button className='bg-black text-white px-4 py-2 rounded font-semibold'>
              Sign Up
            </button>
          )}
        </div>
        {formMode === 'login' && (
          <div>
            New Here?
            <button
              onClick={() => setFormMode('register')}
              className='hover:underline ml-2'
            >
              Sign Up
            </button>
          </div>
        )}
        {formMode === 'register' && (
          <div>
            Already Have an Account?
            <button
              onClick={() => setFormMode('login')}
              className='hover:underline ml-2'
            >
              Login
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default login;
