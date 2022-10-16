import { useDisclosure } from '@chakra-ui/hooks'
import {
  HomeIcon as HomeIconOutline,
  PlusCircleIcon as PlusCircleIconOutline,
  AdjustmentsIcon as AdjustmentsIconOutline,
} from '@heroicons/react/outline'
import {
  HomeIcon as HomeIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
  AdjustmentsIcon as AdjustmentsIconSolid,
} from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { NewPostContext } from '../contexts/NewPostContext'
import { useAuth } from '../hooks/useAuth'
import { Avatar } from './Avatar'
import { Modal } from './Modal'

export const BottomBar = () => {
  const router = useRouter()
  const { user } = useAuth()
  const { open: openNewPost, isOpen: isNewPostOpen } =
    useContext(NewPostContext)
  const {
    isOpen: isOptionsOpen,
    onOpen: openOptions,
    onClose: closeOptions,
  } = useDisclosure()

  if (!user) {
    return null
  }

  return (
    <div className="fixed md:hidden bottom-0 bg-white flex items-center justify-around  w-full p-2 ">
      {/* <Item href={'/'} active={router.asPath === '/'}>
        <HomeIcon className="h-6 w-6" />
      </Item> */}
      <Link href={'/'}>
        <a>
          {router.asPath === '/' ? (
            <HomeIconSolid className={'h-8 w-8'} />
          ) : (
            <HomeIconOutline className={'h-8 w-8'} />
          )}
        </a>
      </Link>
      <div>
        <button onClick={openNewPost}>
          {isNewPostOpen ? (
            <PlusCircleIconSolid className="h-8 w-8" />
          ) : (
            <PlusCircleIconOutline className="h-8 w-8" />
          )}
        </button>
      </div>
      <Link href={`/${user.profile_name}`}>
        <a>
          <Avatar {...user} className="h-10 w-10" />
        </a>
      </Link>

      <div>
        <button onClick={openOptions}>
          {isOptionsOpen ? (
            <AdjustmentsIconOutline className="h-8 w-8" />
          ) : (
            <AdjustmentsIconSolid className="h-8 w-8" />
          )}
        </button>
      </div>

      <Options
        isOpen={isOptionsOpen}
        closeOptions={closeOptions}
        openOptions={openOptions}
      />
      {/* <Item href={'/'} active={router.asPath === '/'}>
        <HomeIcon className="h-6 w-6" />
      </Item> */}
    </div>
  )
}

// type ItemProps = {
//   children: ReactNode
//   href: string
//   active: boolean
// }

// const Item = ({ children, href }: ItemProps) => {
//   return <Link href={href}>{children}</Link>
// }

interface OptionsProps {
  isOpen: boolean
  closeOptions: () => void
  openOptions: () => void
}

function Options({ closeOptions, isOpen, openOptions }: OptionsProps) {
  const { logout } = useAuth()
  return (
    <Modal
      containerClassName="z-20"
      isOpen={isOpen}
      closeModal={closeOptions}
      className={'max-w-screen-sm'}
    >
      <div className="flex flex-col">
        <Option className="text-red-600" onClick={logout}>
          Log out
        </Option>
        {/* <Option onClick={handleCopyLink}>Copy Link</Option> */}
        <Option onClick={closeOptions}>Cancel</Option>
      </div>
    </Modal>
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
