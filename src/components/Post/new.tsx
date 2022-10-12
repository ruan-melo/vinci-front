// import { useDisclosure } from '@chakra-ui/hooks'
// import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
// import { AnnotationIcon, HeartIcon } from '@heroicons/react/outline'
// import { Textarea } from '../Textarea'
// import Image from 'next/image'

// import post from '../../pages/post/[postId]'
// import { ImagesCarousel } from '../ImagesCarousel'
// import { ModalLikes } from '../ModalLikes'
// import UserAvatar from '../../assets/default-user.svg'
// import { Comment } from '../Timeline/Post/Comment'
// import { Avatar } from '../Avatar'
// import { PostOptions } from '../Timeline/Post/PostOptions'
// import { FormEvent, useEffect, useState } from 'react'
// import { useAuth } from '../../hooks/useAuth'
// import { LikeHeart } from '../LikeHeart'
// import { Post as PostModel } from '../../models/post'
// import Router from 'next/router'
// import { Media as MediaModel } from '../../models/media'
// import { CommentModel } from '../../models/comment'
// import { User as UserModel } from '../../models/user'
// import { client } from '../../services/apolloClient'
// import {
//   CREATE_COMMENT,
//   LIKE_POST,
//   REMOVE_LIKE,
//   DELETE_COMMENT,
//   GET_POST,
// } from '../../services/queries'
// import { useQuery } from '@apollo/client'

// // export interface PostProps extends Required<Pick<PostModel, 'id' | 'caption'>> {
// //   author: Required<Pick<UserModel, 'avatar' | 'id' | 'profile_name' | 'name'>>
// //   liked: boolean
// //   likesCount: number
// //   commentsCount: number
// //   medias: Required<MediaModel>[]
// //   comments: (Required<CommentModel> & {
// //     author: Required<Pick<UserModel, 'avatar' | 'id' | 'name' | 'profile_name'>>
// //   })[]
// // }

// export interface PostProps{
//   id: string
// }

// const btnTextArea = {
//   label: 'Send',
//   name: 'send-button',
//   children: (
//     <button
//       type="submit"
//       className="py-2 pr-4 text-green-600 text-sm rounded-r-md"
//     >
//       Post
//     </button>
//   ),
// }

// export interface PostResponse {
//   post: Required<Pick<PostModel, 'id' | 'caption'>> & {
//     medias: Required<MediaModel>[]
//     author: Required<Pick<UserModel, 'avatar' | 'id' | 'name' | 'profile_name'>>
//     liked: boolean
//     likesCount: number
//     commentsCount: number
//     comments: (Required<CommentModel> & {
//       author: Required<
//         Pick<UserModel, 'avatar' | 'id' | 'name' | 'profile_name'>
//       >
//     })[]
//   }
// }

// export const Post = ({

//   id,

// }: PostProps) => {
//   const {
//     isOpen: isModalLikesOpen,
//     onClose: closeModalLikes,
//     onOpen: openModalLikes,
//   } = useDisclosure()

//   const { user } = useAuth()
//   const { data, loading, refetch,updateQuery } = useQuery<PostResponse>(GET_POST, {
//     variables: {
//       id,
//     },
//   })

//   // useEffect(() => {
//   //   if (isPostOpen) {
//   //     refetch({
//   //       id: post.id,
//   //     })
//   //   }
//   // }, [post.id, refetch])

//   if (loading) {
//     return <div>Loading...</div>
//   }
//   // const [comments, setComments] = useState(commentsProp)
//   // const [liked, setLiked] = useState(likedProp)
//   // const [likesCount, setLikesCount] = useState(likesCountProps)
//   // const [commentsCount, setCommentsCount] = useState(commentsCountProps)

//   const handleCreateComment = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const textElement = (e.target as any)['new-comment'] as HTMLTextAreaElement
//     const text = textElement.value.trim()

//     if (text.length === 0) return

//     try {
//       const response = await client.mutate({
//         mutation: CREATE_COMMENT,
//         variables: {
//           postId: id,
//           text,
//         },
//       })
//       // setComments((oldState) => [
//       //   ...oldState,
//       //   { ...response.data, author: user },
//       // ])
//       // setCommentsCount((oldState) => oldState + 1)
//       textElement.value = ''
//     } catch (e) {
//       // TODO: Tratar erro
//       console.log(e)
//     }
//   }

//   const handleDeleteComment = async (commentId: string) => {
//     try {
//       const response = await client.mutate({
//         mutation: DELETE_COMMENT,
//         variables: {
//           commentId,
//         },
//       })

