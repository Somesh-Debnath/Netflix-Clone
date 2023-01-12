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
import Thumbnail from '../components/Thumbnail'
import useAuth from '../hooks/useAuth'
import useList from '../hooks/useList'
import { Movie } from '../typings'

export default function myList() {
      
      const {loading,logout,user}=useAuth()
      const list = useList(user?.uid)
      const showModal=useRecoilValue(modalState)
      if(loading) return null
      console.log(user)
    
   
     return (
        <div className="relative h-screen
        bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
          <Head>
            <title>Home-Netflix</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
         <Header/>
         <h1 className='mt-28 sm:ml-20 ml-12 sm:text-[1.7rem] text-lg mb-10
           m'> My List</h1>
         <main className="my-10 sm:ml-20 ml-12 sm:w-full w-3/4">
           <div className='w-full sm:w-[90%] flex justify-center'>
          <div className='grid gap-5
           sm:grid-cols-4 grid-rows-5'>
               {list.map((movie)=>(
                 <Thumbnail key={movie.id} movie={movie}/>
                ))}
             </div>
           </div>
         </main>
            {showModal && <Modal/>}
       </div>
     )
   }