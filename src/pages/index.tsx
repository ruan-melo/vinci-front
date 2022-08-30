import { GetServerSideProps, NextPage } from "next"
import { parseCookies } from "nookies"
import { Header } from "../components/Header"
import { Timeline } from "../components/Timeline"
import { useAuth } from "../hooks/useAuth"
import { Main } from "../layouts/Main"


const Home: NextPage = () => {
  const {user} = useAuth();
  return (
    <Main>
      <Timeline/>
    </Main>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {

  const {'vinci:access_token': access_token } = parseCookies(context);

  if (!access_token){
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
