import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header>
      <div>BornoIT LPG</div>
      <ul className='flex space-x-4'>
        <a href='#product' className='text-white text-sm font-semibold'>
          Products
        </a>
        {isAuthenticated ? (
          <li className='text-white text-sm font-semibold'>
            <Link href={'/account'}>Account</Link>
          </li>
        ) : (
          <li className='text-white text-sm font-semibold'>
            <Link href={'/login'}>Login</Link>
          </li>
        )}
      </ul>
    </header>
  );
};
