import React, { useState,useEffect } from 'react'
import {BellIcon, SearchIcon} from '@heroicons/react/solid'
import useAuth from '../hooks/useAuth'
import {useRouter} from 'next/router'
import Link from 'next/link'
import SearchBar from './SearchBar'
import BasicMenu from './BasicMenu'

function Header() {
  const [isScrolled,setIsScrolled]=useState(false)
  const {logout}=useAuth()
  const Router=useRouter()
  const [showSearch,showSearchBar]=useState(false)
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

  const toggleSearch=()=>{
    showSearchBar(!showSearch)
  }
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

                <BasicMenu/>
         <ul className='hidden space-x-4 md:flex'>
            <li className='headerLink' onClick={()=>Router.push('/')} >Home</li>
            <li className='headerLink' onClick={()=>Router.push('/TV')}>TV Shows</li>
            <li className='headerLink' onClick={()=>Router.push('/Movies')}>Movies</li>
            <li className='headerLink' onClick={()=>Router.push('/Popular')}>New & Popular</li>
            <li className='headerLink'>My List</li>
         </ul>
        </div>

        <div className="flex items-center space-x-4 text-sm font-light">
          {
            showSearch && <SearchBar />
          }
           <SearchIcon className='hidden sm:inline h-6 w-6 cursor-pointer'
           onClick={toggleSearch}/>
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