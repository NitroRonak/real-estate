import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {FaSearch} from "react-icons/fa"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const {currentUser} = useSelector((state)=>state.user);
  const [searchTerm,setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSearchSubmit=(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery=urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const searchTermFromUrl=urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }
  },[location.search])
  return (
    <header className=' bg-neutral-50  shadow-sm'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <h1 className='font-bold text-sm sm:text-xl md:text-4xl flex flex-wrap'>
            <span className='text-gray-700'>RS-</span>
            <span className='text-blue-950'>Estate</span>
        </h1>
        <form  onSubmit={handleSearchSubmit} className=' bg-gray-200 sm:p-3 p-1 rounded-lg flex items-center'>
            <input className="bg-transparent focus:outline-none w-28 sm:w-64" 
            value={searchTerm}  onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder='Search.....'/>
            <button>
              <FaSearch className='text-gray-500 '/>
            </button>
        </form>
        <ul className='flex gap-4 justify-center items-center'>
          <Link className='hidden text-sm sm:text-xl sm:inline text-gray-700 hover:text-blue-500 font-bold' to="/">Home</Link>
          <Link className='hidden text-sm sm:text-xl sm:inline text-gray-700 hover:text-blue-500 font-bold' to="/about">About</Link>
          <Link to="/profile">
            {currentUser?(
              <img className='rounded-lg sm:h-15 sm:w-12 h-10 w-10 object-cover' src={currentUser.avatar} alt='profile'/>
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

