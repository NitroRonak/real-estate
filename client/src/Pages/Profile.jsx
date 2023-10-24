import React from 'react'
import { useSelector } from 'react-redux'
const Profile = () => {
  const {currentUser}=useSelector((state)=>state.user);
  return (
    <main className='flex flex-col lg:flex-row lg:justify-between items-center lg:my-40'>
      <section className='w-11/12 sm:w-4/12 mx-auto my-2 flex flex-col justify-center items-center gap-4 lg:border-r-2'>
        <h1 className='font-bold text-purple-900 text-xl md:text-3xl'>PROFILE</h1>
        <img className='w-32 sm:w-2/4 sm:h-2/4 rounded-lg' src={currentUser.avatar} alt="profile" />
      </section>
      <section className='w-11/12 sm:w-6/12 mx-auto my-10 lg:w-4/12 lg:ml-2'>
      <form className='flex flex-col gap-5'>
          <input  className="p-1 sm:p-3 border border-gray-300 rounded-md focus:outline-none" type="text" name="username" placeholder='username'/>
          <input  className="p-1 sm:p-3 border border-gray-300 rounded-md focus:outline-none" type="email" name="email" placeholder='email'/>
          <input  className="p-1 sm:p-3 border border-gray-300 rounded-md focus:outline-none" type="password" name="password" placeholder='password'/>  
          <button className='font-bold tracking-wider bg-slate-600 text-white rounded-md p-2 hover:bg-slate-800 transition-all delay-75transition-all delay-75transition-all delay-75transition-all delay-75transition-all delay-75 hover:-tracking-[-0.45em] disabled:opacity-80'>UPDATE</button>
      </form>
      <div className='flex justify-between mt-5 text-red-700 font-bold lg:text-xl text-base'>
        <span className='cursor-pointer hover:underline'>Delete Account</span>
        <span className='cursor-pointer hover:underline'>Sign Out</span>
      </div>
      </section>
    </main>
  )
}

export default Profile
