import { Logo } from '../Logo'
import { PlusIcon } from '@heroicons/react/solid'
import { Search } from './Search'
import { UserMenu } from './UserMenu'
import { Notifications } from './Notifications'
import { NewPostContext } from '../../contexts/NewPostContext'
import { useContext } from 'react'

export const Header = () => {
  // const isMobile = useMediaQuery('(max-width: 768px)')
  const { open } = useContext(NewPostContext)

  return (
    <header className="bg-white-300 py-4 px-8 flex items-center align-center border-b border-gray-200 w-full">
      {/* <Sidebar /> */}
      <Logo link className="text-2xl md:text-4xl " />
      {
        <button
          onClick={open}
          className="hidden md:flex flex-shrink-0 text-green-600  rounded-sm p-2  transition-all duration-200 ml-6  text-center items-center justify-center"
        >
          <PlusIcon className="h-5 w-5 " />
          <span className="inline">New post</span>
        </button>
      }

      {<Search />}
      {/* <Search/>  */}

      <Notifications />

      <UserMenu />
    </header>
  )
}
