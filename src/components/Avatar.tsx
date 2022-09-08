import Image from 'next/image'
import { User } from '../contexts/AuthContext'
import UserAvatar from '../assets/default-user.svg'

type AvatarProps = Pick<User, 'name' | 'avatar_url'> & { className?: string }

export function Avatar({ name, avatar_url, className }: AvatarProps) {
  console.log('avatar_url', avatar_url)

  return (
    <div className={`avatar ${className}`}>
      <Image
        className="rounded-full w-full h-full bg-gray-300 fill-current"
        src={avatar_url || UserAvatar}
        width="200px"
        height="200px"
        objectFit="cover"
        alt={`${name}'s ´picture`}
      />
    </div>
  )
}
