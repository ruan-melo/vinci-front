import { TrashIcon } from '@heroicons/react/solid'

import { useAuth } from '../../../hooks/useAuth'

import { Avatar } from '../../Avatar'
import { User as UserModel } from '../../../models/user'

type CommentProps = {
  text: string
  author: Required<Pick<UserModel, 'id' | 'avatar' | 'profile_name' | 'name'>>
} & {
  handleDelete?: () => void
}

export const Comment = ({ text, author, handleDelete }: CommentProps) => {
  const { user } = useAuth()
  return (
    <div className="flex gap-2">
      <div>
        <Avatar
          name={author.name}
          avatar={author.avatar}
          className="h-10 w-10"
        />
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <p>
          <span className="font-bold mr-2">{author.profile_name}</span>
          {text}
        </p>
      </div>

      {user?.id === author.id && (
        <div
          onClick={handleDelete}
          className="cursor-pointer h-fit text-gray-600 hover:text-gray-800 transition-all duration-300"
        >
          <TrashIcon className="h-4 w-4 text-inherit" />
        </div>
      )}
    </div>
  )
}
