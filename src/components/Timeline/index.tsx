import { TimelinePost } from '../../models'
import { Post, PostProps } from './Post'

interface TimelineProps {
  posts: TimelinePost[]
}

export const Timeline = ({ posts }: TimelineProps) => {
  return (
    <div className="flex flex-col gap-4 md:bg-white mx-auto w-full max-w-[450px] sm:mt-4 shadow-md">
      {posts.map((post, index) => (
        <Post key={post.caption + index} {...post} />
      ))}
    </div>
  )
}
