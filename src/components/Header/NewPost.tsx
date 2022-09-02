import { useDisclosure } from "@chakra-ui/hooks"
import { PlusIcon } from "@heroicons/react/solid"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { Button } from "../Button";
import { Dropzone } from "../Dropzone";
import { ImagesCarousel } from "../ImagesCarousel";
import { Modal, ModalFooter } from "../Modal"
import { Textarea } from "../Textarea";

interface Inputs{
    caption: string;
    files: FileList;
}

export const NewPost = () => {
    const {isOpen, onClose: closeModal, onOpen: openModal} = useDisclosure();
    const {register, handleSubmit, watch, reset, resetField} = useForm<Inputs>();
    const formRef = useRef<HTMLFormElement>(null);

    const [teste, setTeste] = useState('cara');
    
    const files = watch('files');

    const { images, isLoadingImages } = useImageLoader(files);

    const handleClose = () => {
            reset();
            closeModal();
    }

    const handlePost = async (data: Inputs) => {
        //TODO: Validar a quantidade de arquivos
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

        const response = await api.post('/posts', body);
    } 
    const handleClearImages = () => {
        resetField('files');
    }

    const imagesValueRef = useRef<[]>([]); 

    return(
        <>
            <button onClick = {openModal} className = 'text-green-600  rounded-sm p-2  transition-all duration-200 ml-6 flex text-center items-center justify-center'>
                <PlusIcon className="h-5 w-5 " />
                <span className='inline'>New post</span>
            </button>
            <Modal  isOpen={isOpen} title='New post' className="max-w-screen-lg max-h-screen p-6 transition-all duration-300" closeModal={handleClose}>
                <>
                    <form  className='flex flex-col gap-4 mt-4' ref={formRef}>
                        
                        {files && files.length > 0 && ( 
                            <div className='flex flex-col gap-2'>
                                {isLoadingImages && <div className='inline-flex items-center justify-center h-20 w-full bg-gray-200 animate-pulse'>
                                        Loading images...
                                    </div>}
                                {images.length === 1 && (
                                    <div key={`image-${0}-${images[0].name}`} className='relative mx-auto flex justify-center items-center h-[450px] w-[350px] overflow-hidden'>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <Image  src={images[0].src} alt={images[0].name} layout='fill' objectFit="contain"/>
                                    </div>
                                )}  
                                {images && images.length > 1 && (
                                    <div className='h-[450px] w-[350px] mx-auto'>
                                        <ImagesCarousel images={images}/>
                                    </div>
                                )}
                            </div>
                            )
                        }
                        
                        {files && !!files.length && (
                            <div className='fit-content mx-auto'>
                                <Button onClick={handleClearImages} type='button' variant='outline' className='mt-0 text-gray-500 hover:text-red-800'>
                                    Clear images
                                </Button>
                            </div>
                        
                        ) }

                        <div className={`h-56 ${files && files.length > 0 && 'hidden'}`}>
                            <Dropzone id='post-image' {...register('files')} />
                        </div>
                        

                        {/* <label htmlFor='title' className='text-sm'>Title</label> */}
                        <Textarea 
                        
                        onClick={() => {
                            setTeste('peste')
                        }}
                            label='Caption' 
                            inputClassName="
                            resize-none 
                            transition-all
                            
                            duration-300
                            bg-gray-100
                            
                            rounded-none
                            focus:ring-0
                            focus:bg-gray-200
                            px-4
                            " 
                            {...register('caption')}
                        />
                    </form>
                   <ModalFooter>
                        <Button variant="outline" onClick={handleClose}>Close</Button>
                        <Button 
                        onClick={() => {
                            handleSubmit(handlePost, (a) => console.log(a))();
                        }}
                        className='rounded-sm'
                        >Save</Button>
                   </ModalFooter>
                </>
            </Modal>
        </>
       
    )
}


function useImageLoader(files: FileList | undefined) {
    const [isLoadingImages, setIsLoadingImages] = useState(true);
    const imagesValueRef = useRef<{src: string, name: string}[]>([]); 
    const [images, setImages] = useState<{src: string, name: string}[]>([]);


    const handleImagesStartedLoading = () => {
        setIsLoadingImages(true);
    }

    const handleImagesLoaded = () => {
        setIsLoadingImages(false);
    }

    const handleLoadImages = async (images: FileList) => {
        handleImagesStartedLoading();
        
        try{
            await Promise.all( Array(images.length).fill(0).map((_, index) => {
                const file = images.item(index);
            
                if (!file) {
                    return null;
                }
    
               
            
                return new Promise((resolve, reject) => {
                    const fr = new FileReader();
                    // reject();
                    fr.onload = (e) => {
                        const imageUrl = fr.result as string;
                        imagesValueRef.current[index] = {src: imageUrl, name: file.name};
                        
                        resolve(file.name);
                    }
    
                    fr.onerror = (e) => {
                        reject(e);
                    }
                    fr.readAsDataURL(file);
                })
            }))
           
        } catch(e){
            console.log('ERRO DO USEIMAGELOADER', e);
        }

        handleImagesLoaded();
        setImages(imagesValueRef.current);     
    }

    useEffect(() => {
        if (files){
            handleLoadImages(files || new FileList());
        }else{
            setImages(oldState => []);
            imagesValueRef.current = [];
        }
    }, [files])

    

    return {
        isLoadingImages,
        imagesValueRef,
        handleImagesStartedLoading,
        handleImagesLoaded,
        handleLoadImages,
        images
    }
}