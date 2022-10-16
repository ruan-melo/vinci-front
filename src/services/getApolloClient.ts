import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { parseCookies } from 'nookies'

export const getApolloClient = (ctx?: any) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const { 'vinci:access_token': access_token } = parseCookies(ctx)
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        'ngrok-skip-browser-warning': 'true',
        authorization: access_token ? `Bearer ${access_token}` : '',
      },
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}
