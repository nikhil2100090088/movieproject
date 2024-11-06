import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../download.png';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-3 py-4 bg-white border-b-2 border-gray-200'>
      <div className='flex items-center space-x-4'>
        <img className='w-10' src={Logo} alt='Logo' />
        <Link to='/movieproject/' className='text-blue-400 text-3xl font-bold'>
          🎬 Movies
        </Link>
        <Link to='/watchlist' className='text-blue-400 text-3xl font-bold'>
          📜 Watchlist
        </Link>
      </div>
      <div className='text-gray-600 text-lg'>
        <p className='font-bold'>MovieApp</p>
      </div>
    </div>
  );
};

export default Navbar;
