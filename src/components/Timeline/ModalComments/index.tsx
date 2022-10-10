import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'

import { api } from '../../../services/api'
import { client } from '../../../services/apolloClient'
import { Modal } from '../../Modal'
import { Comment } from '../Post/Comment'

interface ModalCommentsProps {
  postId: string
  isOpen: boolean
  closeModal: () => void
  updateCommentsCount?: (quantity: number) => void
  onDeleteComment: () => void
}

const POST_COMMENTS = gql`
  query GetPostComments($postId: String!) {
    comments(postId: $postId) {
      id
      text
      author {
        id
        name
        avatar
        profile_name
      }
    }
  }
`

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
      refetch()
    }
  }, [isOpen])

  const handleDeleteComment = async (id: string) => {
    try {
      const DELETE_COMMENT = gql`
        mutation ($commentId: String!) {
          deleteComment(commentId: $commentId)
        }
      `
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
