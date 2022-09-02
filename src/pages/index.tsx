import { GetServerSideProps, NextPage } from "next"
import { parseCookies } from "nookies"
import { useEffect } from "react"
import useSWR, { SWRConfig } from "swr"
// import { ImagesC } from "../components/ImagesCarousel"
import { Header } from "../components/Header"
import { Timeline } from "../components/Timeline"
import { useAuth } from "../hooks/useAuth"
import { Main } from "../layouts/Main"
import { PostTimeline, PostWithMedia, PostWithMediaAndAuthor } from "../models"
import { fetcher } from "../services/api"
import { getApiClient } from "../services/getApiClient"


interface HomeProps {
  fallback: {
    '/posts/timeline': Array<PostTimeline>;
  }
}

const TIMELINE_KEY = '/posts/timeline';

const Home = () => {
  const {data} = useSWR<Array<PostTimeline>>('/posts/timeline', fetcher, {onSuccess: (data) => {
    console.log('update', data);
  }});

  useEffect(() => {
    console.log('DATA UPDATED effect', data);
  }, [data]);
  return (
    <Main>
      <Timeline posts={data ?? []}/>
    </Main>
  )
}

const Page: NextPage<HomeProps> = ({fallback}: HomeProps) => {
 return(
    <SWRConfig value={{fallback}}>
      <Home/>
    </SWRConfig>
 )
}

export default Page;

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {

  const {'vinci:access_token': access_token } = parseCookies(context);

  if (!access_token){
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const api = getApiClient(context);

  try{
    const response = await api.get<Array<PostTimeline>>('/posts/timeline');

    if (!response.data){
      throw new Error('error')
    }

    return{
      props: {
        fallback: {
          [TIMELINE_KEY]: response.data,
        }
      }
    }
  } catch(err){-
    console.log('error', err)
  }

  return {
    props: {
      fallback: {
        [TIMELINE_KEY] : []
      },
    }
  }
}
