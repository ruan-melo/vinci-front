import { useState, useRef, useEffect } from 'react'

export function useImageLoader(files: File[] | undefined) {
  const [isLoadingImages, setIsLoadingImages] = useState(true)
  const imagesValueRef = useRef<{ src: string; name: string }[]>([])
  const [images, setImages] = useState<{ src: string; name: string }[]>([])

  const handleImagesStartedLoading = () => {
    setIsLoadingImages(true)
  }

  const handleImagesLoaded = () => {
    setIsLoadingImages(false)
  }

  const handleLoadImages = async (images: File[]) => {
    handleImagesStartedLoading()

    try {
      await Promise.all(
        Array(images.length)
          .fill(0)
          .map((_, index) => {
            const file = images[index]

            if (!file) {
              return null
            }

            return new Promise((resolve, reject) => {
              const fr = new FileReader()
              // reject();
              fr.onload = (e) => {
                const imageUrl = fr.result as string
                imagesValueRef.current[index] = {
                  src: imageUrl,
                  name: file.name,
                }

                resolve(file.name)
              }

              fr.onerror = (e) => {
                reject(e)
              }
              fr.readAsDataURL(file)
            })
          }),
      )
    } catch (e) {
      console.log('ERRO DO USEIMAGELOADER', e)
    }

    handleImagesLoaded()
    setImages(imagesValueRef.current)
  }

  useEffect(() => {
    if (files) {
      handleLoadImages(files || [])
    } else {
      setImages((oldState) => [])
      imagesValueRef.current = []
    }
  }, [files])

  return {
    isLoadingImages,
    imagesValueRef,
    handleImagesStartedLoading,
    handleImagesLoaded,
    handleLoadImages,
    images,
  }
}
