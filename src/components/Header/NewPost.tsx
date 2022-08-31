import { useDisclosure } from "@chakra-ui/hooks"
import { PlusIcon } from "@heroicons/react/solid"
import Image from "next/image";
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


    console.log('files', files);

   const handleClose = () => {
         formRef.current?.reset();
         closeModal();
   }

    const handlePost = async (data: Inputs) => {
        //TODO: Validar a quantidade de arquivos
        console.log('data', data,  new File([data.files[0]], data.files[0].name, {type: data.files[0].type}));

        const body = new FormData();

        Array(data.files.length).fill(0).forEach((_, index) => {
            const file = data.files.item(index)
            
            if (!file){
                return null;
            }

            body.append('files', file);
        })
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
            <Modal  isOpen={isOpen} title='New post' className="max-w-md" closeModal={handleClose} primaryAction='Save' secondaryAction="Close" onPrimaryAction={() => {
                // console.log('tste')
                handleSubmit(handlePost, (a) => console.log(a))();
                // console.log('caralho')   
            }}>
                <form  className='flex flex-col gap-4' ref={formRef}>
                    
                    {files && files.length > 0 && ( 
                        <div className='flex flex-col gap-2'>
                            {Array(1).fill(0).map((_, index) => (
                                (() => {
                                    const file = files.item(index);

                                    if (!file) {
                                        return null;
                                    }

                                    console.log('FILE AR', file)

                                    const fr = new FileReader();
                                    
                                    const element = document.getElementById(`image-${index}-${index}`);
                                    fr.onload = (e) => {
                                        const imageUrl = fr.result as string;
                                        console.log('IMAGEURL', imageUrl)
                                        element?.setAttribute('src', imageUrl);
                                    }

                                    fr.readAsDataURL(file);
                                    return (
                                        <div key={`image-${index}-${index}`} className='flex justify-center items-center w-48 h-48 overflow-hidden'>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img id={`image-${index}-${index}`} src={''} alt={file.name} className='object-contain'/>
                                        </div>
                                    )
                                }
                                )()
                            ))}
                        </div>
                        )
                    }


                    <Dropzone id='post-image' {...register('files')} labelClassName={`${files && files.length > 0 && 'hidden'}`}/>

                    {/* <label htmlFor='title' className='text-sm'>Title</label> */}
                    <Textarea label='Caption' className='resize-none' {...register('caption')}/>
                </form>

            </Modal>
        </>
       
    )
}