import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [offerListings,setOfferListings]=useState([]);
  const [saleListings,setSaleListings]=useState([]);
  const [rentListings,setRentListings]=useState([]);
  return (
    <div>
      <div className="w-full h-[470px] bg-home-Bg bg-cover bg-center flex flex-col
        gap-10 p-7
      ">
        <h1 className='text-3xl text-white font-bold lg:text-6xl mt-10'>
          Find your next <span className='text-slate-800'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-white font-semibold text-sm md:text-xl'>
          RS-Estate is the best place to find your next perfect 
          place to live.
          <br />
          We have wide range properties for you to
          choose from.
        </div>
        <Link to="/search" className='p-3 bg-blue-700 w-40 text-white rounded-lg
          hover:tracking-wide hover:bg-blue-800 transition-all 
        '>
          Let's get started...
        </Link>
      </div>
    </div>
  )
}

export default Home
