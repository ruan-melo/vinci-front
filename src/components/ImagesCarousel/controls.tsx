import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'
import { ReactNode } from 'react'

const iconClassname = 'h-5 w-5 text-white'

const Control = ({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) => {
  return (
    <button
      type="button"
      className="absolute top-1/2 fit-content left-0 z-30 -translate-y-1/2 flex items-center justify-center  px-2 cursor-pointer group focus:outline-none"
      data-carousel-prev=""
    >
      <span
        className={`
            inline-flex items-center 
            justify-center 
            w-10 h-10 rounded-full
            bg-gray-600/70
            group-hover:bg-gray-900/70 
            group-focus:ring-white
            group-focus:outline-none
            transition-all 
            duration-200
            `}
      >
        {children}
        <span className="sr-only">{label}</span>
      </span>
    </button>
  )
}

// export const leftControl = (
//     <Control label='Previous'>
//         <ArrowLeftIcon className={iconClassname}/>
//     </Control>
// )

// export const rightControl = (
//     <Control label='Next'>
//         <ArrowRightIcon className={iconClassname}/>
//     </Control>

// )

export const leftControl = (
  <div
    // type="button"
    className="fit-content  z-30  flex items-center justify-center  px-2 cursor-pointer group focus:outline-none"
    data-carousel-prev=""
  >
    <span
      className={`
            inline-flex items-center 
            justify-center 
            w-10 h-10 rounded-full
            bg-gray-600/70
            group-hover:bg-gray-900/70 
            group-focus:ring-white
            group-focus:outline-none
            transition-all 
            duration-200
            `}
    >
      <ArrowLeftIcon className={iconClassname} />
      <span className="sr-only">Previous</span>
    </span>
  </div>
)

export const rightControl = (
  <div
    // type="button"
    className="fit-content z-30 flex items-center justify-center  cursor-pointer group focus:outline-none"
    // data-carousel-next=""
  >
    <span
      className={`
            inline-flex items-center 
            justify-center 
            w-10 h-10 rounded-full
            bg-gray-600/70
            group-hover:bg-gray-900/70 
            group-focus:ring-white
            group-focus:outline-none
            transition-all 
            duration-200
            `}
    >
      <ArrowRightIcon className={iconClassname} />
      <span className="sr-only">Next</span>
    </span>
  </div>
)
