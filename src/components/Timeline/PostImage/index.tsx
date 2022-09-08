import Image from 'next/image'
import { PostWithMedia } from '../../../models'

interface PostImageProps {
  post: PostWithMedia
  onClick: (id: string) => void
}

export const PostImage = ({ post, onClick }: PostImageProps) => {
  return (
    <div>
      <div
        onClick={() => {
          onClick(post.id)
        }}
        className="post relative hover:brightness-75 w-full h-[300px] cursor-pointer"
      >
        <Image
          src={post.medias[0].media_url}
          layout="fill"
          objectFit="cover"
          alt={'Foto de perfil'}
        />
        {post.medias.length > 1 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="rgb(156 163 175)"
            className=" text-white absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
            />
          </svg>
        )}
      </div>
      {/* <span>{post.medias.length}</span> */}
    </div>
  )
}
