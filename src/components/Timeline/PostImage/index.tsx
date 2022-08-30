import Image from "next/image"
import { PostWithMedia } from "../../../models"

interface PostImageProps {
    post: PostWithMedia
    onClick: (id: string) => void;
}

export const PostImage = ({post, onClick}: PostImageProps) => {
    return (
        <div>
            <div onClick={() => {
                onClick(post.id);
            }} className='post relative hover:brightness-75 w-full h-[300px] cursor-pointer'>
                <Image src={post.medias[0].media_url} layout='fill' objectFit='cover' alt={"Foto de perfil"}/>
            </div>
            {/* <span>{post.medias.length}</span> */}
        </div>
       
    )
}