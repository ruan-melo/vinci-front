import { GetServerSideProps, NextPage } from "next"
import { parseCookies } from "nookies"
import { Header } from "../components/Header"
import { Timeline } from "../components/Timeline"
import { useAuth } from "../hooks/useAuth"
import { Main } from "../layouts/Main"
import { PostWithMedia, PostWithMediaAndAuthor } from "../models"
import { getApiClient } from "../services/getApiClient"


interface HomeProps {
  posts: PostWithMediaAndAuthor[]
}

const Home: NextPage<HomeProps> = ({posts}: HomeProps) => {
  const {user} = useAuth();
  return (
    <Main>
      <Timeline posts={posts}/>
    </Main>
  )
}

export default Home

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
    const response = await api.get<PostWithMediaAndAuthor[]>('/posts/timeline');

    if (!response.data){
      throw new Error('error')
    }

    return{
      props: {
        posts: response.data,
      }
    }
  } catch(err){
    console.log('error', err)
  }

  return {
    props: {
      posts: [],
    }
  }
}
