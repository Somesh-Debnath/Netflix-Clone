import React, { useState,useEffect } from 'react'
import {BellIcon, SearchIcon} from '@heroicons/react/solid'
import useAuth from '../hooks/useAuth'
import {useRouter} from 'next/router'
import Link from 'next/link'
function Header() {
  const [isScrolled,setIsScrolled]=useState(false)
  const {logout}=useAuth()
  const Router=useRouter()
  useEffect(() => {
   
    const handleScroll=()=>{
      if(window.scrollY>0)
      setIsScrolled(true)
      else
      setIsScrolled(false)
    }
    window.addEventListener("scroll",handleScroll)
    return ()=>window.removeEventListener('scroll',handleScroll)
  }, [])
  
  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
        <div className='flex items-center space-x-2 md:space-x-10'>
                <img
                onClick={()=>Router.push('/')}
                src="https://rb.gy/ulxxee"
                width={100}
                height={100}
                className="cursor-pointer object-contain"
                />
         <ul className='hidden space-x-4 md:flex'>
            <li className='headerLink' onClick={()=>Router.push('/')} >Home</li>
            <li className='headerLink' onClick={()=>Router.push('/TV')}>TV Shows</li>
            <li className='headerLink' onClick={()=>Router.push('/Movies')}>Movies</li>
            <li className='headerLink' onClick={()=>Router.push('/Popular')}>New & Popular</li>
            <li className='headerLink'>My List</li>
         </ul>
        </div>

        <div className="flex items-center space-x-4 text-sm font-light">
           <SearchIcon className='hidden sm:inline h-6 w-6'/>
             <p className='hidden lg:inline'>kids</p>
             <BellIcon className='6 w-6'/>
             {/* <Link href="/account"> */}
             <img
             onClick={logout}
                src="https://rb.gy/g1pwyx"
                alt=""
                className="cursor-pointer rounded"
            />
             {/* </Link> */}
        </div>
    </header>
  )
}

export default Header