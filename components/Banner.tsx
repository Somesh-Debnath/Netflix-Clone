import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../constants/Movie'
import { Movie } from '../typings'
import {FaPlay} from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
interface Props{
    netflixOriginals:Movie[]
    trendingNow:Movie[]
}
function Banner({netflixOriginals,trendingNow}:Props) {
    const [movie,setMovie]=useState<Movie|null>(null)
     const[showModal,setShowModal]=useRecoilState(modalState)
     const [currentMovie,setCurrentMovie]=useRecoilState(movieState)
    useEffect(()=>{
       if(Math.random()<0.5){
         setMovie(
            netflixOriginals[Math.floor(Math.random()*netflixOriginals.length)]
        )}
        else{
        setMovie(
            trendingNow[Math.floor(Math.random()*trendingNow.length)]
        )}
    },[netflixOriginals])
    
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[78vh] lg:justify-end
    lg:pb-12">
        <div className='absolute top-0 left-0 -z-10 h-screen w-screen'>
           <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
           layout="fill"
           objectFit='cover'
           />
        </div >
        <h1 className="text-2xl font-bold md:text-4xl lg:text-6xl">
            {movie?.title|| movie?.name|| movie?.original_name}
        </h1>
        <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-base lg:max-w-xl lg:text-xl">
            {movie?.overview}
        </p>

        <div className="flex space-x-3">
             <button className='bannerButton bg-white text-black'
              onClick={()=>{
                setCurrentMovie(movie)
                setShowModal(true)
             }}>
                <FaPlay className="h-4 w-4 text-black md:h-5 md:w-7"
                 />Play</button>
             <button className='bannerButton bg-[gray]/70'
             onClick={()=>{
                setCurrentMovie(movie)
                setShowModal(true)
             }}>More Info
             <InformationCircleIcon className='h-5 w-5 md:h-7 md:w-8'/></button>
        </div>
    </div>
  )
}

export default Banner