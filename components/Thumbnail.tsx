import React from 'react'
import Image from 'next/image'
import { Movie } from '../typings'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
interface Props{
  movie:Movie
}
function Thumbnail({movie}:Props) {
  const[showModal,setShowModal]=useRecoilState(modalState)
  const [currentMovie,setCurrentMovie]=useRecoilState(movieState)
  return (
    <div className='relative h-24 min-w-[170px] gap-x-1
    cursor-pointer transition duration-150 ease-out md:h-36 md:min-w-[260px] 
    md:hover:scale-105 mt-2'
    onClick={()=>{
      setCurrentMovie(movie)
      setShowModal(true)}}>
      <Image
       src={`https://image.tmdb.org/t/p/w500${
        movie.backdrop_path || movie.poster_path
      }`}
      className="rounded-sm object-cover md:rounded"
      layout="fill"
      />
    </div>
  )
}

export default Thumbnail