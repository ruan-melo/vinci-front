import Image from 'next/image'
import {
  Comment as CommentType,
  PostWithMedia,
  PostWithMediaAndComments,
} from '../../models'
import { Modal } from '../Modal'

import { User } from '../../contexts/AuthContext'
import { Textarea } from '../Textarea'
import { ImagesCarousel } from '../ImagesCarousel'
import useSWR from 'swr'
import { fetcher } from '../../services/api'
import { Comment } from '../Timeline/Post/Comment'
import { ModalLikes } from '../ModalLikes'
import { useDisclosure } from '@chakra-ui/hooks'
import { Post } from '../Post'
import { useEffect, useState } from 'react'
import Router from 'next/router'

interface IPostModal extends PostWithMedia {
  author: User
  liked: boolean
  likes_count: number
  comments_count: number
  comments: (CommentType & { author: User })[]
}

interface PostModalProps {
  post: PostWithMedia & { author: User }
  isPostOpen: boolean
  closePost: () => void
}

export function PostModal({ post, isPostOpen, closePost }: PostModalProps) {
  const { data } = useSWR<IPostModal>(
    `/posts/${post.id}?comments=true&medias=true&author=true&liked=true&likes_count=true&comments_count=true`,
    fetcher,
  )

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Modal
      isOpen={isPostOpen}
      closeModal={closePost}
      containerClassName={'z-10'}
      className="h-modal max-w-7xl"
    >
      {data && <Post {...data} />}
    </Modal>
  )
}
