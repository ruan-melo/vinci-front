import { ApolloError } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { Post, PostProps } from '../../components/Post'
import { PostResponse } from '../../components/PostModal'
import { Main } from '../../layouts/Main'
import { getApiClient } from '../../services/getApiClient'
import { getApolloClient } from '../../services/getApolloClient'
import { GET_POST } from '../../services/queries'

type PagePostProps = { post: PostProps | null }

const PagePost = ({ post }: PagePostProps) => {
  if (!post) {
    return (
      <Main>
        <h1>Post not found</h1>
      </Main>
    )
  }
  return (
    <Main className="max-w-full">
      <div className="mt-6 h-[600px] mx-auto max-w-7xl bg-white">
        <Post {...post} />
      </div>
    </Main>
  )
}

export default PagePost

export const getServerSideProps: GetServerSideProps<PagePostProps> = async (
  context: any,
) => {
  const postId = (context.params as { postId: string }).postId
  const client = getApolloClient(context)

  try {
    const response = await client.query<PostResponse>({
      query: GET_POST,
      variables: {
        id: postId,
      },
    })

    return {
      props: {
        ...response.data,
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}
