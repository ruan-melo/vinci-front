import { useState } from "react";
import useSWR, { mutate, useSWRConfig } from "swr";
import { Comment as CommentType, CommentWithAuthor } from "../../../models";
import { api, fetcher } from "../../../services/api";
import { Modal } from "../../Modal"
import { Comment } from "../Post/Comment"

interface ModalCommentsProps {
    postId: string;
    isOpen: boolean;
    closeModal: () => void;
}

export const ModalComments = ({postId, isOpen, closeModal}: ModalCommentsProps) => {
    const [comments, setComments] = useState<CommentWithAuthor[]>([]);
    const { data } = useSWR<CommentWithAuthor[]>(`/posts/${postId}/comments`, fetcher, {onSuccess: (data) => {
        console.log('PORRA', data)
        setComments(oldData => data);
    }});
    // const {mutate} = useSWRConfig();

   
    
    const handleRemoveComment = async (id: string) => {
        try{
            const response = await api.delete(`/posts/${postId}/comments/${id}`);
            setComments(oldData => oldData.filter(comment => comment.id !== id));
            // mutate(`/posts/${postId}/comments`);
        }catch(e){
            console.log(e)
        }
    
    }

    return( 
        <Modal showCloseButton title='Comments' isOpen={isOpen} closeModal={() => {
            mutate('/posts/timeline');
            closeModal();
            console.log('efchando comments')
        }} className='max-w-screen-md p-4 h-1/2 min-h-[300px]'> 
            <div className='flex flex-col gap-4 mt-4'>
            {comments.map((comment, index) => {
                return (
                    <Comment key={comment.id} {...comment} handleRemove={() => {handleRemoveComment(comment.id)}} />
                )
            })}
            </div>
        </Modal>
    )
}