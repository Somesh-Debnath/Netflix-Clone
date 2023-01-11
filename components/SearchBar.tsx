import React from 'react'
import { useRouter } from 'next/router'
import SearchPage from '../pages/[Search]'
import Link from 'next/link'
import { useSearch } from './SearchContext'

function SearchBar() {
  const router=useRouter()
  const {searchItem,setSearchItem}=useSearch()
  const handleSubmit=(e:any)=>{
    e.preventDefault()
    router.push(`/${e.target.search.value}`)
    setSearchItem(e.target.search.value)
  }
  return (
    <div>
    <form onSubmit={handleSubmit} >
    <input 
         
         type="search"
         id="search"
         placeholder='Movies,TV Shows...'
          className='w-full h-10 px-4 rounded-full bg-[#141414] text-white placeholder-white 
          border-solid border-[1px] border-white focus:ring-[1.3px] focus:ring-[#f9f9f9]'
      />
    </form>
      
    </div>
  )
}

export default SearchBar