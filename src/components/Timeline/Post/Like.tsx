import Image from 'next/image'
import { Profile } from '../../../contexts/AuthContext'
import { Avatar } from '../../Avatar'
import { Button } from '../../Button'

interface LikeProps {
  user: {
    id: string
    name: string
    profile_name: string
    avatar: string
  }
}

export const Like = ({ user }: LikeProps) => {
  return (
    <div className="flex gap-2 items-center">
      <div>
        <Avatar className="h-8 w-8" avatar={user.avatar} name={user.name} />
      </div>

      <div className="flex flex-col gap-2 text-sm sm:text-md">
        <div className="flex flex-col ">
          {user.name}
          <span className="text-xs w-full text-left">@{user.profile_name}</span>
        </div>
      </div>

      {/* <Button className='p-2 mt-0 ml-auto text-xs sm:text-sm'>
                Follow
            </Button> */}
    </div>
  )
}
