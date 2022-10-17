import { AnnotationIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { Textarea } from '../../Textarea'
import { useDisclosure } from '@chakra-ui/hooks'
import { TimelinePost } from '../../../models'
import UserAvatar from '../../../assets/default-user.svg'
import { ImagesCarousel } from '../../ImagesCarousel'
import { api } from '../../../services/api'
import { ModalComments } from '../ModalComments'
import { ModalLikes } from '../../ModalLikes'
import { PostOptions } from './PostOptions'
import { LikeHeart } from '../../LikeHeart'
import { client } from '../../../services/apolloClient'
import {
  CREATE_COMMENT,
  LIKE_POST,
  REMOVE_LIKE,
} from '../../../services/queries'
import { Avatar } from '../../Avatar'
import Router from 'next/router'

export interface PostProps extends TimelinePost {}

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
  caption,
  author,
  medias,
  id,
  liked: likedProp,
  commentsCount: commentsCountProps,
  // liked: likedProp,
  likesCount: likesCountProps,
}: PostProps) => {
  const {
    isOpen: isModalCommentsOpen,
    onOpen: onOpenModalComments,
    onClose: onCloseModalComments,
  } = useDisclosure()
  const {
    isOpen: isModalLikesOpen,
    onOpen: onOpenModalLikes,
    onClose: onCloseModalLikes,
  } = useDisclosure()

  const [liked, setLiked] = useState(likedProp)
  const [likesCount, setLikesCount] = useState(likesCountProps)
  const [commentsCount, setCommentsCount] = useState(commentsCountProps)

  const handleLike = async () => {
    try {
      const response = await client.mutate({
        mutation: LIKE_POST,
        variables: {
          postId: id,
        },
      })
      setLikesCount((oldState) => oldState + 1)
      setLiked(true)
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
      setLikesCount((oldState) => oldState - 1)
      setLiked(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleCreateComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const textElement = (e.target as any)['new-comment'] as HTMLTextAreaElement
    const text = textElement.value.trim()

    if (text.length === 0) return

    try {
      const response = await client.mutate({
        mutation: CREATE_COMMENT,
        variables: {
          postId: id,
          text,
        },
      })
      setCommentsCount((oldState) => oldState + 1)
      textElement.value = ''
    } catch (e) {
      // TODO: Tratar erro
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="relative p-0 w-[450px] h-[550px]">
        {medias.length > 1 && (
          <ImagesCarousel images={medias.map((m) => ({ src: m.media_url }))} />
        )}
        {medias.length === 1 && (
          <Image
            src={medias[0].media_url}
            layout="fill"
            objectFit="cover"
            alt={'Foto de perfil'}
          />
        )}
        {/* <Image className='' src={medias[0].media_url} alt='post' width='450px' height='550px' objectFit="cover"  />        */}
      </div>

      <div className="box-border border-none px-4 py-2 bg-opacity-40 flex flex-col gap-2 max-w-full text-gray-700">
        <div className="flex gap-4 items-center overflow-">
          <div
            className="flex cursor-pointer"
            onClick={() => {
              Router.push(`/${author.profile_name}`)
            }}
          >
            <Avatar
              name={author.name}
              avatar={author.avatar}
              className="w-10 h-10 "
            />

            <div className="flex flex-col ">
              {author.name}
              <span className="text-xs w-full text-left">
                @{author.profile_name}
              </span>
            </div>
          </div>

          <PostOptions
            // onDelete={() => {}}
            authorId={author.id}
            postId={id}
            className="self-start text-gray-600 ml-auto"
          />
        </div>

        {caption ? (
          <p className="max-w-full break-all text-sm ">{caption}</p>
        ) : null}
      </div>
      <div className="flex items-center px-2   gap-4">
        <div
          className={`cursor-pointer flex items-center  bg-opacity-30 p-2  gap-2 text-sm text-gray-500`}
        >
          <LikeHeart
            handleLike={handleLike}
            handleRemoveLike={handleRemoveLike}
            liked={liked}
            className="h-5 w-5"
          />

          <span
            onClick={onOpenModalLikes}
            className={`hover:text-gray-800 transition-all duration-200 ${
              likesCount === 0
                ? 'pointer-events-none disabled cursor-default'
                : ''
            }`}
          >
            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
          </span>
        </div>

        <ModalLikes
          postId={id}
          isOpen={isModalLikesOpen}
          closeModal={onCloseModalLikes}
        />

        <div
          className={`${
            commentsCount === 0
              ? 'pointer-events-none disabled cursor-default'
              : ''
          } hover:text-gray-800 transition-all duration-200 cursor-pointer flex items-center  bg-opacity-30 p-2  gap-2 text-sm text-gray-500`}
        >
          <AnnotationIcon className=" h-5 w-5 " />
          <span onClick={onOpenModalComments}>
            {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
          </span>
        </div>

        <ModalComments
          postId={id}
          isOpen={isModalCommentsOpen}
          closeModal={onCloseModalComments}
          onDeleteComment={() => {
            setCommentsCount((oldState) => oldState - 1)
          }}
        />
      </div>

      <form
        className=""
        onSubmit={(e) => {
          handleCreateComment(e)
        }}
      >
        <Textarea
          name="new-comment"
          inputClassName="resize-none 
                    transition-all
                    
                    duration-300
                    bg-gray-100
                    
                    rounded-none
                    focus:ring-0
                    focus:bg-gray-200
                    "
          placeholder="Add a comment"
          rows={1}
          button={btnTextArea}
          icon={<AnnotationIcon className=" h-5 w-5 text-gray-400 " />}
        />
      </form>
    </div>
  )
}
