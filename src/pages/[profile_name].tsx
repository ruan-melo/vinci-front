import { useDisclosure } from '@chakra-ui/hooks'

import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { parseCookies } from 'nookies'
import { useState } from 'react'
import { Button } from '../components/Button'
import { PostImage } from '../components/Timeline/PostImage'
import { Main } from '../layouts/Main'

import { getApiClient } from '../services/getApiClient'
import { PostModal } from '../components/PostModal'
import { CogIcon, PhotographIcon } from '@heroicons/react/solid'
import UserAvatar from '../assets/default-user.svg'
import { api } from '../services/api'
import Router, { useRouter } from 'next/router'
import { useAuth } from '../hooks/useAuth'
import { decode } from 'jsonwebtoken'
import { client } from '../services/apolloClient'
import { gql } from '@apollo/client'
interface UserProfile {
  id: string
  name: string
  profile_name: string
  avatar: string
  followersCount: number
  followsCount: number
  followed: boolean
  posts: {
    caption: string
    id: string
    medias: {
      id: string
      media_url: string
      position: number
    }[]
  }[]
}

export type ProfileProps = UserProfile & {
  isOwner: boolean
}

export const Profile: NextPage<ProfileProps> = ({
  posts,
  followed,
  isOwner,
  ...user
}: ProfileProps) => {
  // const {user: loggedUser} = useAuth();

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const selectedPost = posts.find((post) => post.id === selectedPostId)

  const [isFollowing, setIsFollowing] = useState(followed)
  const {
    isOpen: isPostOpen,
    onOpen: openPost,
    onClose: closePost,
  } = useDisclosure()

  const handleOpenPost = (id: string) => {
    setSelectedPostId(id)
    window.history.replaceState({}, '', `/post/${id}`)
    openPost()
  }

  //   useEffect(() => {
  //     if (data) {
  //       window.history.pushState({}, `Post ${data.id}`, `/post/${data.id}`)
  //     }
  //     return () => {
  //       console.log('history', window.history.state)
  //     }
  //   }, [data])

  const handleClosePost = () => {
    window.history.replaceState({}, '', `/${user?.profile_name}`)
    closePost()
  }

  const handleFollow = async () => {
    try {
      const FOLLOW_USER = gql`
        mutation ($profile_name: String!) {
          follow(profile_name: $profile_name)
        }
      `
      const response = await api.post(`/users/${user?.profile_name}/follow`)
      setIsFollowing(true)
    } catch {
      // TODO: handle error
      console.log('error')
    }
  }

  const handleUnfollow = async () => {
    try {
      const response = await api.delete(`/users/${user?.profile_name}/follow`)
      setIsFollowing(false)
    } catch {
      console.log('error')
    }
  }

  const handleEditProfile = async () => {
    Router.push('/edit/profile')
  }

  if (!user) {
    return (
      <Main>
        <div className="flex justify-center h-full items-center mt-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold">User not found</h1>
            {/* <p className="text-xl">Please log in to see your profile</p> */}
          </div>
        </div>
      </Main>
    )
  }

  return (
    <Main>
      <div className="bg-white border-2 border-gray-100  p-6 max-w-4xl w-full  mx-auto sm:mt-4">
        <div className="flex items-center border-b border-gray-200 pb-4">
          <div className="shrink-0 h-48 w-48  relative  text-white bg-white fill-current ">
            <Image
              className="rounded-full w-full h-full bg-gray-300 fill-current"
              src={user.avatar ?? UserAvatar}
              width={'200px'}
              height={'200px'}
              objectFit="cover"
              alt={'Foto de perfil'}
            />
          </div>

          <div className="w-full  flex flex-col gap-2 justify-center ml-4">
            <div className="flex justify-between items-center ">
              <div className=" ">
                <h3 className="text-2xl text-gray-800">{user.name}</h3>
                <span className="text-sm">@{user.profile_name}</span>
              </div>

              {isOwner && (
                <Button onClick={handleEditProfile} variant="outline">
                  <CogIcon className="h-6 w-6" />
                </Button>
              )}
              {!isOwner && !isFollowing && (
                <Button onClick={handleFollow} className="mt-0">
                  Follow
                </Button>
              )}
              {!isOwner && isFollowing && (
                <Button
                  onClick={handleUnfollow}
                  variant="outline"
                  className="mt-0"
                >
                  Unfollow
                </Button>
              )}
            </div>

            <div>
              <p>
                {user.followsCount}{' '}
                {user.followersCount > 1 ? 'followers' : 'follower'}
              </p>
            </div>

            <div>
              <p>Followed by park_tien, melissa_andrade and 3 others</p>
            </div>
          </div>
        </div>

        {posts.length <= 0 && (
          <div className="flex items-center justify-center mt-4 flex-col text-gray-400">
            <PhotographIcon className="h-8 w-8 " />
            <p className="">No posts</p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="grid grid-cols-3  justify-between gap-2 mt-4">
            {posts.map((post) => {
              return (
                <PostImage key={post.id} post={post} onClick={handleOpenPost} />
              )
            })}
          </div>
        )}
      </div>

      {selectedPost && (
        <PostModal
          isPostOpen={isPostOpen}
          closePost={handleClosePost}
          post={{ ...selectedPost, author: user }}
        />
      )}
    </Main>
  )
}

export default Profile

const GET_USER_PROFILE = gql`
  query GetUserProfile($profile_name: String!) {
    profile(profile_name: $profile_name) {
      id
      avatar
      name
      profile_name
      posts {
        author
        caption
        medias {
          id
          media_url
          position
        }
      }
      followsCount
      followersCount
      followed
    }
  }
`

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
  context,
) => {
  const api = await getApiClient(context)
  const { 'vinci:access_token': access_token } = parseCookies(context)

  const profile_name = (context.params as { profile_name: string }).profile_name

  const decoded = access_token
    ? (decode(access_token) as { sub: string })
    : null

  try {
    const { data, error } = await client.query<{ profile: UserProfile }>({
      query: GET_USER_PROFILE,
      variables: { profile_name },
    })

    if (error) {
      return {
        notFound: true,
      }
    }
    const { followed, ...user } = data.profile

    const isOwner = decoded ? decoded.sub === user.id : false

    return {
      props: {
        ...data.profile,
        isOwner,
      },
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}
