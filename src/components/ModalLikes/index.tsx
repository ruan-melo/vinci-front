import { gql, useQuery } from '@apollo/client'
import { Modal } from '../Modal'
import { Like } from '../Timeline/Post/Like'

interface ModalLikesProps {
  postId: string
  isOpen: boolean
  closeModal: () => void
}

const POST_LIKES = gql`
  query GetPostLikes($id: String!) {
    post(id: $id) {
      likes {
        user {
          id
          name
          avatar
          profile_name
        }
      }
    }
  }
`

interface PostLikesResponse {
  post: {
    likes: {
      user: {
        id: string
        name: string
        avatar: string
        profile_name: string
      }
    }[]
  }
}

export const ModalLikes = ({ postId, isOpen, closeModal }: ModalLikesProps) => {
  const { data, error, loading } = useQuery<PostLikesResponse>(POST_LIKES, {
    variables: { id: postId },
  })

  //   useEffect(() => {
  //     if (isOpen) {
  //       mutate()
  //     }
  //   }, [isOpen])

  return (
    <Modal
      title="Likes"
      showCloseButton
      isOpen={isOpen}
      closeModal={closeModal}
      className="max-w-screen-md p-4 h-1/2 min-h-[300px]"
      containerClassName="z-50"
    >
      <div className="flex flex-col gap-4 mt-4">
        {data?.post &&
          data?.post.likes.map((like) => {
            return <Like key={`${postId}-${like.user.id}`} {...like} />
          })}
      </div>
    </Modal>
  )
}
