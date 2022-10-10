import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
// import 'flowbite';
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../contexts/AuthContext'
import { RouteGuard } from '../components/RouteGuard'
import { ToastContainer, toast } from 'react-toastify'
import { ApolloProvider } from '@apollo/client'
import { client } from '../services/apolloClient'

// if (typeof window !== "undefined") {
//   import('flowbite');
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AuthContextProvider>
    </ApolloProvider>
  )
}

export default MyApp
