import React,{useEffect, useState} from 'react'
import MuiModal from "@mui/material/Modal"
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import {Genre, Movie,Element} from "../typings"
import { PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from '@heroicons/react/outline'
import ReactPlayer from 'react-player/lazy'
import { FaPlay } from 'react-icons/fa'
function Modal() {
    const [showModal,setShowModal]=useRecoilState(modalState)
    const[movie,setMovie]=useRecoilState(movieState)
    const [trailer,setTrailer]=useState("")
    const [genres,setGenres]=useState<Genre[]>([])
    const [muted,setMuted]=useState(false)
    const[data,setData]=useState()
    useEffect(()=>{
        if(!movie) return
         
        async function fetchMovie(){
          const data= await fetch( `https://api.themoviedb.org/3/${
            movie?.media_type === 'tv' ? 'tv' : 'movie'
          }/${movie?.id}?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&append_to_response=videos`
        ).then((response) => response.json())
        .catch(err=>console.log(err))

        if(data?.videos){
          const index=data.videos.results.findIndex(
            (element:Element)=>element.type==='Trailer'
          )
          setTrailer(data.videos?.results[index]?.key)
        }
        if(data?.genres){
          setGenres(data?.genres)
        }
      }
      fetchMovie()        

    },[movie])
  console.log(trailer)
    const handleClose=()=>{
         setShowModal(false)
    }
  return (
    <MuiModal open={showModal} onClose={handleClose}
    className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-3xl max-h-xl
    overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
        <>
        <button
        onClick={handleClose}
          className="modalButton absolute right-10 top-5 h-9 w-9 !z-40 border-none
          bg-[#181818] hover:bg-[#181818]">
          <XIcon className="h-6 w-6"/>
        </button>
        <div className="relative pt-[56.25%] ">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute flex bottom-7 sm:bottom-10 w-full items-center
          justify-between px-10">
            <div className="display flex space-x-2 ">
              <button className="flex items-center gap-x-2 rounded 
              bg-white px-2 py-1 sm:px-7 sm:py-2 font-bold text-black transition hover:bg-[#e6e6e6]">
              <FaPlay className="sm:h-6 sm:w-6 h-6 w-4 text-black"/>
              Play
              </button>
                
                <button className="modalButton">
                  <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6 "/>
                </button>

                <button className="modalButton">
                  <ThumbUpIcon className="h-6 w-6 sm:h-7 sm:w-7"/>
                </button>
            </div>

            <button onClick={()=>setMuted(!muted)} className="modalButton">
              {muted?(
                  <VolumeOffIcon className="h-6 w-6"/>
              ):(
                <VolumeUpIcon className="h-6 w-6"/>
              )}
            </button>
          </div>
         </div>

         <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-5 ">
          <div className="space-y-4 ">
            <div className='flex items-center space-x-2 text-sm'>
              <p className="font-semibold text-green-400">{movie!.vote_average*10}% Match</p>
              <p className="font-light">{movie?.release_date || movie?.first_air_date}</p>
              <div className="flex h-4 items-center justify-center rounded border
              brder-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div  className="flex flex-col gap-x-10 gap-y-2 font-light md:flex-row">
              <p className="w-5/6">
                {movie?.overview}
              </p>
              <div className="flex flex-col space-y-3 text-sm">
                <span className='text-[gray]'>Genres:</span>
                {genres.map((genre)=>genre.name).join(', ')}
              </div>
           <div>
                  <span className="text-[gray]">Original language:</span>{' '}
                  {movie?.original_language.toUpperCase()}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{' '}
                  {movie?.vote_count}
                </div>
            </div>
          </div>
         </div>
        </>
    </MuiModal>
  )
}

export default Modal