import '../styles/globals.css'
// import 'flowbite';
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../contexts/AuthContext'
import { RouteGuard } from '../components/RouteGuard'

// if (typeof window !== "undefined") {
//   import('flowbite');
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider> 
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
