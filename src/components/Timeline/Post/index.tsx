import { AnnotationIcon, HeartIcon } from "@heroicons/react/outline"
import { AnnotationIcon as AnnotationIconSolid, HeartIcon as HeartIconSolid } from "@heroicons/react/solid"
import Image from "next/image"
import { createRef, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "../../Modal";
import { Textarea } from "../../Textarea";
import { useDisclosure } from "@chakra-ui/hooks"
import { Comment } from "./Comment";
import { Like } from "./Like";
import { PostTimeline, PostWithMedia, PostWithMediaAndAuthor } from "../../../models";
import UserAvatar from '../../../assets/default-user.svg'
import { ImagesCarousel } from "../../ImagesCarousel";
import { api, fetcher } from "../../../services/api";
import useSWR from "swr";
import { ModalComments } from "../ModalComments";
import { ModalLikes } from "../../ModalLikes";

export interface PostProps extends PostTimeline {}

const btnTextArea =  {
    label: "Send",
    name: "send-button",
    children: (
        <button type='submit' className = 'py-2 pr-4 text-green-600 text-sm rounded-r-md'>
            Post
        </button>
    )
}

export const Post = ({caption, author, medias, id, comments_count: commentsCountProps, liked: likedProp, likes_count: likesCountProps}: PostProps) => {
    const { isOpen: isModalCommentsOpen, onOpen: onOpenModalComments, onClose: onCloseModalComments } = useDisclosure()
    const { isOpen: isModalLikesOpen, onOpen: onOpenModalLikes, onClose: onCloseModalLikes} = useDisclosure()

    const [liked, setLiked] = useState(likedProp)
    const [likesCount, setLikesCount] = useState(likesCountProps)
    const [commentsCount, setCommentsCount] = useState(commentsCountProps)
    
    const handleLike = async () =>  {
        try{
            const response = await api.post(`/posts/${id}/likes`);
            setLikesCount(oldState => oldState + 1);
            setLiked(true);
        }catch(err){
            console.log(err);
        }
        
    }

    const handleRemoveLike  = async () => {
        try{
            const response = await api.delete(`/posts/${id}/likes`);
            setLikesCount(oldState => oldState - 1);
            setLiked(false);
        }catch(err){
            console.log(err);
        }
    }


    const handleRemoveComment = async () => {
        try{
            const response = await api.delete(`/posts/${id}/comments`);
            setCommentsCount(oldState => oldState - 1);
        } catch(err){
            console.log(err);
        }
    }


    const handleCreateComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const textElement = (e.target as any)['new-comment'] as HTMLTextAreaElement;
        const text = textElement.value.trim();


        if (text.length === 0) return;
        
        try{
            await api.post(`/posts/${id}/comments` , {text} );
            setCommentsCount(oldState => oldState + 1);
            textElement.value = '';
        }catch(e){
            //TODO: Tratar erro
            console.log(e)
        }
    }

    
    

    return (
        <div className='flex flex-col w-full h-full'>
            <div className='relative p-0 w-[450px] h-[550px]'>
                {medias.length > 1 && <ImagesCarousel images={medias.map(m => ({src: m.media_url}))}/>}
                {medias.length === 1 && <Image src={medias[0].media_url} layout='fill' objectFit='cover' alt={"Foto de perfil"}/>}
                {/* <Image className='' src={medias[0].media_url} alt='post' width='450px' height='550px' objectFit="cover"  />        */}
            </div>

            <div className='box-border border-none px-4 py-2 bg-opacity-40 flex flex-col gap-2 max-w-full text-gray-700'>
                <div className='flex gap-4 items-center overflow-'>
                    <div className='w-10 h-10 rounded-full overflow-hidden'>
                        <Image className='bg-gray-300 fill-current' src={author.avatar_url ?? UserAvatar} width={'50px'} height={'50px'} objectFit='cover' alt={"Foto de perfil"}/>
                    </div>
                    <div className='flex flex-col '>
                        {author.name}
                        <span className='text-xs w-full text-left'>@{author.profile_name}</span>
                    </div>
                </div>
                
                {caption ? <p className='max-w-full break-all text-sm '>{caption}</p> : null}
        
            </div>    
            <div className='flex items-center px-2   gap-4'>
                <div  className='cursor-pointer flex items-center  bg-opacity-30 p-2  gap-2 text-sm text-gray-500'>
                    <div className='relative'>
                        <div onClick={handleRemoveLike}  className={`group ${!liked? 'hidden' :  ''}`}>
                            {/* <HeartIconSolid className={`absolute h-5 w-5 text-red-300 transition-all duration-200`} aria-hidden="true" /> */}
                            <svg className="absolute bottom-0  h-5 w-5 text-red-300 transition-all duration-200" fill={'currentColor'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                {/*! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                                <path d="M119.4 44.1c23.3-3.9 46.8-1.9 68.6 5.3l49.8 77.5-75.4 75.4c-1.5 1.5-2.4 3.6-2.3 5.8s1 4.2 2.6 5.7l112 104c2.9 2.7 7.4 2.9 10.5 .3s3.8-7 1.7-10.4l-60.4-98.1 90.7-75.6c2.6-2.1 3.5-5.7 2.4-8.8L296.8 61.8c28.5-16.7 62.4-23.2 95.7-17.6C461.5 55.6 512 115.2 512 185.1v5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.6 300.4C17.2 272.1 0 232.4 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141z" />
                            </svg>

                           
                            <svg fill={'currentColor'} className='group-hover:opacity-0 relative h-5 w-5 text-green-600 transition-all duration-200 hover:text-green-800' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            {/*! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                            </svg>
                            {/* <HeartIconSolid className='group-hover:opacity-0 relative h-5 w-5 text-green-600 transition-all duration-200 hover:text-green-800' aria-hidden="true" /> */}
                        </div>

                        <div onClick = {handleLike} className={`group ${liked? 'hidden' :  ''}`}>
                            {/* <HeartIconSolid className={`absolute h-5 w-5 text-transparent group-hover:text-green-600/70 transition-all duration-200 hover:text-green-800`} /> */}
                            <svg fill={'currentColor'} className={'absolute h-5 w-5 text-transparent group-hover:text-green-600/70 transition-all duration-200 hover:text-green-800'}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            {/*! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                            </svg>

                            <svg fill={'currentColor'}  className='group-hover:text-transparent relative h-5 w-5 text-gray-600 transition-all  duration-200' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            {/*! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                                <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
                            </svg>


                            {/* <HeartIcon className='group-hover:text-transparent relative h-5 w-5 text-gray-600 transition-all   duration-200' aria-hidden="true" /> */}
                        </div>  
                        
                        
                    </div>
                        
                  
                    
                    <span onClick={onOpenModalLikes} className='hover:text-gray-800 transition-all duration-200'>3 Likes</span>
                    
                </div>

                <ModalLikes postId={id} isOpen={isModalLikesOpen}  closeModal={onCloseModalLikes} />
                    
                <div  className='hover:text-gray-800 transition-all duration-200 cursor-pointer flex items-center  bg-opacity-30 p-2  gap-2 text-sm text-gray-500'>
                    <AnnotationIcon className=' h-5 w-5 '/>
                    <span onClick={onOpenModalComments}>{commentsCount} Comments</span>
                </div>

                <ModalComments postId={id} isOpen={isModalCommentsOpen} closeModal={onCloseModalComments}/>
               
            </div>  

            

            <form className='' onSubmit={(e) => {
                handleCreateComment(e)
            }}>
                <Textarea name="new-comment" 
                    inputClassName="resize-none 
                    transition-all
                    
                    duration-300
                    bg-gray-100
                    
                    rounded-none
                    focus:ring-0
                    focus:bg-gray-200
                    " 
                    placeholder="Add a comment" 
                    rows={1}
                    button={
                       btnTextArea
                    }
                    icon={
                        <AnnotationIcon className=' h-5 w-5 text-gray-400 '/>
                    }
                    />
               
            </form>
        </div>
       
    )
}