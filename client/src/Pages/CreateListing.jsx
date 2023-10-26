import React from 'react'

const CreateListing = () => {
  return (
    <main className='p-3 max-w-4xl md:max-w-5xl mx-auto'>
        <h1 className='text-center font-bold text-base text-2xl sm:text-3xl mt-3 mb-6'>CREATE LISTING</h1>
        <form className='flex flex-col sm:flex-row gap-5 md:gap-9'>
            <div className='flex flex-col gap-5 flex-1 md:border-r p-2'>
                <input type="text" placeholder='Name' id='name'
                className='border p-3 rounded-lg' maxLength={'70'} minLength={'10'} required/>
                <textarea type="text" placeholder='Description' id='description' 
                className='border p-3 rounded-lg' required/>
                <input type="text" placeholder='Address' id='address' 
                className='border p-3 rounded-lg' required/>
                
                <div className='flex gap-6 flex-wrap text-lg'>
                  <div className='flex gap-2 font-bold'>
                    <input className='w-5' type="checkbox" id='sale'/>
                    <span>Sale</span>
                  </div>
                  <div className='flex gap-2 font-bold'>
                    <input className='w-5' type="checkbox" id='rent'/>
                    <span>Rent</span>
                  </div>
                  <div className='flex gap-2 font-bold'>
                    <input className='w-5' type="checkbox" id='parking'/>
                    <span>Parking</span>
                  </div>
                  <div className='flex gap-2 font-bold'>
                    <input className='w-5' type="checkbox" id='furnished'/>
                    <span>Furnished</span>
                  </div>
                  <div className='flex gap-2 font-bold'>
                    <input className='w-5' type="checkbox" id='offer'/>
                    <span>Offer</span>
                  </div>
                </div>

                <div className='flex gap-4 md:gap-3 flex-wrap text-lg'>
                  <div className='flex justify-center items-center gap-1'>
                    <input className='rounded-lg w-10 p-1 sm:w-12 sm:p-2 border border-gray-300'   type="number" min='1'max='10'  id="bedrooms" required/>
                    <span className='font-bold'>Beds</span>
                  </div>
                  <div className='flex justify-center items-center gap-1'>
                    <input className=' rounded-lg w-10 p-1  sm:w-12 sm:p-2 border border-gray-300'   type="number"  min='1'max='10' id="bathrooms" required />
                    <span className='font-bold'>Baths</span>
                  </div>
                  <div className='flex justify-center items-center gap-2'>
                    <input className='rounded-lg  p-2 w-1/2 border border-gray-300'   type="number"  id="regularPrice" required />
                    <div className='flex flex-col'>
                      <p className='font-bold'>Regular Price</p>
                      <span>(₹ /month)</span>
                    </div>
                  </div>

                  <div className='flex justify-center items-center gap-2'>
                    <input className='rounded-lg p-2 w-1/2 border border-gray-300'   type="number"  id="discountPrice" required />
                    <div className='flex flex-col'>
                      <p className='font-bold'>Discount Price</p>
                      <span>(₹ /month)</span>
                    </div>
                  </div>
                </div>

            </div>
            
            <div className='flex flex-col flex-1 gap-4'>
              <p className='font-semibold text-lg'>Images:</p>
              <div className='flex gap-4'>
                <input className='p-3 border border-gray-300 w-full rounded-md' type="file" id='images' accept='image/*' multiple/>
                <button className=' p-3 rounded-md border border-green-700
                hover:shadow-lg disabled:opacity-80 uppercase hover:bg-green-100'>Upload</button>
              </div>
            <button className='p-3 bg-slate-600 text-white rounded-md
            disabled:opacity-80 hover:bg-slate-700'>CREATE LISTING</button>
            </div>
        </form>
    </main>
  )
}

export default CreateListing
