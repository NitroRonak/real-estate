import React from 'react'
import {Link,useNavigate} from "react-router-dom"
import { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';
const SignIn = () => {
  const [formData,setFormData] = useState({});
  const dispatch = useDispatch();
  const {loading,error}=useSelector((state)=>state.user);
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value,
    })
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res=await fetch("/api/auth/signin",{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      if(data.success===false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/')
    }
    catch(err){
      dispatch(signInFailure(err.message));
    }
  };
  return (
    <div className='w-11/12 sm:w-4/12 mx-auto my-20'>
      <h1 className='text-center my-3 text-3xl sm:text-4xl font-bold text-blue-500 text-transform: uppercase'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <input onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:outline-none" type="email" name="email" placeholder='email'/>
          <input onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:outline-none" type="password" name="password" placeholder='password'/>
          <button disabled={loading} className='p-3  bg-blue-400 text-white border border-gray-500 rounded-md text-xl text-transform: uppercase hover:bg-blue-500 hover:text-white transition-all delay-75 hover:tracking-[.25em] disabled:opacity-80' type='submit'>
            {loading?'Processing...':'Sign In'}
          </button>
          <OAuth/>
      </form>
      <div className='flex gap-2 my-5 underline text-sm md:text-lg'>
          <p>Dont have an account?</p>
          <Link className='text-blue-900 font-bold' to="/sign-up">Sign Up</Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn
