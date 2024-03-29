import Head from 'next/head'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import { Movie } from '../typings'
import requests from "../utils/requests"
interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
 // products: Product[]
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
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
           <h1 className=' font-bold md:text-2xl lg:text-4xl'>Movies</h1>
           <p >
           Movies move us like nothing else can, whether they’re scary, funny,
            dramatic, romantic or anywhere in-between. So many titles, so much to experience..</p>
       </div>
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List */}
         
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Horror Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
         {showModal && <Modal/>}
    </div>
  )
}

export default Home

export const getServerSideProps=async()=>{
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])
return {
  props:{
    netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
  }
}
}