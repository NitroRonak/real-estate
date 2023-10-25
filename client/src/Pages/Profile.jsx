import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react';
import {getDownloadURL,getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../../firebase.js';
import { updateUserStart,updateUserSuccess,updateUserFailure } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
const Profile = () => {
  const fileRef=useRef(null);
  const dispatch = useDispatch();
  const {currentUser,loading ,error}=useSelector((state)=>state.user);
  const [file,setFile]=useState(undefined);
  const [filePerc,setFilePerc]=useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
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
  return (
    <main className='flex flex-col lg:flex-row lg:justify-between items-center lg:my-40'>
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
      <section className='w-11/12 sm:w-6/12 mx-auto my-10 lg:w-4/12 lg:ml-2'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <input onChange={handleChange} defaultValue={currentUser.username} className="p-1 sm:p-3 border border-gray-300 rounded-md focus:outline-none" type="text" name="username" placeholder='username'/>
          <input onChange={handleChange} defaultValue={currentUser.email} className="p-1 sm:p-3 border border-gray-300 rounded-md focus:outline-none" type="email" name="email" placeholder='email'/>
          <input onChange={handleChange} className="p-1 sm:p-3 border border-gray-300 rounded-md focus:outline-none" type="password" name="password" placeholder='password'/>  
          <button disabled={loading} type='submit' className='font-bold tracking-wider bg-slate-600 text-white rounded-md p-2 hover:bg-slate-800 transition-all delay-75transition-all delay-75transition-all delay-75transition-all delay-75transition-all delay-75 hover:-tracking-[-0.45em] disabled:opacity-80'>
            {loading?'Updating...':'UPDATE'}
          </button>
      </form>
      <div className='flex justify-between mt-5 text-red-700 font-bold lg:text-xl text-base'>
        <span className='cursor-pointer hover:underline'>Delete Account</span>
        <span className='cursor-pointer hover:underline'>Sign Out</span>
      </div>
      <p className='text-red-800 font-bold text-center mt-1'>{error?`Error: ${error}`:""}</p>
      <p className='text-green-600 font-bold text-center mt-5'>{updateSuccess?'User successfully update!':""}</p>
      </section>
    </main>
  )
}

export default Profile
