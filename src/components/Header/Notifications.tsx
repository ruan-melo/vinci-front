import { useQuery } from '@apollo/client'
import { Popover, Transition } from '@headlessui/react'
import {
  AnnotationIcon,
  BellIcon,
  HeartIcon,
  UserAddIcon,
} from '@heroicons/react/solid'
import Image from 'next/image'
import Router from 'next/router'
import { Fragment } from 'react'
import { FollowNotification } from '../../models/follow-notification'
import { User } from '../../models/user'
import { client } from '../../services/apolloClient'
import {
  GET_NOTIFICATIONS,
  MARK_ALL_NOTIFICATIONS_AS_READ,
} from '../../services/queries'
import { Avatar } from '../Avatar'

interface NotificationsProps {
  notifications: Notification[]
}
function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  )
}

export function Notifications() {
  const { data, loading, error, updateQuery, refetch } = useQuery<{
    notifications: Required<
      FollowNotification & {
        follower: Required<
          Pick<User, 'avatar' | 'id' | 'name' | 'profile_name'>
        >
      }
    >[]
  }>(GET_NOTIFICATIONS)

  const unreadNotifications = data?.notifications.filter((n) => !n.read) || []

  const handleMarkAllAsRead = async () => {
    const response = await client.mutate({
      mutation: MARK_ALL_NOTIFICATIONS_AS_READ,
    })

    updateQuery((prev) => {
      return {
        ...prev,
        notifications: prev.notifications.map((notification) => ({
          ...notification,
          read: true,
        })),
      }
    })

    refetch()
  }

  const handleUserProfile = (userProfileName: string) => {
    Router.push(`/${userProfileName}`)
  }

  return (
    <div className="mr-0 ml-auto md:ml-0 md:mr-2">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                  ${open ? '' : 'text-opacity-90'}
                  group inline-flex items-center rounded-md  py-2 md:px-3 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <div className="relative group-hover:text-opacity-100">
                <BellIcon
                  className={`${open ? '' : 'text-opacity-80'} ${
                    unreadNotifications.length > 0
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }
                    
                        h-5 w-5  transition duration-150 ease-in-out group-hover:text-opacity-100`}
                  aria-hidden="true"
                />
                {unreadNotifications.length > 0 && (
                  <span className="flex absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 h-2 w-2">
                    <span className="animate-[ping_1.2s_cubic-bezier(0,0,0.2,1)_infinite] absolute  inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className=" inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                )}
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="fixed sm:absolute right-1/2 translate-x-1/2 md:right-1/2 z-10 mt-3 w-screen max-w-sm transform px-2 lg:px-4 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative flex flex-col gap-4  bg-white p-7">
                    {data &&
                      data.notifications.map((item, index) => (
                        <div
                          onClick={() =>
                            handleUserProfile(item.follower.profile_name)
                          }
                          key={index}
                          className={`${
                            item.read ? 'opacity-50' : ''
                          } -m-3 flex items-center cursor-pointer  rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-50 `}
                        >
                          {/* !! ONLY SUPPORTING FOLLOW NOTIFICATION */}
                          <div className=" relative mr-2 flex align-center items-center  ">
                            {/* <div className="bg-gray-300 relative w-8 h-8 rounded-full overflow-hidden"> */}
                            <Avatar
                              className="w-8 h-8 bg-transparent"
                              avatar={item.follower.avatar}
                              name={item.follower.name}
                            />
                            {/* </div> */}

                            <span className="ml-2 text-gray-400 text-lg">
                              <UserAddIcon className="w-4 h-4" />
                            </span>
                          </div>

                          <span className="text-sm">
                            {item.follower.name} followed you
                          </span>

                          {/* {item.type !== 'update' && (
                            <>
                              <div className=" relative mr-2 flex align-center items-center  ">
                                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                  <Image
                                    src={item.user.avatar}
                                    width={'100%'}
                                    height={'100%'}
                                    alt={`Foto de perfil ${item.user.name}`}
                                  />
                                </div>

                                <span className="ml-2 text-gray-400 text-lg">
                                  {item.type === 'follow' && (
                                    <UserAddIcon className="w-4 h-4" />
                                  )}
                                  {item.type === 'like' && (
                                    <HeartIcon className="w-4 h-4" />
                                  )}
                                  {item.type === 'comment' && (
                                    <AnnotationIcon className="w-4 h-4" />
                                  )}
                                </span>
                              </div>
                              {item.type === 'follow' && (
                                <span className="text-sm">
                                  {item.user.name} followed you
                                </span>
                              )}
                              {item.type === 'like' && (
                                <span className="text-sm">
                                  {item.user.name} liked your post
                                </span>
                              )}
                              {item.type === 'comment' && (
                                <span className="text-sm">
                                  {item.user.name} commented on your post
                                </span>
                              )}
                            </>
                          )} */}

                          {/* <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">
                                {item.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                {item.description}
                                </p>
                            </div> */}
                        </div>
                      ))}

                    {loading && (
                      <div className="flex justify-center items-center animate-pulse">
                        <div className="h-8 w-8 flex-shrink-0 bg-slate-200 rounded-full" />
                        <div className="ml-2 h-4 w-full bg-slate-200 rounded"></div>
                      </div>
                    )}

                    {data && data?.notifications.length === 0 && (
                      <div className="flex justify-center items-center">
                        <span className="text-gray-400 text-sm">
                          No notifications
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 p-2 px-4 inline-flex justify-center items-end w-full ">
                    <span
                      onClick={handleMarkAllAsRead}
                      className={`${
                        unreadNotifications.length === 0
                          ? 'disabled pointer-events-none'
                          : ''
                      } text-sm text-green-700 hover:text-green-900 transition-all duration-200 cursor-pointer`}
                    >
                      Mark all as read
                    </span>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
