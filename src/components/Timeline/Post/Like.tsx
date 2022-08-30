import Image from "next/image"
import { Button } from "../../Button"

export const Like = () => {
    return(
        <div className='flex gap-2 items-center'>
            <div>
                <div className='w-8 h-8 rounded-full overflow-hidden'>
                    <Image src='/eu.png' width={'100px'} height={'100px'} objectFit='cover' alt={"Foto de perfil"}/>
                </div>0
            </div>
            
            <div className='flex flex-col gap-2 text-sm sm:text-md'>
                <div className='flex flex-col '>
                    Ruan Tenório de Melo
                    <span className='text-xs w-full text-left'>@ruantmelo</span>
                </div>
            </div>
            
            <Button className='p-2 mt-0 ml-auto text-xs sm:text-sm'>
                Follow
            </Button>
            
        </div>
    )
}