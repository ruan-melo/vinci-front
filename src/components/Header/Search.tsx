import { useQuery } from '@apollo/client'
import { PlusIcon, SearchIcon } from '@heroicons/react/solid'
import { useRef, useState } from 'react'
import { SEARCH_USER } from '../../services/queries'
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
  const { data, loading, refetch } = useQuery<{ searchUser: SearchUser[] }>(
    SEARCH_USER,
    {
      variables: {
        search: inputRef.current?.value || '',
      },
      skip: inputRef.current?.value === '',
    },
  )
  // eslint-disable-next-line no-undef
  const timer = useRef<NodeJS.Timeout>()
  return (
    // <form
    //   className="mx-auto w-[200px] lg:w-[400px]"
    //   onSubmit={() => console.log('submited')}
    // >
    <>
      <InputGroup
        list="users"
        autoComplete="users"
        ref={inputRef}
        placeholder="Search for a @user"
        id="search-user"
        name="search-user"
        onKeyUp={(event) => {
          if (timer.current) {
            clearTimeout(timer.current)
          }

          if (event.currentTarget.value) {
            timer.current = setTimeout(() => {
              refetch({
                search: inputRef.current?.value || '',
              })
            }, 1000)
          }
        }}
        containerClassName="mx-auto w-[200px] lg:w-[400px]"
        button={searchButton}
      />
      {/* <datalist id="users">
        {data?.searchUser.map((user) => (
          <option key={user.id} value={user.profile_name}>
            {user.name}
          </option>
        ))}
      </datalist> */}
    </>
  )
}
