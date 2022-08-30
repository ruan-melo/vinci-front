import { Logo } from "../Logo"
import { PlusIcon } from '@heroicons/react/solid'
import { InputGroup } from "../InputGroup"
import { Search } from "./Search"
import { UserMenu } from "./UserMenu"
import { Notifications, Notification } from "./Notifications"
import useMediaQuery from "../../hooks/useMediaQuery"
import { Sidebar } from "./Sidebar"
import { NewPost } from "./NewPost"

const notifications: Notification[] = [
    {
        type: 'follow',
        user: {
            name: 'John Doe',
            avatar: '/eu.png',
        },
    },
    {
        type: 'follow',
        user: {
            name: 'John Doe',
            avatar: '/eu.png',
        },
    },
    {
        type: 'like',
        user: {
            name: 'John Doe',
            avatar: '/eu.png',
        },
    },
    {
        type: 'comment',
        user: {
            name: 'John Doe',
            avatar: '/eu.png',
        },
    }
]

export const Header = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <header className = 'bg-white py-4 px-8 flex items-center align-center border-b border-gray-200 w-full'>
            <Sidebar />
            <Logo className = 'text-2xl lg:text-4xl ' />
            {/* {!isMobile && } */}
            <NewPost/>
        
            {!isMobile && <Search />}
            {/* <Search/>  */}

            <Notifications notifications={notifications}/>

            <UserMenu/>

         
            
        </header>
    )
}