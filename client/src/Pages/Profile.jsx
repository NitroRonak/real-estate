import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react';
import {getDownloadURL,getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../../firebase.js';
import { updateUserStart,updateUserSuccess,updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutFailure, signOutSuccess } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
const Profile = () => {
  const fileRef=useRef(null);
  const dispatch = useDispatch();
  const {currentUser,loading ,error}=useSelector((state)=>state.user);
  const [file,setFile]=useState(undefined);
  const [filePerc,setFilePerc]=useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [listings,setListings] = useState([]);
  const [listingsLoading,setListingsLoading] = useState(false);
  const [listingsLoadingError, setListingsLoadingError] = useState(false);
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload=(file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
        },
        (error) => {
          setFileUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData({ ...formData, avatar: downloadURL })
          );
        }
      )  
  }
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete=async ()=>{
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      })
      const data=await res.json();
      if(data.success===false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    }
    catch(error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut=async ()=>{
    try{
      const res=await fetch('/api/auth/signout');
      const data=await res.json();
      if(data.success===false){
        dispatch(signOutFailure(data.message));
      }
      dispatch(signOutSuccess());
    }
    catch(error){
      dispatch(signOutFailure(error.message));
    }
  };

  const handleShowListing=async ()=>{
    try{
      setListingsLoading(true);
      setListingsLoadingError(false);
      const res=await fetch(`/api/user/listings/${currentUser._id}`);
      const data=await res.json();
      setListings(data);
      setListingsLoading(false);
      if(data.success===false){
        setListingsLoadingError(true);
        return;
      }
    }
    catch(err){
      setListingsLoadingError(true);
      setListingsLoading(false);
    }
  };

  const handleListingDelete=async (id)=>{
    try{
      const res=await fetch(`/api/listing/delete/${id}`,{
        method: 'DELETE'
      })
      const data=res.json();
      if(data.success===false){
        console.log(data.message);
        return;
      }
      setListings((prev)=>prev.filter(listing=>listing._id!==id));
    }
    catch(err){
      console.log(err.message);

    }
  }
  return (
    <>
    <main className='flex flex-col lg:flex-row lg:justify-between items-center lg:my-3'>
      <section className='w-11/12 sm:w-4/12 mx-auto my-2 flex flex-col justify-center items-center gap-4 lg:border-r-2'>
        <h1 className='font-bold text-purple-900 text-xl md:text-3xl'>PROFILE</h1>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} className='w-32 sm:w-2/4 sm:h-2/4 rounded-lg' src={formData.avatar || currentUser.avatar} alt="profile" />
        <p className='font-bold text-sm sm:text-md mt-2 self-center'>
          {fileUploadError?
            <span className='text-red-700 font-semibold'>Image Upload Error!
            (image must be less than 2mb)
            </span>:
            filePerc>0 && filePerc<100 ? (
              <span className='text-slate-600'>{`Uploading ${filePerc}`}</span>
            ):
            filePerc===100 ? (
              <span className='text-green-700'>Successfully Uploaded Image!</span>
            ):(
              ''
            )
          }
        </p>

      </section>
      <section className='w-11/12 sm:w-6/12 mx-auto my-1 lg:w-4/12 lg:ml-2'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <input onChange={handleChange} defaultValue={currentUser.username} className="p-1 sm:p-3 border border-gray-300 rounded-md focus:outline-none" type="text" name="username" placeholder='username'/>
          <input onChange={handleChange} defaultValue={currentUser.email} className="p-1 sm:p-3 border border-gray-300 rounded-md focus:outline-none" type="email" name="email" placeholder='email'/>
          <input onChange={handleChange} className="p-1 sm:p-3 border border-gray-300 rounded-md focus:outline-none" type="password" name="password" placeholder='password'/>  
          <button disabled={loading} type='submit' className='font-bold tracking-wider bg-slate-600 text-white rounded-md p-2 hover:bg-slate-800 transition-all delay-75 hover:-tracking-[-0.45em] disabled:opacity-80'>
            {loading?'Updating...':'UPDATE'}
          </button>
          <Link className='bg-green-500 rounded-md p-2 font-bold  text-center text-white hover:bg-green-900 transition-all delay-75 hover:-tracking-[-0.25em] disabled:opacity-80' to={"/create-listing"}>CREATE LISTING</Link>
      </form>
      <div className='flex justify-between mt-5 text-red-700 font-bold lg:text-xl text-base'>
        <span onClick={handleDelete} className='cursor-pointer hover:underline'>Delete Account</span>
        <span onClick={handleSignOut} className='cursor-pointer hover:underline'>Sign Out</span>
      </div>
      <p className='text-red-800 font-bold text-center mt-1'>{error?`Error: ${error}`:""}</p>
      <p className='text-green-600 font-bold text-center mt-5'>{updateSuccess?'User successfully update!':""}</p>
      </section>
    </main>
    <div className='flex flex-col justify-center w-11/12 sm:w-7/12 mx-auto my-1 lg:w-6/12 gap-2'>
      <button disabled={listingsLoading} onClick={handleShowListing} className='text-green-600 font-bold uppercase md:text-2xl disabled:opacity-40'>
          {listingsLoading?'Showing...':'Show Listing'}
      </button>
      <p className='text-red-800 text-sm font-semibold text-center'>{listingsLoadingError?'Error showing listings!':''}</p>

      {listings.length>0 && listings.map((listing,index) =>(
          <div key={listing._id} className='border border-gray-200 flex justify-between items-center p-3 mb-3 shadow-sm rounded-lg'>
              <Link to={`/listing/${listing._id}`}>
                <img className='w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32  object-contain' src={listing.imageUrls[0]} alt="listing image" />
              </Link>
              <Link className='hover:underline truncate' to={`/listing/${listing._id}`}>
                <p className='text-xs md:text-base uppercase font-semibold'>{listing.name}</p>
              </Link>
              <div className='flex flex-col gap-2'>
                <button onClick={(e)=>handleListingDelete(listing._id)} className='text-sm md:text-base text-red-800 font-semibold hover:underline'>Delete</button>
                <button className='text-sm md:text-base font-semibold hover:underline text-green-700'>Edit</button>
              </div>
          </div>
      ))}
    </div>
    </>
  )
}

export default Profile
