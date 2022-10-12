import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

import { api } from '../../../services/api'
import { client } from '../../../services/apolloClient'
import { DELETE_COMMENT, POST_COMMENTS } from '../../../services/queries'
import { Modal } from '../../Modal'
import { Comment } from '../Post/Comment'

interface ModalCommentsProps {
  postId: string
  isOpen: boolean
  closeModal: () => void
  updateCommentsCount?: (quantity: number) => void
  onDeleteComment: () => void
}

interface PostCommentsResponse {
  comments: {
    id: string
    text: string
    author: {
      id: string
      name: string
      avatar: string
      profile_name: string
    }
  }[]
}

export const ModalComments = ({
  postId,
  isOpen,
  closeModal,
  onDeleteComment,
  updateCommentsCount,
}: ModalCommentsProps) => {
  const { data, error, loading, updateQuery, refetch } =
    useQuery<PostCommentsResponse>(POST_COMMENTS, {
      variables: { postId },
    })
  // const {mutate} = useSWRConfig();

  useEffect(() => {
    if (isOpen) {
      refetch({ postId })
    }
  }, [isOpen, postId, refetch])

  const handleDeleteComment = async (id: string) => {
    try {
      const response = await client.mutate({
        mutation: DELETE_COMMENT,
        variables: {
          commentId: id,
        },
      })
      updateQuery((prev) => {
        return {
          ...prev,
          comments: prev.comments.filter((comment) => comment.id !== id),
        }
      })

      onDeleteComment()
      // setComments((oldData) => oldData.filter((comment) => comment.id !== id))
      // mutate(`/posts/${postId}/comments`);
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Modal
      showCloseButton
      title="Comments"
      isOpen={isOpen}
      closeModal={() => {
        closeModal()
      }}
      className="max-w-screen-md p-4 h-1/2 min-h-[300px]"
    >
      <div className="flex flex-col gap-4 mt-4">
        {data?.comments
          ? data.comments.map((comment, index) => {
              return (
                <Comment
                  key={comment.id}
                  {...comment}
                  handleDelete={() => {
                    handleDeleteComment(comment.id)
                  }}
                />
              )
            })
          : null}
      </div>
    </Modal>
  )
}
