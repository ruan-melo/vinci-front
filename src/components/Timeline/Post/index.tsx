import { AnnotationIcon, HeartIcon } from '@heroicons/react/outline'
import {
  AnnotationIcon as AnnotationIconSolid,
  HeartIcon as HeartIconSolid,
} from '@heroicons/react/solid'
import Image from 'next/image'
import {
  createRef,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Modal } from '../../Modal'
import { Textarea } from '../../Textarea'
import { useDisclosure } from '@chakra-ui/hooks'
import { Comment } from './Comment'
import { Like } from './Like'
import {
  PostTimeline,
  PostWithMedia,
  PostWithMediaAndAuthor,
} from '../../../models'
import UserAvatar from '../../../assets/default-user.svg'
import { ImagesCarousel } from '../../ImagesCarousel'
import { api, fetcher } from '../../../services/api'
import useSWR from 'swr'
import { ModalComments } from '../ModalComments'
import { ModalLikes } from '../../ModalLikes'
import { PostOptions } from './PostOptions'
import { LikeHeart } from '../../LikeHeart'

export interface PostProps extends PostTimeline {}

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
  comments_count: commentsCountProps,
  liked: likedProp,
  likes_count: likesCountProps,
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
      const response = await api.post(`/posts/${id}/likes`)
      setLikesCount((oldState) => oldState + 1)
      setLiked(true)
    } catch (err) {
      console.log(err)
    }
  }

  const handleRemoveLike = async () => {
    try {
      const response = await api.delete(`/posts/${id}/likes`)
      setLikesCount((oldState) => oldState - 1)
      setLiked(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleRemoveComment = async () => {
    try {
      const response = await api.delete(`/posts/${id}/comments`)
      setCommentsCount((oldState) => oldState - 1)
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
      await api.post(`/posts/${id}/comments`, { text })
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
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              className="bg-gray-300 fill-current"
              src={author.avatar_url ?? UserAvatar}
              width={'50px'}
              height={'50px'}
              objectFit="cover"
              alt={'Foto de perfil'}
            />
          </div>
          <div className="flex flex-col ">
            {author.name}
            <span className="text-xs w-full text-left">
              @{author.profile_name}
            </span>
          </div>

          <PostOptions
            // onDelete={() => {}}
            postId={id}
            className="self-start text-gray-600 ml-auto"
          />
        </div>

        {caption ? (
          <p className="max-w-full break-all text-sm ">{caption}</p>
        ) : null}
      </div>
      <div className="flex items-center px-2   gap-4">
        <div className="cursor-pointer flex items-center  bg-opacity-30 p-2  gap-2 text-sm text-gray-500">
          <LikeHeart
            handleLike={handleLike}
            handleRemoveLike={handleRemoveLike}
            liked={liked}
            className="h-5 w-5"
          />

          <span
            onClick={onOpenModalLikes}
            className={`hover:text-gray-800 transition-all duration-200 ${
              likesCount === 0 ? 'pointer-events-none cursor-default' : ''
            }`}
          >
            {likesCount} Likes
          </span>
        </div>

        <ModalLikes
          postId={id}
          isOpen={isModalLikesOpen}
          closeModal={onCloseModalLikes}
        />

        <div className="hover:text-gray-800 transition-all duration-200 cursor-pointer flex items-center  bg-opacity-30 p-2  gap-2 text-sm text-gray-500">
          <AnnotationIcon className=" h-5 w-5 " />
          <span onClick={onOpenModalComments}>{commentsCount} Comments</span>
        </div>

        <ModalComments
          postId={id}
          isOpen={isModalCommentsOpen}
          closeModal={onCloseModalComments}
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
