import { TypographyVariants } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import RowTV from '../components/RowTV'
import useAuth from '../hooks/useAuth'
import { TV } from '../typings'
import requestTv from "../utils/requestTV"
interface Props {
  netflixOriginals: TV[]
  trendingNow: TV[]
  hindi: TV[]
  Us: TV[]
  comedyTv: TV[]
  kdrama: TV[]
  animated: TV[]
  //documentaries: TV[]
 // products: Product[]
}

const TV = ({
  netflixOriginals,
  Us,
  comedyTv,
  kdrama,
  animated,
  hindi,
  trendingNow,
  //products,
}: Props)=>{
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
       
       <div className='flex flex-col mb-10 group relative top-10 sm:top-10 lg:top-20 py-8 md:space-y-4 max-w-[360px] 
       md:max-w-xl  lg:text-lg'> 
           <h1 className=' font-bold md:text-2xl lg:text-4xl'>TV Shows</h1>
           <p >
            These days, the small screen has some very big things to offer.
            From sitcoms to dramas to travel and talk shows, these are all the best shows on TV.</p>
       </div>
        <section className="md:space-y-24">
          <RowTV title="Popular on Netflix" tvs={trendingNow} />
          <RowTV title="Hindi TV shows" tvs={hindi} />
          <RowTV title="US TV Dramas" tvs={Us} />
          {/* My List */}
         
          <RowTV title="K-Drama" tvs={comedyTv} />
          <RowTV title="Comedies" tvs={kdrama} />
          <RowTV title="Animated" tvs={animated} />
        </section>
      </main>
         {showModal && <Modal/>}
    </div>
  )
}

export default TV

export const getServerSideProps=async()=>{
  const [
    netflixOriginals,
    trendingNow,
    hindi,
    Us,
    comedyTv,
    kdrama,
    animated,
   
  ] = await Promise.all([
    fetch(requestTv.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requestTv.fetchTrending).then((res) => res.json()),
    fetch(requestTv.fetchHindi).then((res) => res.json()),
    fetch(requestTv.fetchUS).then((res) => res.json()),
    fetch(requestTv.fetchKDrama).then((res) => res.json()),
    fetch(requestTv.fetchComedyTV).then((res) => res.json()),
    fetch(requestTv.fetchanimated).then((res) => res.json()),
    
  ])
return {
  props:{
    netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      hindi: hindi.results,
      Us: Us.results,
      comedyTv: comedyTv.results,
      kdrama: kdrama.results,
      animated: animated.results,
      
  }
}
}