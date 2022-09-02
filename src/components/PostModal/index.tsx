import Image from "next/image";
import { Comment as CommentType, PostWithMedia, PostWithMediaAndComments } from "../../models";
import { Modal } from "../Modal";

import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { AnnotationIcon, HeartIcon } from "@heroicons/react/outline";
import { User } from "../../contexts/AuthContext";
import { Textarea } from "../Textarea";
import { ImagesCarousel } from "../ImagesCarousel";
import useSWR from "swr";
import { fetcher } from "../../services/api";
import { Comment } from "../Timeline/Post/Comment";
import { ModalLikes } from "../ModalLikes";
import { useDisclosure } from "@chakra-ui/hooks";

interface IPostModal extends PostWithMedia{
    author: User;
    comments: (CommentType & {author: User})[]
}

interface PostModalProps{
    post: PostWithMedia & {author: User};
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
   const { data } = useSWR<IPostModal>(`/posts/${post.id}?comments=true&medias=true&author=true`, fetcher)
   const {isOpen: isModalLikesOpen, onClose: closeModalLikes, onOpen: openModalLikes} = useDisclosure();

   if (!data){
         return <div>Loading...</div>
   }

   console.log('post', data);
    return(
        <Modal isOpen={isPostOpen} closeModal={closePost} containerClassName={'z-20'} className='h-modal max-w-7xl'>
                {post && 
                (
                    <div className='w-full h-full  grid grid-cols-2 '>
                        <div className="relative w-full max-w-2xl h-full overflow-hidden">
                            {data.medias.length > 1  && <ImagesCarousel images={post.medias.map(m => ({src: m.media_url}))}/>}
                            {data.medias.length === 1 &&  <Image className='' src={post.medias[0].media_url} layout='fill' objectFit='cover' />}
                           
                        </div>
                        <div className="w-full flex flex-col  ">
                            <div className='flex flex-col  border-b border-gray-100 '>
                                <div className='flex items-center p-4 gap-4'>
                                    <div className='relative w-12 h-12 '>
                                        <Image className='rounded-full'  src={data.author.avatar_url ?? '/eu.png'} layout='fill' objectFit='cover' alt={"Foto de perfil"}/>
                                    </div>
                                    <div className='flex flex-col   '>
                                        {data.author.name}
                                        <span className='text-xs w-full text-left'>@{data.author.profile_name}</span>
                                    </div>

                                  
                                </div>

                                <div className='p-4'>
                                    {post.caption}
                                </div>
                               
                            </div>
                            
                            <div className='flex-grow flex flex-col'>
                                <div className='p-4 flex-grow'>
                                    {data.comments.map(comment => (
                                        <Comment key={comment.id} {...comment}/>
                                    ))}
                                    {/* <div className='flex items-center  gap-2'>
                                        <div className='relative w-12 h-12 flex-shrink-0 '>
                                            <Image className='rounded-full'  src={post.author.avatar_url ?? '/eu.png'} layout='fill' objectFit='cover' alt={"Foto de perfil"}/>
                                        </div>
                                        <div>
                                            <span className='text-sm font-bold w-full text-left float-left'>@ruantmelo</span>
                                            <p className='text-sm'>lorem ipsum dolar amenet dasldasdasdeor,om  adomasodmasd ermoasdmoasd asdmoasmdoasdma asdmoasdmo</p>
                                        </div>
                                    </div>
                                   */}
                                </div>
                                <div className='border-t border-gray-100  p-4'>
                                    <div className='flex gap-4'>
                                        {/* <HeartIconSolid/> */}
                                        <div onClick={openModalLikes} className='cursor-pointer flex items-center gap-2'>
                                            <HeartIconSolid  className='text-green-600 relative h-8 w-8 transition-all hover:text-green-800  duration-200' aria-hidden="true" />
                                            <span>3 likes</span>
                                        </div>

                                        <ModalLikes isOpen={isModalLikesOpen} closeModal={closeModalLikes}  postId={data.id}/>

                                        <div className=' transition-all duration-200  flex items-center  bg-opacity-30 p-2  gap-2 text-sm text-gray-500'>
                                            <AnnotationIcon  className='h-8 w-8 ' aria-hidden="true" />
                                            <span>{data.comments.length} {data.comments.length === 1 ? 'comment' : 'comments'}</span>
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
