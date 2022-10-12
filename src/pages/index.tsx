import { useQuery } from '@apollo/client'
import { GetServerSideProps, NextPage } from 'next'
import { parseCookies } from 'nookies'
import { useEffect } from 'react'
// import { ImagesC } from "../components/ImagesCarousel"
import { Timeline } from '../components/Timeline'
import { Main } from '../layouts/Main'
import { TimelinePost } from '../models'
import { getApolloClient } from '../services/getApolloClient'
import { GET_TIMELINE } from '../services/queries'

interface HomeProps {
  timeline: TimelinePost[]
}

const TIMELINE_KEY = '/posts/timeline'

const Home = () => {
  const { data, error, loading } = useQuery<{ timeline: TimelinePost[] }>(
    GET_TIMELINE,
  )

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

  if (loading) return <div>loading...</div>

  return (
    <Main>
      <Timeline posts={data?.timeline ?? []} />
    </Main>
  )
}

const Page: NextPage<HomeProps> = () => {
  return (
    // <SWRConfig value={{ fallback }}>
    <Home />
    // </SWRConfig>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { 'vinci:access_token': access_token } = parseCookies(context)

  if (!access_token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  // const client = getApolloClient(context)

  return {
    props: {},
  }

  // try {
  //   const { data, error, loading } = await client.query<{
  //     timeline: TimelinePost[]
  //   }>({
  //     query: GET_TIMELINE,
  //   })

  //   if (error) {
  //     throw new Error('error')
  //   }

  //   return {
  //     props: {
  //       timeline: data.timeline,
  //     },
  //   }
  // } catch (err) {
  //   console.log('error', err)
  // }

  // return {
  //   props: {
  //     timeline: [],
  //   },
  // }
}
