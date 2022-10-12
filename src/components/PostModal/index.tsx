import { Modal } from '../Modal'

import { Post } from '../Post'
import { Post as PostModel } from '../../models/post'
import { useQuery } from '@apollo/client'
import { Media as MediaModel } from '../../models/media'
import { User as UserModel } from '../../models/user'
import { CommentModel } from '../../models/comment'
import { GET_POST } from '../../services/queries'
import { useEffect } from 'react'

interface PostModalProps {
  post: Required<Pick<PostModel, 'id'>>
  isPostOpen: boolean
  closePost: () => void
}

export type CommentResponse = Required<CommentModel> & {
  author: Required<Pick<UserModel, 'avatar' | 'id' | 'name' | 'profile_name'>>
}

export interface PostResponse {
  post: Required<Pick<PostModel, 'id' | 'caption'>> & {
    medias: Required<MediaModel>[]
    author: Required<Pick<UserModel, 'avatar' | 'id' | 'name' | 'profile_name'>>
    liked: boolean
    likesCount: number
    commentsCount: number
    comments: CommentResponse[]
  }
}

export function PostModal({ post, isPostOpen, closePost }: PostModalProps) {
  const { data, loading, refetch, updateQuery, previousData } =
    useQuery<PostResponse>(GET_POST, {
      variables: {
        id: post.id,
      },
      fetchPolicy: 'cache-first',
    })

  // useEffect(() => {
  //   if (isPostOpen) {
  //     refetch({
  //       id: post.id,
  //     }).then((data) => {
  //       console.log('refetch data', data.data.post.likesCount)
  //     })
  //     // console.log('refetch')
  //   }
  // }, [isPostOpen, post.id, refetch])

  const onLike = () => {
    updateQuery((prev) => {
      if (data) {
        return {
          post: {
            ...data.post,
            liked: true,
            likesCount: data.post.likesCount + 1,
          },
        }
      }

      return prev
    })

    refetch()
  }

  const onRemoveLike = () => {
    updateQuery((prev) => {
      if (data) {
        return {
          post: {
            ...data.post,
            liked: false,
            likesCount: data.post.likesCount - 1,
          },
        }
      }

      return prev
    })
    refetch()
  }

  const onCreateComment = (comment: CommentResponse) => {
    updateQuery((prev) => {
      if (data) {
        return {
          post: {
            ...data.post,
            commentsCount: data.post.commentsCount + 1,
            comments: [...data.post.comments, comment],
          },
        }
      }

      return prev
    })

    refetch()
  }

  const onDeleteComment = (commentId: string) => {
    updateQuery((prev) => {
      if (data) {
        return {
          post: {
            ...data.post,
            comments: data.post.comments.filter(
              (comment) => comment.id !== commentId,
            ),
            commentsCount: data.post.commentsCount - 1,
          },
        }
      }

      return prev
    })
  }

  if (loading && !data) {
    return <div>Loading...</div>
  }

  return (
    <Modal
      isOpen={isPostOpen}
      closeModal={closePost}
      containerClassName={'z-10'}
      className="h-modal max-w-7xl"
    >
      {data && (
        <Post
          {...data.post}
          onCreateComment={onCreateComment}
          onDeleteComment={onDeleteComment}
          onRemoveLike={onRemoveLike}
          onLike={onLike}
        />
      )}
    </Modal>
  )
}
