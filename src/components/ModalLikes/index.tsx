import { useEffect } from "react";
import useSWR from "swr";
import { ReactionWithUser } from "../../models";
import { fetcher } from "../../services/api";
import { Modal } from "../Modal"
import { Like } from "../Timeline/Post/Like";

interface ModalLikesProps {
    postId: string;
    isOpen: boolean;
    closeModal: () => void;
}


export const ModalLikes = ({postId, isOpen, closeModal}: ModalLikesProps) => {

    const { data, mutate } = useSWR<ReactionWithUser[]>(`/posts/${postId}/likes`, fetcher);

    useEffect(() => {
        if(isOpen){
            mutate();
        }
    }, [isOpen])

    return (
        <Modal title="Likes" showCloseButton isOpen={isOpen} closeModal={closeModal} className='max-w-screen-md p-4 h-1/2 min-h-[300px]' containerClassName="z-50" >
            <div className='flex flex-col gap-4 mt-4'>
                {data && data.map(like => {
                    return (
                        <Like key={`${like.postId}-${like.userId}`} {...like} />
                    )
                })}
            </div>
        </Modal>
    )
}