import Image from 'next/image'
import { Profile } from '../contexts/AuthContext'
import UserAvatar from '../assets/default-user.svg'

type AvatarProps = Pick<Profile, 'name' | 'avatar'> & { className?: string }

export function Avatar({ name, avatar, className }: AvatarProps) {
  return (
    <div className={`avatar ${className}`}>
      <Image
        className="rounded-full w-full h-full bg-gray-300 fill-current"
        src={avatar || UserAvatar}
        width="200px"
        height="200px"
        objectFit="cover"
        alt={`${name}'s ´picture`}
      />
    </div>
  )
}
