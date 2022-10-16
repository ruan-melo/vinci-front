import { Carousel as CarouselFlowbite } from 'flowbite-react'
import NextImage from 'next/image'
import { leftControl, rightControl } from './controls'

interface Image {
  src: string
  alt?: string
}

interface CarouselProps {
  images: Image[]
}

export const ImagesCarousel = ({ images }: CarouselProps) => {
  return (
    <CarouselFlowbite
      leftControl={leftControl}
      rightControl={rightControl}
      slide={false}
    >
      {images.map((image, index) => (
        <div key={index} className="relative w-full h-full">
          <NextImage
            src={image.src}
            layout="fill"
            objectFit="cover"
            alt={image.alt}
          />
        </div>
      ))}
      {/* <div className='h-full'>
                <Image src='/eu.png' className='w-full' layout='fill' objectFit='cover' alt='2'/>
            </div>
            
           
            <div className='w-full'>
                    <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
            />
            </div> */}
    </CarouselFlowbite>
  )
}
