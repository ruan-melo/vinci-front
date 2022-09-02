import { TrashIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useAuth } from "../../../hooks/useAuth";
import { Comment as CommentType, CommentWithAuthor } from "../../../models";
import { Avatar } from "../../Avatar";

type CommentProps = CommentWithAuthor & {
    handleRemove?: () => void;
};

export const Comment = ({text, author, handleRemove}: CommentProps) => {
    const {user} = useAuth();
    return (
        <div className='flex gap-2'>
            <div>
                <Avatar name={author.name} avatar_url={author.avatar_url} className='h-10 w-10'/>
            </div>
            
            <div className='flex flex-col gap-2 text-sm'>
                <p>
                    <span className=' font-bold mr-2'>{author.profile_name}</span>
                    {text}
                </p>
            </div>

            {user?.id === author.id && (
                <div onClick={handleRemove} className='cursor-pointer h-fit text-gray-600 hover:text-gray-800 transition-all duration-300'>
                    <TrashIcon className='h-4 w-4 text-inherit'/>
                </div>
            )}
        </div>
    );
}