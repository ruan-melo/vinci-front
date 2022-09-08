import React from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { Modal } from '../../Modal'
import { toast } from 'react-toastify'
import { api } from '../../../services/api'

interface PostOptionsProps extends React.HTMLAttributes<HTMLDivElement> {
  postId: string
  onDelete?: () => void
}

export const PostOptions = ({
  className,
  postId,
  onDelete,
}: PostOptionsProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast('Link copied to clipboard', {
      position: 'bottom-center',
      autoClose: 2000,
    })
  }

  const handleDeletePost = async () => {
    try {
      await api.delete(`/posts/${postId}`)
      toast('Post deleted', {
        position: 'bottom-center',
        autoClose: 2000,
      })
      if (onDelete) {
        onDelete()
      }
    } catch (error) {
      toast('Error deleting post', {
        position: 'bottom-center',
        autoClose: 2000,
      })
    }
  }
  return (
    <div className={className}>
      <div onClick={onOpen} className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </div>

      <Modal
        containerClassName="z-20"
        isOpen={isOpen}
        closeModal={onClose}
        className={'max-w-screen-sm'}
      >
        <div className="flex flex-col">
          <Option className="text-red-600" onClick={handleDeletePost}>
            Delete
          </Option>
          <Option onClick={handleCopyLink}>Copy Link</Option>
          <Option onClick={onClose}>Cancel</Option>
        </div>
      </Modal>
    </div>
  )
}

interface OptionProps {
  children: string
  className?: string
  onClick: () => void
}

function Option({ children, onClick, className = '' }: OptionProps) {
  return (
    <div className={` text-center p-2 border-b border-gray-300 ${className}`}>
      <span onClick={onClick} className="cursor-pointer">
        {children}
      </span>
    </div>
  )
}
