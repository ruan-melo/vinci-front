import { NextPage } from 'next'
import Image from 'next/image'
import { Button } from '../../components/Button'
import { PostImage } from '../../components/Timeline/PostImage'
import { useAuth } from '../../hooks/useAuth'
import { Main } from '../../layouts/Main'

export const Profile: NextPage = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <Main>
        <div className="flex justify-center h-full items-center mt-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold">You are not logged in</h1>
            <p className="text-xl">Please log in to see your profile</p>
          </div>
        </div>
      </Main>
    )
  }

  return (
    <Main>
      <div className="bg-white border-2 border-gray-100  p-6 max-w-4xl w-full  mx-auto sm:mt-4">
        <div className="flex items-center border-b border-gray-200 pb-4">
          <div className="shrink-0 h-48 w-48  relative text-gray-400  ">
            <Image
              className="rounded-full w-full h-full"
              src="/eu.png"
              width={'200px'}
              height={'200px'}
              objectFit="cover"
              alt={'Foto de perfil'}
            />
          </div>

          <div className="w-full   flex flex-col gap-2 justify-center ml-4">
            <div className="flex justify-between items-center ">
              <div className=" ">
                <h3 className="text-2xl text-gray-800">{user.name}</h3>
                <span className="text-sm">@{user.profile_name}</span>
              </div>

              {/* {} */}
              {/* <Button className='mt-0'>Follow</Button> */}
            </div>

            <div>
              <p>437 followers</p>
            </div>

            <div>
              <p>Followed by park_tien, melissa_andrade and 3 others</p>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-3  justify-between gap-2 mt-4">
          <PostImage />
          <PostImage />
          <PostImage />
          <PostImage />
          <PostImage />
        </div> */}
      </div>
    </Main>
  )
}

export default Profile
