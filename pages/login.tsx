import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signInWithPopup } from 'firebase/auth'
interface Inputs{
  email:string
  password:string
}
export default function login() {
  const [login,setLogin]=useState(false)
  const { register,
     handleSubmit,
      watch,
       formState: { errors } }
      = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({email,password}) => {
    if(login){
      //await signIn(email,password)
    }
    else{
      //await signUp(email,password)
    }
  }
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black
     md:items-center md:bg-transparent">
          <Head>
            <title>Netflix</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Image
            src="https://rb.gy/p2hphi"
            layout="fill"
            className="-z-10 !hidden opacity-60 sm:!inline"
            objectFit="cover"
          />
          <img 
            src="https://rb.gy/ulxxee"
            className="absolute left-3 top-3 cursor-pointer md:left-10 md:top-6"
            width={140}
            height={140} 
           />
            
        <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative mt-24 space-y-8 rounded bg-black/75 py-10 
            px-6 md:mt-0'>
              <h1>Sign In</h1>
              <div className='space-y-4'>
                <label className="inline-bloc w-full">
                  <input 
                    type="email" 
                    placeholder='email'
                     className='input'
                    {...register('email',{required:true})}
                    />
                    {errors.email && 
                    <p className="p-1 text-[13px] font-light text-orange-500">Please enter a valid email</p>}
                </label>
                <label className="inline-block w-full">
                  <input 
                     type="password"
                      placeholder='Password' 
                      className="input"
                      {...register('password',{required:true})}/>
                   {errors.password && 
                   <p className="p-1 text-[13px] font-light text-orange-500">
                    Your password must contain between 4 and 60 characters 
                    </p>}
                </label>
              </div>

              <button className='w-full bg-[#e50914] py-3 rounded font-semibold'
              onClick={()=>setLogin(true)}>
                Sign In
              </button>

              <div className="text-[gray]">
                New to Netflix?{' '}
               <button 
               onClick={()=>setLogin(false)} 
               type="submit" className='text-white hover:underline'>
                Sign up now
                </button>
              </div>
            </form>
    </div>
  )
}
