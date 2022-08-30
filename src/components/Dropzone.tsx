import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { ForwardedRef, forwardRef, useState } from "react";

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    name: string;
    labelClassName?: string;
}


// eslint-disable-next-line react/display-name
export const Dropzone = forwardRef(({id, labelClassName, ...rest}: DropzoneProps, ref: ForwardedRef<HTMLInputElement>) => {
    return(
        <div className='flex items-stretch  w-full'>
            <label 
                htmlFor={id} 
                className={`
                    flex flex-col p-4 gap-2 items-center justify-center w-full border-2 border-dashed bg-gray-100 border-gray-300 rounded-md
                    ${labelClassName}
                `}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>

                <p className='text-md'>Click to upload or drag and drop</p>
                <p className='text-sm'>JPG, JPEG, BMP or PNG</p>

                <input multiple type="file" id={id}  className="hidden" onChange={(e) => console.log('input mudou ', e.target.value) }  {...rest} ref={ref}/>
            </label>
        </div>
    )
})