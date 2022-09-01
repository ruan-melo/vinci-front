import Image from "next/image";
import { PostWithMedia } from "../../models";
import { Modal } from "../Modal";

import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { AnnotationIcon, HeartIcon } from "@heroicons/react/outline";
import { User } from "../../contexts/AuthContext";
import { Textarea } from "../Textarea";
import { ImagesCarousel } from "../ImagesCarousel";

interface PostModalProps{
    post?: PostWithMedia & {author: User};
    isPostOpen: boolean;
    closePost: () => void;
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


export function PostModal({post, isPostOpen, closePost}: PostModalProps){
   
    return(
        <Modal isOpen={isPostOpen} closeModal={closePost} className='h-modal max-w-7xl'>
                {post && 
                (
                    <div className='w-full h-full  grid grid-cols-2 '>
                        <div className="relative w-full max-w-2xl h-full overflow-hidden">
                            {post.medias.length > 1  && <ImagesCarousel images={post.medias.map(m => ({src: m.media_url}))}/>}
                            {post.medias.length === 1 &&  <Image className='' src={post.medias[0].media_url} layout='fill' objectFit='cover' />}
                           
                        </div>
                        <div className="w-full flex flex-col  ">
                            <div className='flex flex-col  border-b border-gray-100 '>
                                <div className='flex items-center p-4 gap-4'>
                                    <div className='relative w-12 h-12 '>
                                        <Image className='rounded-full'  src={post.author.avatar_url ?? '/eu.png'} layout='fill' objectFit='cover' alt={"Foto de perfil"}/>
                                    </div>
                                    <div className='flex flex-col   '>
                                        Ruan Tenório de Melo
                                        <span className='text-xs w-full text-left'>@ruantmelo</span>
                                    </div>

                                  
                                </div>

                                <div className='p-4'>
                                    {post.caption}
                                </div>
                               
                            </div>
                            
                            <div className='flex-grow flex flex-col'>
                                <div className='p-4 flex-grow'>
                                    <div className='flex items-center  gap-2'>
                                        <div className='relative w-12 h-12 flex-shrink-0 '>
                                            <Image className='rounded-full'  src={post.author.avatar_url ?? '/eu.png'} layout='fill' objectFit='cover' alt={"Foto de perfil"}/>
                                        </div>
                                        <div>
                                            <span className='text-sm font-bold w-full text-left float-left'>@ruantmelo</span>
                                            <p className='text-sm'>lorem ipsum dolar amenet dasldasdasdeor,om  adomasodmasd ermoasdmoasd asdmoasmdoasdma asdmoasdmo</p>
                                        </div>
                                    </div>
                                  
                                </div>
                                <div className='border-t border-gray-100  p-4'>
                                    <div className='flex gap-4'>
                                        {/* <HeartIconSolid/> */}
                                        <div className='flex items-center gap-2'>
                                            <HeartIconSolid  className='text-green-600 relative h-8 w-8 transition-all hover:text-green-800  duration-200' aria-hidden="true" />
                                            <span>3 likes</span>
                                        </div>

                                        <div className='hover:text-gray-800 transition-all duration-200 cursor-pointer flex items-center  bg-opacity-30 p-2  gap-2 text-sm text-gray-500'>
                                            <AnnotationIcon  className='h-8 w-8 ' aria-hidden="true" />
                                            <span>3 likes</span>
                                        </div>

                                                         
                                    </div>
                                    <div className=''>
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

                            </div>
                           
                        </div>
                    </div>
                ) }
               
        </Modal>
    )
}
