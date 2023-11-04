import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Bars} from 'react-loader-spinner'
import ListingCard from '../components/ListingCard';
const Search = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [listings,setListings] = useState([]);
    const [sidebardata,setSideBarData]=useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc',

    })
    console.log(listings);
    const handleChange=(e)=>{
       if(e.target.id==='all' || e.target.id==='rent' || e.target.id==='sale'){
        setSideBarData({...sidebardata,type:e.target.id});
       }
       if(e.target.id==='searchTerm'){
        setSideBarData({...sidebardata,searchTerm:e.target.value});
       }
       if(e.target.id=='parking' || e.target.id==='offer' || e.target.id==='furnished'){
        setSideBarData({...sidebardata,[e.target.id]:e.target.checked || e.target.checked==='true' ? true:false})
       }
       if(e.target.id==='sort_order'){
        const sort=e.target.value.split('_')[0] || 'created_at';
        const order=e.target.value.split('_')[1] || 'desc';
        setSideBarData({...sidebardata,sort,order})
       }
    };

    useEffect(()=>{
        const urlParams=new URLSearchParams(window.location.search);
        const searchTermFromUrl=urlParams.get('searchTerm');
        const typeFromUrl=urlParams.get('type');
        const parkingFromUrl=urlParams.get('parking');
        const furnishedFromUrl=urlParams.get('furnished');
        const offerFromUrl=urlParams.get('offer');
        const sortFromUrl=urlParams.get('sort');
        const orderFromUrl=urlParams.get('order');
        if(searchTermFromUrl 
            || typeFromUrl 
            || parkingFromUrl 
            || furnishedFromUrl 
            || offerFromUrl
            || sortFromUrl
            || orderFromUrl) {
            setSideBarData({
                searchTerm:searchTermFromUrl || '',
                type:typeFromUrl || 'all',
                parking:parkingFromUrl === 'true' ? true: false,
                furnished:furnishedFromUrl === 'true' ? true: false,
                offer:offerFromUrl === 'true' ? true: false,
                sort:sortFromUrl || 'created_at',
                order:orderFromUrl || 'desc',
            })
        }

        const fetchListings=async () =>{
            setLoading(true);
            const searchQuery=urlParams.toString();
            const res=await fetch(`/api/listing/get?${searchQuery}`);
            const data=await res.json();
            setListings(data);
            setLoading(false);

        }
        fetchListings();
    },[location.search])
    const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams=new URLSearchParams();
        urlParams.set('searchTerm',sidebardata.searchTerm);
        urlParams.set('type',sidebardata.type);
        urlParams.set('parking',sidebardata.parking);
        urlParams.set('furnished',sidebardata.furnished);
        urlParams.set('offer',sidebardata.offer);
        urlParams.set('sort',sidebardata.sort);
        urlParams.set('order',sidebardata.order);
        const searchQuery=urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className='flex items-center gap-2 '>
                <label className='whitespace-nowrap font-bold'>Search Term:</label>
                <input type="text" 
                    id='searchTerm'
                    placeholder='Search...'
                    className='border rounded-md focus:outline-none border-gray-300 w-full p-3'
                    value={sidebardata.searchTerm}
                    onChange={handleChange}
                />
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-bold'>Type:</label>
                <div className='flex gap-2'>
                    <input type="checkbox" id='all'  
                    className='w-5' 
                    onChange={handleChange}
                    checked={sidebardata.type==='all'}   />
                    <span>Rent & Sale</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='rent'  
                    className='w-5'   
                    onChange={handleChange}
                    checked={sidebardata.type==='rent'}
                    />
                    <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='sale'  
                    className='w-5' onChange={handleChange} checked={sidebardata.type==='sale'}   />
                    <span>Sale</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='offer'  
                    className='w-5'  onChange={handleChange} checked={sidebardata.offer} />
                    <span>Offer</span>
                </div>
            </div>

            <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-bold'>Amenties:</label>
                <div className='flex gap-2'>
                    <input type="checkbox" id='parking'  
                    className='w-5' onChange={handleChange} checked={sidebardata.parking}  />
                    <span>Parking</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='furnished'  
                    className='w-5'  onChange={handleChange} checked={sidebardata.furnished}  />
                    <span>Furnished</span>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <label className='font-bold'>Sort:</label>
                <select id="sort_order" className='border rounded-md p-3'
                    onChange={handleChange}
                    defaultValue={'created_at_desc'}
                >
                    <option value={'regularPrice_desc'}>Price high to low</option>
                    <option value={'regularPrice_asc'}>Price low to high</option>
                    <option value={'createdAt_desc'}>Latest</option>
                    <option value={'createdAt_asc'}>Oldest</option>
                </select>
            </div>

            <button className='text-xl bg-slate-600 hover:bg-slate-800 hover:font-bold transition-all hover:tracking-[0.2em] text-white rounded-md p-3'>
                Search
            </button>
        </form>
      </div>

      {/* right div */}
      <div className='p-7 w-full'>
        <h1 className='text-3xl font-semibold text-slate-700 mt-5'>Listing Results:</h1>
        <div className='flex flex-wrap gap-4 items-center justify-center sm:justify-start mt-5'>
            {!loading && listings.length===0 && (
                <p className='font-semibold text-slate-600 text-xl'>No listing found!</p>
            )}
            {loading && (
                <Bars
                height="80"
                width="80"
                color="#510b8a"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            )}

            {
                !loading && listings && listings.map(listing=>(
                    <ListingCard key={listing._id} listing={listing}/>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default Search
