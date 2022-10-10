import { getApiClient } from './getApiClient'
// import { client } from './apolloClient'
// import { gql } from '@apollo/client'

// client
//   .query({
//     query: gql`
//       query Request {
//         post(id: "35d6fd66-565c-4ac1-98fb-e4b370d939a3") {
//           id
//           likesCount
//           commentsCount
//           comments {
//             id
//             text
//           }
//         }
//       }
//     `,
//   })
//   .then((result) => console.log('caralho', result))

export const api = getApiClient()

export const fetcher = async (url: string) => {
  return await api.get(url).then((res) => res.data)
}
