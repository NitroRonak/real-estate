import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form className='flex flex-col gap-5'>
            <div className='flex items-center gap-2 '>
                <label className='whitespace-nowrap font-bold'>Search Term:</label>
                <input type="text" 
                    id='searchTerm'
                    placeholder='Search...'
                    className='border rounded-md focus:outline-none border-gray-300 w-full p-3'
                />
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-bold'>Type:</label>
                <div className='flex gap-2'>
                    <input type="checkbox" id='all'  
                    className='w-5'    />
                    <span>Rent & Sale</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='rent'  
                    className='w-5'    />
                    <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='sale'  
                    className='w-5'    />
                    <span>Sale</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='offer'  
                    className='w-5'    />
                    <span>Offer</span>
                </div>
            </div>

            <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-bold'>Amenties:</label>
                <div className='flex gap-2'>
                    <input type="checkbox" id='parking'  
                    className='w-5'    />
                    <span>Parking</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='furnished'  
                    className='w-5'    />
                    <span>Furnished</span>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <label className='font-bold'>Sort:</label>
                <select id="sort_order" className='border rounded-md p-3'>
                    <option >Price high to low</option>
                    <option >Price low to high</option>
                    <option >Latest</option>
                    <option >Oldest</option>
                </select>
            </div>

            <button className='text-xl bg-slate-600 hover:bg-slate-800 hover:font-bold transition-all hover:tracking-[0.2em] text-white rounded-md p-3'>
                Search
            </button>
        </form>
      </div>

      {/* right div */}
      <div>
        <h1 className='text-3xl font-semibold text-slate-700 mt-5'>Listing Results:</h1>
      </div>
    </div>
  )
}

export default Search