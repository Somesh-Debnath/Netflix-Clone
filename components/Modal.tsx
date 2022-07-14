import React,{useEffect, useState} from 'react'
import MuiModal from "@mui/material/Modal"
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import {Genre, Movie,Element} from "../typings"
import { XIcon } from '@heroicons/react/outline'
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
          }&language=en-US&append_to_response=videos`
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
    className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl
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
          <div className="absolute flex bottom-10w-full items-center
          justify-between px-10">
            <div className="display flex spcae-x-2">
              <button className="flex items-center gap-x-2 rounded
              bg-white">
              <FaPlay className="h-7 w-7 tex-black"/>
              </button>
            </div>
          </div>
         </div>
        </>
    </MuiModal>
  )
}

export default Modal