import { useDisclosure } from '@chakra-ui/hooks'
import { PlusIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useImageLoader } from '../../hooks/useImageLoader'
import { api } from '../../services/api'
import { Button } from '../Button'
import { Dropzone } from '../Dropzone'
import { ImagesCarousel } from '../ImagesCarousel'
import { Modal, ModalFooter } from '../Modal'
import { Textarea } from '../Textarea'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
interface Inputs {
  caption: string
  files: File[]
}

const schema = yup
  .object({
    caption: yup.string().trim().max(2200),
    // password_confirmation: yup
    //   .string()
    //   .oneOf([null, yup.ref('password')], 'Passwords must match'),
  })
  .required()

export const NewPost = () => {
  const { isOpen, onClose: closeModal, onOpen: openModal } = useDisclosure()
  const { register, handleSubmit, watch, reset, resetField, control } =
    useForm<Inputs>()
  const formRef = useRef<HTMLFormElement>(null)

  const files = watch('files')

  const { images, isLoadingImages } = useImageLoader(files)

  const handleClose = () => {
    reset()
    closeModal()
  }

  const handlePost = async (data: Inputs) => {
    // TODO: Validar a quantidade de arquivos
    const body = new FormData()

    Array(data.files.length)
      .fill(0)
      .forEach((_, index) => {
        const file = data.files[index]

        if (!file) {
          return null
        }

        body.append('files', file)
      })
    body.append('caption', data.caption)
    // body.append('medias',  JSON.stringify([{position: 0, mediaName: data.files[0].name}, {position: 1, mediaName: data.files[1].name}]));

    const response = await api.post('/posts', body)
  }
  const handleClearImages = () => {
    resetField('files')
  }

  const imagesValueRef = useRef<[]>([])

  return (
    <>
      <button
        onClick={openModal}
        className="text-green-600  rounded-sm p-2  transition-all duration-200 ml-6 flex text-center items-center justify-center"
      >
        <PlusIcon className="h-5 w-5 " />
        <span className="inline">New post</span>
      </button>
      <Modal
        isOpen={isOpen}
        title="New post"
        className="max-w-screen-lg max-h-screen p-6 transition-all duration-300"
        closeModal={handleClose}
      >
        <>
          <form className="flex flex-col gap-4 mt-4" ref={formRef}>
            {files && files.length > 0 && (
              <div className="flex flex-col gap-2">
                {isLoadingImages && (
                  <div className="inline-flex items-center justify-center h-20 w-full bg-gray-200 animate-pulse">
                    Loading images...
                  </div>
                )}
                {images.length === 1 && (
                  <div
                    key={`image-${0}-${images[0].name}`}
                    className="relative mx-auto flex justify-center items-center h-[450px] w-[350px] overflow-hidden"
                  >
                    <Image
                      src={images[0].src}
                      alt={images[0].name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                )}
                {images && images.length > 1 && (
                  <div className="h-[450px] w-[350px] mx-auto">
                    <ImagesCarousel images={images} />
                  </div>
                )}
              </div>
            )}

            {files && !!files.length && (
              <div className="fit-content mx-auto">
                <Button
                  onClick={handleClearImages}
                  type="button"
                  variant="outline"
                  className="mt-0 text-gray-500 hover:text-red-800"
                >
                  Clear images
                </Button>
              </div>
            )}

            <div className={`h-56 ${files && files.length > 0 && 'hidden'}`}>
              {/* Using Controller is better to work with complex components  */}
              <Controller
                name="files"
                control={control}
                render={({ field: { onChange } }) => {
                  return (
                    <Dropzone
                      id="post-image"
                      onChange={onChange}
                      name={'name'}
                      // onBlur={onBlur}
                      // ref={ref}
                      // ! MELHORAR MENSAGEM DE ERRO, NEM SEMPRE VAI SER FORMATO DE ARQUIVO INVÁLIDO
                      onDropRejected={(files) => {
                        toast(
                          `Formato de arquivos inválidos: ${files
                            .map((f) => f.file.name)
                            .join(', ')}`,
                        )
                      }}
                      options={{
                        maxFiles: 5,
                      }}
                      accept={{
                        'image/png': ['.png'],
                        'image/bmp': ['.bmp'],
                        'image/jpeg': ['.jpeg', '.jpg'],
                      }}
                    />
                    //  {/*(jpeg|png|jpg|bmp)*/}
                  )
                }}
              />
            </div>

            {/* <label htmlFor='title' className='text-sm'>Title</label> */}
            <Textarea
              label="Caption"
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
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleSubmit(handlePost, (a) => console.log(a))()
              }}
              className="rounded-sm"
            >
              Save
            </Button>
          </ModalFooter>
        </>
      </Modal>
    </>
  )
}
