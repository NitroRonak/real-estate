import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/css/bundle'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import Offer from '../assets/images/offers.png'
import HomeBG from '../assets/images/home.png'
import ListingCard from '../components/ListingCard'
const Home = () => {
  const [offerListings,setOfferListings]=useState([]);
  const [saleListings,setSaleListings]=useState([]);
  const [rentListings,setRentListings]=useState([]);
  SwiperCore.use([Navigation])
  useEffect(()=>{
    const fetchOfferListings = async ()=>{
      try{
        const res=await fetch(`/api/listing/get?offer=true&limit=3`);
        const data=await res.json();
        setOfferListings(data);
        fetchRentListings();
      }
      catch(err){
        console.log(err);
      }
    }

    const fetchRentListings = async ()=>{
      try{
        const res=await fetch(`/api/listing/get?type=rent&limit=3`);
        const data=await res.json();
        setRentListings(data);
        fetchSaleListings();
      }
      catch(err){
        console.log(err);
      }
    }

    const fetchSaleListings=async ()=>{
      try{
        const res=await fetch('/api/listing/get?type=sale&limit=3');
        const data=await res.json();
        setSaleListings(data);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchOfferListings();
  },[])
  return (
    <div >
      <div className="w-full h-[470px]  bg-cover bg-center flex flex-col
        gap-10 
      ">
        <img src={HomeBG} className='absolute w-full h-[470px] z-[-11]' alt="image" />
        <h1 className='text-3xl text-white font-bold lg:text-6xl mt-10 ml-7'>
          Find your next <span className='text-slate-800'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-white font-semibold text-sm md:text-xl ml-7'>
          RS-Estate is the best place to find your next perfect 
          place to live.
          <br />
          We have wide range properties for you to
          choose from.
        </div>
        <Link to="/search" className='p-3 bg-blue-700 w-40 text-white rounded-lg
          hover:tracking-wide hover:bg-blue-800 transition-all ml-7
        '>
          Let's get started...
        </Link>
      </div>

      <div className='h-[320px] sm:h-[420px] flex justify-around items-center p-7
      '>
        <div>
          <h1 className='md:text-6xl font-bold sm:text-4xl text-2xl'>
            We have best <span className='text-slate-600'>offers</span>
            <br />
            for you
          </h1>
        </div>
        <div >
          <img src={Offer} alt="" className='rounded-lg sm:h-72 h-40 lg:w-[420px]'/>
        </div>
      </div>
      
      <div className='border-t border-slate-700 lg:w-[820px] w-[250px] sm:w-[450px] mx-auto '></div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold text-slate-700'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-6'>
              {offerListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-700'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-6'>
              {rentListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-700'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-6'>
              {saleListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      
    </div>
  )
}

export default Home
