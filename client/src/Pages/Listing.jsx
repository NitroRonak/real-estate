import React, { useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {ThreeCircles} from 'react-loader-spinner'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
const Listing = () => {
  SwiperCore.use([Navigation]);
  const params=useParams();
  const [listing,setListing]=useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError]=useState(false);
  
  useEffect(() =>{
    const fetchListing= async() =>{
      try{
        setLoading(true);
        const res=await fetch(`/api/listing/get/${params.listingId}`);
        const data=await res.json();
        if(data.success===false){
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false)
      }
      catch(err){
        setError(true);
        setLoading(false);
      }
    }
    fetchListing();
  },[params.listingId])
  console.log(listing)
  return (
    <main>
     {
      loading && 
        <div className='h-screen flex justify-center items-center'>
          <ThreeCircles
          height="150"
          width="150"
          color="#44378a"
          visible={true}
          ariaLabel="three-circles-rotating"
          />
        </div>
     }
     {error && 
      <p className='text-3xl text-red-700
        font-bold mt-64 text-center
      '>Something went wrong!</p>
     }

     {listing && !loading && !error && 
      <div>
         <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[250px] sm:h-[450px] md:h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
     }
    </main>
  )
}

export default Listing
