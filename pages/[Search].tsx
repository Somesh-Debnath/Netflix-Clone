// import React, { useEffect } from 'react'
// import { Movie } from '../typings'
// import {Router, useRouter} from 'next/router'
// import { useSearch } from '../components/SearchContext'
// import Head from 'next/head'
// import { useRecoilValue } from 'recoil'
// import { modalState, movieState } from '../atoms/modalAtom'
// import Header from '../components/Header'
// import { Modal } from '@mui/material'
// import Thumbnail from '../components/Thumbnail'
// import Row from '../components/Row'
// import { DocumentData } from 'firebase/firestore'

// interface Props{
//   Item:string
//   searchData:Movie[]|DocumentData[]
// }
//  function SearchPage({Item,searchData}:Props) {
//  const {searchItem,setSearchItem}=useSearch()
//  const movie = useRecoilValue(movieState)
//  const showModal = useRecoilValue(modalState)
//  Item=searchItem  

//   return (
//     <div className="relative h-screen
//     bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
//       <Head>
//         <title>{Item}</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <Header/>
//       <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-8'>
        
//         <div className='flex flex-col mb-10 group relative top-10 sm:top-10 lg:top-20 py-8 md:space-y-4 max-w-[360px] 
//        md:max-w-xl  lg:text-lg'> 
//            <h1 className=' font-bold md:text-2xl lg:text-4xl'>Movies</h1>
//            <p >
//            Search results for {Item}</p>
//        </div>
//         <section className="md:space-y-24 ">
//          <Row title={`Search Results for ${Item}`} movies={searchData}/>
//         </section>
//       </main>
//          {showModal && <Modal/>}
//     </div>
 
//   )
// }

import { DocumentData } from '@firebase/firestore'
import Head from 'next/head'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Row from '../components/Row'
import { useSearch } from '../components/SearchContext'
import useAuth from '../hooks/useAuth'
import { Movie } from '../typings'
import requests from "../utils/requests"

interface Props{
  Item:string
  searchData:Movie[]|DocumentData[]
}
 function SearchPage({Item,searchData}:Props) {
 const {searchItem,setSearchItem}=useSearch()
 Item=searchItem
   const {loading,logout}=useAuth()
   const showModal=useRecoilValue(modalState)
   if(loading) return null
 

  return (
    <div className="relative h-screen
    bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Home-Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-8'>
        

        <section className="md:space-y-24 mt-32">
          <Row title={`Search Results for ${Item}`} movies={searchData}/>
        </section>
      </main>
         {showModal && <Modal/>}
    </div>
  )
}


export const getStaticPaths=async({})=>{
  return{
    paths:[
      {params:
        {Search:'any'}
      }
    ],
    fallback:'blocking'
  }
}

export const getStaticProps=async({params}:any)=>{

 //console.log(Item)
  const searchData=await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${params.Search}&page=1&include_adult=false&language=en-US`)
    .then(res=>res.json())
   
  return{
    props:{
      searchData:searchData.results
    }
  }
}
 export default SearchPage