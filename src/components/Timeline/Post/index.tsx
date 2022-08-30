import { AnnotationIcon, HeartIcon } from "@heroicons/react/outline"
import { AnnotationIcon as AnnotationIconSolid, HeartIcon as HeartIconSolid } from "@heroicons/react/solid"
import Image from "next/image"
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "../../Modal";
import { Textarea } from "../../Textarea";
import { useDisclosure } from "@chakra-ui/hooks"
import { Comment } from "./Comment";
import { Like } from "./Like";
import { PostWithMedia } from "../../../models";

export interface PostProps extends PostWithMedia {
    liked: boolean;
}

const btnTextArea =  {
    label: "Send",
    name: "send-button",
    children: (
        <div className = 'py-2 pr-4 text-green-600 text-sm rounded-r-md'>
            Post
        </div>
    )
}

export const Post = ({caption, liked: likedProp}: PostProps) => {
    const { isOpen: isModalCommentsOpen, onOpen: onOpenModalComments, onClose: onCloseModalComments } = useDisclosure()
    const { isOpen: isModalLikesOpen, onOpen: onOpenModalLikes, onClose: onCloseModalLikes} = useDisclosure()
    const [liked, setLiked] = useState(likedProp)
    const likedTimeout = useRef<NodeJS.Timeout>();
    const likeRef = useRef<SVGSVGElement>(null);
    
    const handleLike = useCallback(() => {

        if (liked) {
            setLiked(false)
            if(likeRef.current){
                likeRef.current.classList.remove('text-green-600')
            }
           
            clearTimeout(likedTimeout.current)
            return;
        }
        
        if(likeRef.current) {
            likeRef.current.classList.toggle('animate-ping')
            likeRef.current.classList.add('text-green-600')
        }

        likedTimeout.current = setTimeout(() => {
            if(likeRef.current) {
                likeRef.current.classList.toggle('animate-ping')
                setLiked(true)
            }
        }, 1000)

        return () => {
            clearTimeout(likedTimeout.current);
        }
    } , [])
    

    return (
        <div className='flex flex-col w-full h-full'>
            <div className='relative p-0 w-full'>
                <Image className='' src='/eu.png' alt='post' width='450px' height='550px' objectFit="contain"  />       
            </div>

            <div className='box-border border-none px-4 py-2 bg-opacity-40 flex flex-col gap-2 max-w-full text-gray-700'>
                <div className='flex gap-4 items-center overflow-'>
                    <div className='w-10 h-10 rounded-full overflow-hidden'>
                        <Image src='/eu.png' width={'50px'} height={'50px'} objectFit='cover' alt={"Foto de perfil"}/>
                    </div>
                    <div className='flex flex-col '>
                        Ruan Tenório de Melo
                        <span className='text-xs w-full text-left'>@ruantmelo</span>
                    </div>
                </div>
                
                <p className='max-w-full break-all text-sm '>
                    #Cria
                </p>
            </div>    
            <div className='flex items-center px-2   gap-4'>
                <div  className='cursor-pointer flex items-center  bg-opacity-30 p-2  gap-2 text-sm text-gray-500'>
                    <div className='relative'>
                        <HeartIconSolid ref={likeRef} onClick={() => console.log('teste')} className={`absolute h-5 w-5 transition-all duration-200 hover:text-green-800`} aria-hidden="true" />
                        
                        {liked && <HeartIconSolid className='relative h-5 w-5 text-green-600 transition-all duration-200 hover:text-green-800' aria-hidden="true" />}
                        
                        {!liked && <HeartIcon onClick = {handleLike} className='relative h-5 w-5 transition-all hover:text-gray-800  duration-200' aria-hidden="true" />}
                    </div>
                        
                  
                    
                    <span onClick={onOpenModalLikes} className='hover:text-gray-800 transition-all duration-200'>3 Likes</span>
                    
                </div>

                <Modal title='Likes' isOpen={isModalLikesOpen} closeModal={onCloseModalLikes} >
                    <div className='flex flex-col gap-4'>
                        <Like />
                        <Like />
                    </div>
                </Modal>
                <div  className='hover:text-gray-800 transition-all duration-200 cursor-pointer flex items-center  bg-opacity-30 p-2  gap-2 text-sm text-gray-500'>
                    <AnnotationIcon className=' h-5 w-5 '/>
                    <span onClick={onOpenModalComments}>2 Comments</span>
                </div>
                <Modal title='Comments' isOpen={isModalCommentsOpen} closeModal={onCloseModalComments} >
                    
                    <div className='flex flex-col gap-4'>
                        <Comment />
                        <Comment />
                    </div>
                </Modal>
            </div>  

            

            <div className='px-4'>
                <Textarea name="new-comment" inputClassName="resize-none 
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0" 
                    placeholder="Add a comment" 
                    rows={1}
                    button={
                       btnTextArea
                    }
                    />
               
            </div>
        </div>
       
    )
}