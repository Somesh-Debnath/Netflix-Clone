import React from 'react'
import Image from 'next/image'
import { TV } from '../typings'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
interface Props{
  tv:TV
}
function TVThumbnail({tv}:Props) {
  const[showModal,setShowModal]=useRecoilState(modalState)
  const [currentMovie,setCurrentMovie]=useRecoilState(movieState)
  return (
    <div className='relative h-24 min-w-[170px] gap-x-1
    cursor-pointer transition duration-150 ease-out md:h-36 md:min-w-[260px] 
    md:hover:scale-105 mt-2'
    onClick={()=>{
      setCurrentMovie(tv)
      setShowModal(true)}}>
      <Image
       src={`https://image.tmdb.org/t/p/w500${
        tv.backdrop_path || tv.poster_path
      }`}
      className="rounded-sm object-cover md:rounded"
      layout="fill"
      />
      <h2 className='relative text-center pt-14 justify-center opacity-0 block w-full h-full
      transition opacity-0.25s font-bold bg-black/40 hover:opacity-100 '>{tv.title || tv.name}</h2>
    </div>
  )
}

export default TVThumbnail