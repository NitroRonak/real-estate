import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
const ListingCard = ({listing}) => {
  return (
    <div className='bg-white shadow-md hover:shadow-xl hover:border hover:border-gray-400 transition-all duration-150 overflow-hidden rounded-lg w-full sm:w-[320px]'>
      <Link to={`/listing/${listing._id}`} className='flex flex-col'>
        <img className='h-[220px] w-full object-cover hover:scale-105 transition-scale duration-200 ' src={listing.imageUrls[0]} alt="Listing Image" />
        <div className='flex flex-col p-3 gap-2'>
          <p className='mb-2 font-semibold text-xl truncate text-center'>{listing.name}</p>
          <div className='flex justify-center items-center gap-1'>
            <MdLocationOn className='text-red-600'/>
            <p className='truncate w-full'>{listing.address}</p>
          </div>
          <p className='text-sm text-gray-500 line-clamp-1'>
            {listing.description}
          </p>
          <p className='font-semibold text-slate-500'>
            ₹{listing.offer?listing.discountPrice.toLocaleString('en-IN'):
              listing.regularPrice.toLocaleString('en-IN')
            }
            {listing.type==='rent' && '/month'}
          </p>
          <div className='flex gap-4'>
            <div className='font-bold text-xs text-slate-600'>
              {listing.bedrooms>1?`${listing.bedrooms} beds`:`${listing.bedrooms} bed`}
            </div>
            <div className='font-bold text-xs text-slate-600'>
              {listing.bathrooms>1?`${listing.bathrooms} baths`:`${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ListingCard
