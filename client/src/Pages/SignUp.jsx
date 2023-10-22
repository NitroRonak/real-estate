import React from 'react'

const SignUp = () => {
  return (
      <div className='w-11/12 sm:w-4/12 mx-auto my-20'>
        <h1 className='text-center my-3 text-3xl sm:text-4xl font-bold text-blue-500 text-transform: uppercase'>Sign Up</h1>
        <form className='flex flex-col gap-5'>
          <input className="p-3 border border-gray-300 rounded-md focus:outline-none" type="text" name="username" placeholder='username'/>
          <input className="p-3 border border-gray-300 rounded-md focus:outline-none" type="email" name="email" placeholder='email'/>
          <input className="p-3 border border-gray-300 rounded-md focus:outline-none" type="password" name="password" placeholder='password'/>
          <button className='p-3  text-blue-500 border border-gray-500 rounded-md text-2xl text-transform: uppercase hover:bg-blue-500 hover:text-white transition-all delay-75 hover:tracking-[.25em]' type='submit'>Sign Up</button>
        </form>
      </div>
  )
}

export default SignUp



