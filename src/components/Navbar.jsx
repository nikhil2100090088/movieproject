import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../download.png'
const Navbar = () => {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-4 '>

        <img  className='w-[50px]' src={Logo} alt="" />
        <Link to='/' className='text-blue-400 text-3xl font-bold'>Movies</Link>
        <Link to='/watchlist' className='text-blue-400 text-3xl font-bold'>
        watchlist
        </Link>
    </div>
  )
}
export default Navbar