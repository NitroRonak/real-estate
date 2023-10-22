import React from 'react'
import {Link} from "react-router-dom"
const SignIn = () => {
  return (
    <div className='w-11/12 sm:w-4/12 mx-auto my-20'>
      <h1 className='text-center my-3 text-3xl sm:text-4xl font-bold text-blue-500 text-transform: uppercase'>Sign In</h1>
      <form className='flex flex-col gap-5'>
          <input className="p-3 border border-gray-300 rounded-md focus:outline-none" type="email" name="email" placeholder='email'/>
          <input className="p-3 border border-gray-300 rounded-md focus:outline-none" type="password" name="password" placeholder='password'/>
          <button className='p-3  text-blue-500 border border-gray-500 rounded-md text-2xl text-transform: uppercase hover:bg-blue-500 hover:text-white transition-all delay-75 hover:tracking-[.25em]' type='submit'>Sign In</button>
      </form>
      <div className='flex gap-2 my-5 underline text-sm md:text-lg'>
          <p>New user?</p>
          <Link className='text-blue-900 font-bold' to="/sign-up">Sign Up</Link>
      </div>
    </div>
  )
}

export default SignIn
