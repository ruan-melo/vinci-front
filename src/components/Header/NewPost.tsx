import { useDisclosure } from "@chakra-ui/hooks"
import { PlusIcon } from "@heroicons/react/solid"
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { Dropzone } from "../Dropzone";
import { Modal } from "../Modal"
import { Textarea } from "../Textarea";

interface Inputs{
    caption: string;
    files: FileList;
}

export const NewPost = () => {
    const {isOpen, onClose: closeModal, onOpen: openModal} = useDisclosure();
    const {register, handleSubmit, watch} = useForm<Inputs>();
    const formRef = useRef<HTMLFormElement>(null);

    const files = watch('files');

   

    const handlePost = async (data: Inputs) => {
        //TODO: Validar a quantidade de arquivos
        console.log('data', data,  new File([data.files[0]], data.files[0].name, {type: data.files[0].type}));

        const body = new FormData();

        body.append('files', new File([data.files[0]], data.files[0].name, {type: data.files[0].type}));
        body.append('files', new File([data.files[1]], data.files[1].name, {type: data.files[1].type}));
        body.append('caption', data.caption);
        // body.append('medias',  JSON.stringify([{position: 0, mediaName: data.files[0].name}, {position: 1, mediaName: data.files[1].name}]));

        console.log('body', body)
        const response = await api.post('/posts', body);
    } 

    return(
        <>
            <button onClick = {openModal} className = 'text-green-600  rounded-sm p-2  transition-all duration-200 ml-6 flex text-center items-center justify-center'>
                <PlusIcon className="h-5 w-5 " />
                <span className='inline'>New post</span>
            </button>
            <Modal  isOpen={isOpen} title='New post' className="max-w-md" closeModal={closeModal} primaryAction='Save' secondaryAction="Close" onPrimaryAction={() => {
                // console.log('tste')
                handleSubmit(handlePost, (a) => console.log(a))();
                // console.log('caralho')
            }}>
                <form  className='flex flex-col gap-4' ref={formRef}>
            
                    <Dropzone id='post-image' {...register('files')}/>

                    {/* <label htmlFor='title' className='text-sm'>Title</label> */}
                    <Textarea label='Caption' className='resize-none' {...register('caption')}/>
                </form>

            </Modal>
        </>
       
    )
}