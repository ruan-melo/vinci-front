import { useQuery } from '@apollo/client'
import { PlusIcon, SearchIcon } from '@heroicons/react/solid'
import Router from 'next/router'
import { useRef, useState } from 'react'
import { Profile } from '../../contexts/AuthContext'
import { SEARCH_USER } from '../../services/queries'
import { Avatar } from '../Avatar'
import { InputGroup, InputGroupProps } from '../InputGroup'

const searchButton: InputGroupProps['button'] = {
  label: 'Search',
  name: 'search',
  children: (
    <div className="p-2 bg-gray-200 rounded-r-md">
      <SearchIcon name="search" className="h-5 w-5 text-gray-600" />
    </div>
  ),
}

interface SearchUser {
  id: string
  avatar: string
  name: string
  profile_name: string
}

export const Search = () => {
  //   const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const { data, refetch } = useQuery<{ searchUser: SearchUser[] }>(
    SEARCH_USER,
    {
      variables: {
        search: inputRef.current?.value || '',
      },
      skip: inputRef.current?.value === '',
    },
  )
  const [searching, setSearching] = useState(false)

  // eslint-disable-next-line no-undef
  const timer = useRef<NodeJS.Timeout>()
  return (
    <div className=" relative h-10  mx-4 w-full md:max-w-md  md:mx-auto">
      <input
        onChange={(event) => {
          setSearch(event.currentTarget.value)
        }}
        onKeyUp={(event) => {
          setSearching(true)
          if (timer.current) {
            clearTimeout(timer.current)
          }

          if (event.currentTarget.value) {
            timer.current = setTimeout(async () => {
              // setSearching(true)
              await refetch({
                search: inputRef.current?.value || '',
              })

              setSearching(false)
            }, 1000)
          }
        }}
        ref={inputRef}
        placeholder="Search for a @user"
        className="peer p-2 text-sm  border transition-all duration-200 focus-visible:outline-green-600   block w-full px-4  border-gray-300 rounded-md "
      ></input>
      {search && (
        <div className="hidden peer-focus:flex hover:flex absolute top-full left-0 w-full z-10 p-2  flex-col gap-2 bg-white border rounded-md  border-gray-300 ">
          {searching && (
            <div className="flex gap-2 ">
              <div className="h-8 w-8 flex-shrink-0 bg-slate-200 rounded-full" />

              <div className=" h-full w-full text-sm">
                <div className="h-2 w-full bg-slate-200 rounded"></div>
                <div className="mt-2 h-2 w-full bg-slate-200 rounded"></div>
              </div>
            </div>
          )}
          {data &&
            !searching &&
            data.searchUser.map((user) => (
              <UserOption
                key={user.id}
                id={user.id}
                name={user.name}
                avatar={user.avatar}
                profile_name={user.profile_name}
              />
            ))}
          {!data?.searchUser.length && !searching && (
            <div className="text-sm">No results found</div>
          )}

          {/* <div>caralho </div> */}
        </div>
      )}
    </div>
  )
}

interface UserOptionProps
  extends Pick<Profile, 'id' | 'avatar' | 'profile_name' | 'name'> {}

function UserOption({ name, profile_name, avatar }: UserOptionProps) {
  const onClick = () => {
    Router.push({
      pathname: '/[profile_name]',
      query: { profile_name },
    })
  }
  return (
    <div
      className="flex p-2 gap-2 cursor-pointer hover:bg-slate-200"
      onClick={onClick}
    >
      <Avatar avatar={avatar} name="teste" className="h-8 w-8 bg-transparent" />
      <div className="text-sm flex flex-col">
        <div>{name}</div>
        <div className="text-xs">@{profile_name}</div>
      </div>
    </div>
  )
}
