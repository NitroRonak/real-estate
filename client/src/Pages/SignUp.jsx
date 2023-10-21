import React from 'react'

const SignUp = () => {
  return (
      <div className='max-w-lg mx-auto my-20'>
        <h1 className='text-center my-3 text-3xl sm:text-4xl font-bold text-blue-500'>Sign Up</h1>
        <form className='flex flex-col gap-5'>
          <input className="p-3 border border-gray-300 rounded-md focus:outline-none" type="text" name="username" placeholder='username'/>
          <input className="p-3 border border-gray-300 rounded-md focus:outline-none" type="email" name="email" placeholder='email'/>
          <input className="p-3 border border-gray-300 rounded-md focus:outline-none" type="password" name="password" placeholder='password'/>
          <button className='p-3  text-blue-500' type='submit'>SingUp</button>
        </form>
      </div>
  )
}

export default SignUp