//       // setComments((oldData) =>
//       //   oldData.filter((comment) => comment.id !== commentId),
//       // )
//       // setCommentsCount((oldData) => oldData - 1)
//       // mutate(`/posts/${postId}/comments`);
//     } catch (e) {
//       console.log(e)
//     }
//   }

//   const handleLike = async () => {
//     try {
//       const response = await client.mutate({
//         mutation: LIKE_POST,
//         variables: {
//           postId: id,
//         },
//       })
//       // setLikesCount((oldState) => oldState + 1)
//       // setLiked(true)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const handleRemoveLike = async () => {
//     try {
//       const response = await client.mutate({
//         mutation: REMOVE_LIKE,
//         variables: {
//           postId: id,
//         },
//       })
//       // setLikesCount((oldState) => oldState - 1)
//       // setLiked(false)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const onPostDelete = async () => {
//     await Router.replace(`/${user?.profile_name}`)
//     Router.reload()
//   }

//   if (loading) return <div>Loading...</div>

//   return (
//     <div className="w-full h-full  grid grid-cols-2 ">
//       <div className="relative w-full max-w-2xl h-full overflow-hidden">
//         {medias.length > 1 && (
//           <ImagesCarousel images={medias.map((m) => ({ src: m.media_url }))} />
//         )}
//         {medias.length === 1 && (
//           <Image src={medias[0].media_url} layout="fill" objectFit="cover" />
//         )}
//       </div>
//       <div className="w-full flex flex-col  ">
//         <div className="flex flex-col  border-b border-gray-100 ">
//           <div className="flex items-center p-4 gap-4">
//             <Avatar
//               className="w-12 h-12"
//               name={author.name}
//               avatar={author.avatar}
//             />

//             <div className="flex flex-col   ">
//               {author.name}
//               <span className="text-xs w-full text-left">
//                 @{author.profile_name}
//               </span>
//             </div>

//             <div className="ml-auto">
//               <PostOptions onDelete={onPostDelete} postId={id} />
//             </div>
//           </div>

//           <div className="p-4">{caption}</div>
//         </div>

//         <div className="flex-grow flex flex-col">
//           <div className="flex flex-col gap-4 p-4 flex-grow">
//             {comments.map((comment) => (
//               <Comment
//                 handleDelete={() => handleDeleteComment(comment.id)}
//                 key={comment.id}
//                 {...comment}
//               />
//             ))}
//             {/* <div className='flex items-center  gap-2'>
//                                       <div className='relative w-12 h-12 flex-shrink-0 '>
//                                           <Image className='rounded-full'  src={post.author.avatar_url ?? '/eu.png'} layout='fill' objectFit='cover' alt={"Foto de perfil"}/>
//                                       </div>
//                                       <div>
//                                           <span className='text-sm font-bold w-full text-left float-left'>@ruantmelo</span>
//                                           <p className='text-sm'>lorem ipsum dolar amenet dasldasdasdeor,om  adomasodmasd ermoasdmoasd asdmoasmdoasdma asdmoasdmo</p>
//                                       </div>
//                                   </div>
//                                  */}
//           </div>
//           <div className="border-t border-gray-100  p-4">
//             <div className="flex gap-4">
//               {/* <HeartIconSolid/> */}
//               <div className="flex items-center gap-2">
//                 <LikeHeart
//                   className="w-8 h-8 cursor-pointer"
//                   handleLike={handleLike}
//                   handleRemoveLike={handleRemoveLike}
//                   liked={liked}
//                 />
//                 <span
//                   className={`${
//                     likesCount === 0
//                       ? 'pointer-events-none cursor-default'
//                       : 'cursor-pointer'
//                   }`}
//                   onClick={openModalLikes}
//                 >
//                   {likesCount} {commentsCount === 1 ? 'like' : 'likes'}
//                 </span>
//               </div>

//               <ModalLikes
//                 isOpen={isModalLikesOpen}
//                 closeModal={closeModalLikes}
//                 postId={id}
//               />

//               <div className=" transition-all duration-200  flex items-center  bg-opacity-30 p-2  gap-2 text-sm text-gray-500">
//                 <AnnotationIcon className="h-8 w-8 " aria-hidden="true" />
//                 <span>
//                   {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
//                 </span>
//               </div>
//             </div>
//             <form onSubmit={(e) => handleCreateComment(e)} className="">
//               <Textarea
//                 name="new-comment"
//                 inputClassName="resize-none
//                                           bg-gray-100
//                                           border-transparent
//                                           focus:border-gray-500 focus:bg-white focus:ring-0"
//                 placeholder="Add a comment"
//                 rows={1}
//                 button={btnTextArea}
//               />
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
