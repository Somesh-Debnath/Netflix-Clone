import {RecoilRoot} from 'recoil'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    //HOC
  <RecoilRoot>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
  </RecoilRoot>
)}

export default MyApp
