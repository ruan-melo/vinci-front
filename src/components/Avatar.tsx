import Image from "next/image"
import { User } from "../contexts/AuthContext"
import UserAvatar from '../assets/default-user.svg'

type AvatarProps = Pick<User, "name" | "avatar_url"> & {className?: string};

export const Avatar = ({name, avatar_url, className}: AvatarProps) => {
    

    return (
        <div className={`avatar ${className}`}>
            <Image className='rounded-full w-full h-full bg-gray-300 fill-current' src={UserAvatar} width={'200px'} height={'200px'} objectFit='cover' alt={"Foto de perfil"}/>
        </div>
    )
}