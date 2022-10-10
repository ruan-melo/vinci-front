import { gql, useQuery } from '@apollo/client'
import { GetServerSideProps, NextPage } from 'next'
import { parseCookies } from 'nookies'
import { useEffect } from 'react'
// import { ImagesC } from "../components/ImagesCarousel"
import { Timeline } from '../components/Timeline'
import { Main } from '../layouts/Main'
import { TimelinePost } from '../models'
import { getApolloClient } from '../services/getApolloClient'

interface HomeProps {
  timeline: TimelinePost[]
}

const TIMELINE_KEY = '/posts/timeline'

const GET_TIMELINE = gql`
  query GetTimeline {
    timeline {
      id
      caption
      commentsCount
      likesCount
      liked
      medias {
        id
        media_url
        position
      }

      author {
        avatar
        name
        profile_name
      }
    }
  }
`

const Home = ({ timeline }: HomeProps) => {
  // !! USE CACHE
  // const { data, error, loading } = useQuery<{ timeline: TimelinePost[] }>(
  //   GET_TIMELINE,
  //   {
  //     ssr: false,

  //   }

  // )

  // console.log('timeline data', data)

  // useEffect(() => {
  //   // async function getToken() {
  //   //   const teste = await requestPermission()
  //   //   const messaging = getFirebaseMessaging()
  //   //   if (!messaging) return
  //   //   onMessage(messaging, (payload) => {
  //   //     console.log('Message received. ', payload)
  //   //     // ...
  //   //   })
  //   //   console.log('initialize on message', messaging)
  //   // }
  //   // if (window !== undefined) {
  //   //   getToken()
  //   // }
  // }, [])
  return (
    <Main>
      <Timeline posts={timeline ?? []} />
    </Main>
  )
}

const Page: NextPage<HomeProps> = ({ timeline }: HomeProps) => {
  return (
    // <SWRConfig value={{ fallback }}>
    <Home timeline={timeline} />
    // </SWRConfig>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context,
) => {
  const { 'vinci:access_token': access_token } = parseCookies(context)

  if (!access_token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const client = getApolloClient(context)

  try {
    const { data, error, loading } = await client.query<{
      timeline: TimelinePost[]
    }>({
      query: GET_TIMELINE,
    })

    if (error) {
      throw new Error('error')
    }

    return {
      props: {
        timeline: data.timeline,
      },
    }
  } catch (err) {
    console.log('error', err)
  }

  return {
    props: {
      timeline: [],
    },
  }
}
