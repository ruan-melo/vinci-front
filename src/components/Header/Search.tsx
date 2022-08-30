import { PlusIcon, SearchIcon } from "@heroicons/react/solid"
import { InputGroup, InputGroupProps } from "../InputGroup"

const searchButton: InputGroupProps['button'] = {
    label: 'Search',
    name: 'search',
    children: <div className = 'p-2 bg-gray-200 rounded-r-md'>
        <SearchIcon name='search' className="h-5 w-5 text-gray-600" />
    </div>
} 

export const Search = () => {
    return (
        <InputGroup placeholder="Search for a @user" name='search' containerClassName= 'mx-auto w-[200px] lg:w-[400px]'  button={searchButton}/>
    )
}