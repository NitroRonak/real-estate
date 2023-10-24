import React from 'react'
import {Link} from 'react-router-dom'
import {FaSearch} from "react-icons/fa"
import { useSelector } from 'react-redux'
const Header = () => {
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <header className=' bg-neutral-50  shadow-sm'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <h1 className='font-bold text-sm sm:text-xl md:text-4xl flex flex-wrap'>
            <span className='text-gray-700'>RS-</span>
            <span className='text-blue-950'>Estate</span>
        </h1>
        <form className=' bg-gray-200 p-3 rounded-lg flex items-center'>
            <input className="bg-transparent focus:outline-none w-24 sm:w-64" type="text" placeholder='Search.....'/>
            <FaSearch className='text-gray-500 '/>
        </form>
        <ul className='flex gap-4 justify-center items-center'>
          <Link className='hidden text-sm sm:text-xl sm:inline text-gray-700 hover:text-blue-500 font-bold' to="/">Home</Link>
          <Link className='hidden text-sm sm:text-xl sm:inline text-gray-700 hover:text-blue-500 font-bold' to="/about">About</Link>
          <Link to="/profile">
            {currentUser?(
              <img className='rounded-lg h-15 w-12 object-cover' src={currentUser.avatar} alt='profile'/>
            ):(
              <li className='text-sm sm:text-xl sm:inline text-gray-700 hover:text-blue-500 font-bold'>Sign in</li>
            )}
          </Link>
        </ul>
      </div>

    </header>
  )
}

export default Header

