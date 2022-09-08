import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
// import 'flowbite';
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../contexts/AuthContext'
import { RouteGuard } from '../components/RouteGuard'
import { ToastContainer, toast } from 'react-toastify'

// if (typeof window !== "undefined") {
//   import('flowbite');
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </AuthContextProvider>
  )
}

export default MyApp
