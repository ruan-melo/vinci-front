import { useDisclosure } from "@chakra-ui/hooks";

import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { parseCookies } from "nookies";
import { useState } from "react";
import { Button } from "../components/Button";
import { PostImage } from "../components/Timeline/PostImage";
import { User } from "../contexts/AuthContext";
import { Main } from "../layouts/Main";
import { PostWithMedia } from "../models";
import { getApiClient } from "../services/getApiClient";
import { PostModal } from "../components/PostModal";
import { CogIcon, PhotographIcon } from "@heroicons/react/solid";
import UserAvatar from '../assets/default-user.svg'
import { api } from "../services/api";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import { decode } from 'jsonwebtoken';


export interface ProfileProps {
    user: (User & {posts: PostWithMedia[]}) | null;
    isOwner: boolean;
    follow: boolean;
}

export const Profile: NextPage<ProfileProps> = ({ user , isOwner, follow=false}: ProfileProps) => {

    // const {user: loggedUser} = useAuth();

    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const selectedPost = user?.posts.find(post => post.id === selectedPostId);

    const [isFollowing, setIsFollowing] = useState(follow);
    const {isOpen: isPostOpen, onOpen: openPost, onClose: closePost } = useDisclosure(); 

    const handleOpenPost = (id: string) => {
        setSelectedPostId(id);
        openPost();
    }

    const handleFollow = async () => {
        try{
            const response = await api.post(`/users/${user?.profile_name}/follow`)
            setIsFollowing(true);
        } catch{
            //TODO: handle error
            console.log('error')
        }
       
    }

    const handleUnfollow = async () => {
        try{
            const response = await api.delete(`/users/${user?.profile_name}/follow`)
            setIsFollowing(false);
        } catch{
            console.log('error');
        }
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
                    <div className='shrink-0 h-48 w-48  relative  text-white bg-white fill-current '>
                        <Image className='rounded-full w-full h-full bg-gray-300 fill-current' src={user.avatar_url ?? UserAvatar} width={'200px'} height={'200px'} objectFit='cover' alt={"Foto de perfil"}/>
                    </div>
                    
                    <div className='w-full   flex flex-col gap-2 justify-center ml-4'>
                        <div className='flex justify-between items-center '>
                            <div className=" ">
                                <h3 className='text-2xl text-gray-800'>{user.name}</h3>
                                <span className='text-sm'>@{user.profile_name}</span>
                            </div>
                            
                            {isOwner && (
                                <Button variant='outline' className='text-gray-500 hover:text-gray-800'>
                                    <CogIcon className='h-6 w-6'/>
                                </Button>
                            )}
                            {!isOwner && !isFollowing && <Button onClick={handleFollow} className='mt-0'>Follow</Button> }
                            {!isOwner && isFollowing && <Button onClick={handleUnfollow} variant='outline' className='mt-0 text-gray-500 hover:text-gray-800'>Unfollow</Button> }
                        </div>
                       
                        <div>
                            <p>437 followers</p>
                        </div>

                        <div>
                            <p>Followed by park_tien, melissa_andrade and 3 others</p>
                        </div>
                       
                    </div>
                </div>

                {user.posts.length <= 0 && (
                    <div className='flex items-center justify-center mt-4 flex-col text-gray-400'>
                        <PhotographIcon className='h-8 w-8 '/>
                        <p className=''>No posts</p>
                    </div>
                )}

                {user.posts.length > 0 && (
                    <div className="grid grid-cols-3  justify-between gap-2 mt-4">
                        {user.posts.map(post => {
                            return (
                                <PostImage key={post.id} post={post} onClick = {handleOpenPost}/>
                            )
                        })}
                    </div>
                )}
                
            </div>

            <PostModal isPostOpen={isPostOpen} closePost={closePost} post={selectedPost ? {...selectedPost, author: user} : undefined}/>
            
        </Main>  
    )
}

export default Profile;

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (context) => {
    const api = await getApiClient(context);
    const {'vinci:access_token': access_token } = parseCookies(context);

    const profile_name = (context.params as {profile_name: string}).profile_name;

    const decoded = access_token ? decode(access_token) as {sub: string} : null;

    try{
        const { data } = await api.get<(ProfileProps['user'] & {follow: boolean})>(`/users/${profile_name}`, {params: {
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

        const {follow, ...user} = data;

        const isOwner = decoded
            ? decoded.sub === user.id
            : false;
            
    
        return {
            props: {
                user: user,
                isOwner,
                follow,
            }
        }
    } catch(err){
        console.log('error', err)

        return {
            props: {
                user: null,
                isOwner: false,
                follow: false,
            }
        }
    }
    
}