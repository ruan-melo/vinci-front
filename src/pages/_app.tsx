import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'
// import 'flowbite';
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../contexts/AuthContext'
import { RouteGuard } from '../components/RouteGuard'
import {
  ToastContainer,
  toast,
  ToastOptions,
  TypeOptions,
} from 'react-toastify'
import { ApolloProvider } from '@apollo/client'
import { client } from '../services/apolloClient'

// if (typeof window !== "undefined") {
//   import('flowbite');
// }

const toastClasses: {
  [key in TypeOptions]: string
} = {
  success: 'bg-green-600',
  error: 'bg-red-700',
  info: 'bg-white',
  warning: 'bg-orange-400',
  default: 'bg-white',
  // dark: 'bg-white-600 font-gray-300',
}

const bodyClasses: {
  [key in TypeOptions]: string
} = {
  success: 'text-white',
  error: 'text-white',
  info: 'text-gray-800',
  warning: 'bg-orange-400',
  default: 'text-gray-800',
}

const progressClasses: {
  [key in TypeOptions]: string
} = {
  success: 'bg-green-700',
  error: 'bg-red-900',
  info: 'bg-green-700',
  warning: 'bg-orange-400',
  default: 'bg-green-700',
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <Component {...pageProps} />
        <ToastContainer
          icon={false}
          toastClassName={(data) =>
            toastClasses[data?.type || 'default'] +
            ' relative flex p-1 min-h-10 p-2  rounded-sm justify-between overflow-hidden cursor-pointer'
          }
          bodyClassName={(data) =>
            bodyClasses[data?.type || 'default'] +
            ' flex items-center p-2  text-sm '
          }
          progressClassName={(data) =>
            progressClasses[data?.type || 'default'] +
            ' Toastify__progress-bar Toastify__progress-bar--animated'
          }

          //       margin: auto 0;
          // flex: 1 1 auto;
          // padding: 6px;
          // display: flex;
          // align-items: center;
        />
      </AuthContextProvider>
    </ApolloProvider>
  )
}

export default MyApp
