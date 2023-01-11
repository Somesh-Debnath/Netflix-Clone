import {RecoilRoot} from 'recoil'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
import { SearchProvider } from '../components/SearchContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    //HOC
  <RecoilRoot>
          <SearchProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
          </SearchProvider>
  </RecoilRoot>
)}

export default MyApp
