import { useDisclosure } from "@chakra-ui/hooks";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { AnnotationIcon, HeartIcon } from "@heroicons/react/outline";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { parseCookies } from "nookies";
import { useState } from "react";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Post } from "../components/Timeline/Post";
import { PostImage } from "../components/Timeline/PostImage";
import { User } from "../contexts/AuthContext";
import { useAuth } from "../hooks/useAuth";
import { Main } from "../layouts/Main";
import { PostWithMedia } from "../models";
import { getApiClient } from "../services/getApiClient";
import { Textarea } from "../components/Textarea";

export interface ProfileProps {
    user: (User & {posts: PostWithMedia[]}) | null;
    isOwner: boolean;
    follow: boolean;
}

export const Profile: NextPage<ProfileProps> = ({ user , isOwner, follow=false}: ProfileProps) => {

    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const selectedPost = user?.posts.find(post => post.id === selectedPostId);

    const {isOpen: isPostOpen, onOpen: openPost, onClose: closePost } = useDisclosure();

    const handleOpenPost = (id: string) => {
        setSelectedPostId(id);
        console.log('caralho')
        openPost();
    }
    if (!user){
        return(
            <Main>
                <div className="flex justify-center h-full items-center mt-4">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">User not found</h1>
                        {/* <p className="text-xl">Please log in to see your profile</p> */}
                    </div>
                </div>

            </Main>
        )
    }

    return (
         <Main>
            <div className='bg-white border-2 border-gray-100  p-6 max-w-4xl w-full  mx-auto sm:mt-4'>
                <div className='flex items-center border-b border-gray-200 pb-4'>
                    <div className='shrink-0 h-48 w-48  relative text-gray-400  '>
                      
                        <Image className='rounded-full w-full h-full' src='/eu.png' width={'200px'} height={'200px'} objectFit='cover' alt={"Foto de perfil"}/>
                    </div>
                    
                    <div className='w-full   flex flex-col gap-2 justify-center ml-4'>
                        <div className='flex justify-between items-center '>
                            <div className=" ">
                                <h3 className='text-2xl text-gray-800'>{user.name}</h3>
                                <span className='text-sm'>@{user.profile_name}</span>
                            </div>

                                {!follow && <Button className='mt-0'>Follow</Button> }
                                
                            
                        </div>
                       
                        <div>
                            <p>437 followers</p>
                        </div>

                        <div>
                            <p>Followed by park_tien, melissa_andrade and 3 others</p>
                        </div>
                       
                    </div>
                </div>

                <div className="grid grid-cols-3  justify-between gap-2 mt-4">
                   {user.posts.map(post => {
                          return (
                            <PostImage key={post.id} post={post} onClick = {handleOpenPost}/>
                          )
                   })}
                </div>
                
            </div>

            <PostModal isPostOpen={isPostOpen} closePost={closePost} post={selectedPost ? {...selectedPost, author: user} : undefined}/>
            
        </Main>  
    )
}

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

function PostModal({post, isPostOpen, closePost}: PostModalProps){
    console.log('post', post)
    return(
        <Modal isOpen={isPostOpen} closeModal={closePost} className='p-0 h-modal max-w-7xl'>
                {post && 
                (
                    <div className='w-full h-full  grid grid-cols-2 '>
                        <div className="relative w-full max-w-2xl h-full overflow-hidden">
                            <Image className='' src={post.medias[0].media_url} layout='fill' objectFit='cover' alt={"Foto de perfil"}/>
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
                                    <p>teste testeteste</p>
                                    <p>teste testeteste</p>
                                    <p>teste testeteste</p>
                                    <p>teste testeteste</p>
                                    <p>teste testeteste</p>
                                  
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

export default Profile;







export const getServerSideProps: GetServerSideProps<ProfileProps> = async (context) => {
    const api = await getApiClient(context);
    // const {'vinci:access_token': access_token } = parseCookies(context);

    const profile_name = (context.params as {profile_name: string}).profile_name;

    const {data} = await api.get<(ProfileProps['user'])>(`/users/${profile_name}`, {params: {
        posts: true
    }});

    if (!data){
        return {
            props: {
                user: null,
                isOwner: false,
                follow: false,
            }
        }
    }

    const user = data;

    const isOwner = user.profile_name === profile_name;

    return {
        props: {
            user: user,
            isOwner,
            follow: false
        }
    }
}