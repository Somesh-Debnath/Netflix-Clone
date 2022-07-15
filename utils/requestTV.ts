const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const requestTv = {
  fetchTrending: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  fetchHindi: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=hi-IN&region=IN&sort_by=popularity.desc&page=
  1&primary_release_year=2022&with_original_language=hi&with_networks=213`,
  fetchUS: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en_US&region=US&sort_by=popularity.desc&page=1
  &primary_release_year=2022&with_original_language=en`,
  fetchKDrama: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=ko&region=KR&sort_by=popularity.desc&page=
  1&primary_release_year=2022&with_original_language=ko`,
  fetchComedyTV: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchanimated: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16`,
  fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  
}

export default requestTv