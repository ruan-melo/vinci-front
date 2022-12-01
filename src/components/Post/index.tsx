import { useDisclosure } from '@chakra-ui/hooks'
import { AnnotationIcon } from '@heroicons/react/outline'
import { Textarea } from '../Textarea'
import Image from 'next/image'

import { ImagesCarousel } from '../ImagesCarousel'
import { ModalLikes } from '../ModalLikes'
import { Comment } from '../Timeline/Post/Comment'
import { Avatar } from '../Avatar'
import { PostOptions } from '../Timeline/Post/PostOptions'
import { FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { LikeHeart } from '../LikeHeart'
import { Post as PostModel } from '../../models/post'
import Router from 'next/router'
import { Media as MediaModel } from '../../models/media'
import { CommentModel } from '../../models/comment'
import { User as UserModel } from '../../models/user'
import { client } from '../../services/apolloClient'
import {
  CREATE_COMMENT,
  LIKE_POST,
  REMOVE_LIKE,
  DELETE_COMMENT,
} from '../../services/queries'
import { CommentResponse } from '../PostModal'

export interface PostProps extends Required<Pick<PostModel, 'id' | 'caption'>> {
  author: Required<Pick<UserModel, 'avatar' | 'id' | 'profile_name' | 'name'>>
  liked: boolean
  likesCount: number
  commentsCount: number
  medias: Required<MediaModel>[]
  comments: (Required<CommentModel> & {
    author: Required<Pick<UserModel, 'avatar' | 'id' | 'name' | 'profile_name'>>
  })[]

  onLike?: () => void
  onRemoveLike?: () => void
  onCreateComment?: (comment: CommentResponse) => void
  onDeleteComment?: (commentId: string) => void
}

const btnTextArea = {
  label: 'Send',
  name: 'send-button',
  children: (
    <button
      type="submit"
      className="py-2 pr-4 text-green-600 text-sm rounded-r-md"
    >
      Post
    </button>
  ),
}

export const Post = ({
  medias,
  id,
  comments,
  caption,
  commentsCount,
  liked,
  likesCount,
  author,
  onLike,
  onRemoveLike,
  onCreateComment,
  onDeleteComment,
}: PostProps) => {
  const {
    isOpen: isModalLikesOpen,
    onClose: closeModalLikes,
    onOpen: openModalLikes,
  } = useDisclosure()

  const { user } = useAuth()

  const handleCreateComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const textElement = (e.target as any)['new-comment'] as HTMLTextAreaElement
    const text = textElement.value.trim()

    if (text.length === 0) return

    try {
      const response = await client.mutate<{ comment: CommentResponse }>({
        mutation: CREATE_COMMENT,
        variables: {
          postId: id,
          text,
        },
      })

      // !! NOTIFY ERROR
      if (!response.data) return

      onCreateComment && onCreateComment(response.data?.comment)
      textElement.value = ''
    } catch (e) {
      // TODO: Tratar erro
      console.log(e)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    try {
      const { data, errors } = await client.mutate({
        mutation: DELETE_COMMENT,
        variables: {
          commentId,
        },
      })

      //    !! NOTIFY ERROR
      if (errors) return
      onDeleteComment && onDeleteComment(commentId)
      // mutate(`/posts/${postId}/comments`);
    } catch (e) {
      console.log(e)
    }
  }

  const handleLike = async () => {
    try {
      const response = await client.mutate({
        mutation: LIKE_POST,
        variables: {
          postId: id,
        },
      })

      onLike && onLike()
    } catch (err) {
      console.log(err)
    }
  }

  const handleRemoveLike = async () => {
    try {
      const response = await client.mutate({
        mutation: REMOVE_LIKE,
        variables: {
          postId: id,
        },
      })

      onRemoveLike && onRemoveLike()
    } catch (err) {
      console.log(err)
    }
  }

  const onPostDelete = async () => {
    await Router.replace(`/${user?.profile_name}`)

    Router.reload()
  }
  return (
    <div className="flex flex-wrap m-auto h-full ">
      <div className=" relative max-w-full min-w-[300px] md:min-w-[400px]  flex-1 min-h-[500px]  ">
        {medias.length > 1 && (
          <ImagesCarousel images={medias.map((m) => ({ src: m.media_url }))} />
        )}
        {medias.length === 1 && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image src={medias[0].media_url} layout="fill" objectFit="cover" />
        )}
      </div>
      <div className="flex flex-col flex-1 min-w-[300px] ">
        <div className="flex flex-col  border-b bg-white border-gray-100 ">
          <div className="flex items-center p-4 gap-4">
            <div
              className="flex gap-2 cursor-pointer"
              onClick={() => {
                Router.push(`/${author.profile_name}`)
              }}
            >
              <Avatar
                className="h-10 w-10 md:w-12 md:h-12"
                name={author.name}
                avatar={author.avatar}
              />

              <div className="flex flex-col   ">
                {author.name}
                <span className="text-xs w-full text-left">
                  @{author.profile_name}
                </span>
              </div>
            </div>

            <div className="ml-auto">
              <PostOptions
                authorId={author.id}
                onDelete={onPostDelete}
                postId={id}
              />
            </div>
          </div>

          <div className="m-4 text-sm">{caption}</div>
        </div>

        <div className="flex-grow flex flex-col ">
          <div className="flex flex-col bg-gray-50 gap-4 p-4 flex-grow">
            {comments.map((comment) => (
              <Comment
                handleDelete={() => handleDeleteComment(comment.id)}
                key={comment.id}
                {...comment}
              />
            ))}
            {/* <div className='flex items-center  gap-2'>
                                      <div className='relative w-12 h-12 flex-shrink-0 '>
                                          <Image className='rounded-full'  src={post.author.avatar_url ?? '/eu.png'} layout='fill' objectFit='cover' alt={"Foto de perfil"}/>
                                      </div>
                                      <div>
                                          <span className='text-sm font-bold w-full text-left float-left'>@ruantmelo</span>
                                          <p className='text-sm'>lorem ipsum dolar amenet dasldasdasdeor,om  adomasodmasd ermoasdmoasd asdmoasmdoasdma asdmoasdmo</p>
                                      </div>
                                  </div>
                                 */}
          </div>
          <div className="border-t border-gray-100 bg-white ">
            <div className="flex gap-4 p-4">
              {/* <HeartIconSolid/> */}
              <div className="flex items-center gap-2 text-gray-500">
                <LikeHeart
                  className="h-6 w-6 md:w-8 md:h-8 cursor-pointer text-gray-500"
                  handleLike={handleLike}
                  handleRemoveLike={handleRemoveLike}
                  liked={liked}
                />
                <span
                  className={`${
                    likesCount === 0
                      ? 'pointer-events-none cursor-default'
                      : 'cursor-pointer'
                  }`}
                  onClick={openModalLikes}
                >
                  {likesCount} {commentsCount === 1 ? 'like' : 'likes'}
                </span>
              </div>

              <ModalLikes
                isOpen={isModalLikesOpen}
                closeModal={closeModalLikes}
                postId={id}
              />

              <div className=" transition-all duration-200  flex items-center  bg-opacity-30 p-2  gap-2 text-sm text-gray-500">
                <AnnotationIcon
                  className="h-6 w-6 md:w-8 md:h-8 text-gray-500"
                  aria-hidden="true"
                />
                <span>
                  {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
                </span>
              </div>
            </div>
            <form onSubmit={(e) => handleCreateComment(e)} className="mb-4">
              <Textarea
                name="new-comment"
                inputClassName="resize-none 
                text-xs  w-full
                                          bg-gray-100
                                          border-transparent
                                          focus:border-gray-500 focus:bg-white focus:ring-0"
                placeholder="Add a comment"
                rows={1}
                button={btnTextArea}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
