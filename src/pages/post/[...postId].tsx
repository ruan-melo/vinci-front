import { GetServerSideProps } from 'next'
import { Post, PostProps } from '../../components/Post'
import { Main } from '../../layouts/Main'
import { getApiClient } from '../../services/getApiClient'

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
  const api = getApiClient(context)

  try {
    const response = await api.get<PostProps>(
      `/posts/${postId}?comments=true&medias=true&author=true&liked=true&likes_count=true&comments_count=true`,
    )

    console.log('RESPONSE POSTPAGE USERID', response.data.author.id)
    return {
      props: {
        post: { ...response.data },
      },
    }
  } catch (e) {
    console.log(e)
  }

  return {
    props: {
      post: null,
    },
  }
}
