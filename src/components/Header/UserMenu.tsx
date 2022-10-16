import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import {
  AdjustmentsIcon,
  ChevronDownIcon,
  LogoutIcon,
  UserIcon,
} from '@heroicons/react/solid'
import Image from 'next/image'
import { useAuth } from '../../hooks/useAuth'
import UserAvatar from '../../assets/default-user.svg'
import Router from 'next/router'
import { Avatar } from '../Avatar'

export function UserMenu() {
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const handleProfile = () => {
    if (user) {
      Router.push(`/${user.profile_name}`)
    }
  }

  if (!user) {
    return null
  }

  const handleSettings = () => {
    Router.push('/settings')
  }

  console.log('user avatar', user.avatar)

  return (
    <div className="hidden md:flex items-center justify-center mr-0 ">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center items-center rounded-md text-sm font-medium text-gray-700 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <Avatar {...user} className="h-10 w-10 md:mr-2 md:h-12 md:w-12" />

            <div className="hidden lg:flex flex-col">
              {user.name}
              <span className="text-xs w-full text-left">
                @{user.profile_name}
              </span>
            </div>

            <ChevronDownIcon
              className="md:ml-2 -mr-1 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-20 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-green-600 text-white' : 'text-gray-700'
                    } transition-all duration-200 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={handleProfile}
                  >
                    <UserIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    Profile
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-green-600 text-white' : 'text-gray-700'
                    } transition-all duration-200 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={handleSettings}
                  >
                    <AdjustmentsIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Settings
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? 'bg-green-600 text-white' : 'text-gray-700'
                    } transition-all duration-200 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <LogoutIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    Log out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
