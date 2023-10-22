import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"

const SignUp = () => {
  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [error,setError]=useState(null);
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
      setLoading(true);
      const res=await fetch("/api/auth/signup",{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      if(data.success===false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in')
    }
    catch(err){
      setLoading(false);
      setError(err.message);
    }
  };
  return (
      <div className='w-11/12 sm:w-4/12 mx-auto my-20'>
        <h1 className='text-center my-3 text-3xl sm:text-4xl font-bold text-blue-500 text-transform: uppercase'>Sign Up</h1>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
          <input onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:outline-none" type="text" name="username" placeholder='username'/>
          <input onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:outline-none" type="email" name="email" placeholder='email'/>
          <input onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:outline-none" type="password" name="password" placeholder='password'/>
          <button disabled={loading} className='p-3  text-blue-500 border border-gray-500 rounded-md text-2xl text-transform: uppercase hover:bg-blue-500 hover:text-white transition-all delay-75 hover:tracking-[.15em]' type='submit'>
            {loading?'Processing...':'Sign Up'}
          </button>
        </form>
        <div className='flex gap-2 my-5 underline'>
          <p>Have an account?</p>
          <Link className='text-blue-900 font-bold' to="/sign-in">Sign In</Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
  )
}

export default SignUp



