import Image from "next/image";

export const Comment = () => {
    return (
        <div className='flex gap-2'>
            <div>
                <div className='w-8 h-8 rounded-full overflow-hidden'>
                    <Image src='/eu.png' width={'100px'} height={'100px'} objectFit='cover' alt={"Foto de perfil"}/>
                </div>
            </div>
            
            <div className='flex flex-col gap-2 text-sm'>
                
                <p>
                    <span className=' font-bold mr-2'>ruantmelo</span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec euismod, nisi vel consectetur interdum, nisi nisi
                    fermentum nisi, eget consectetur nisi nisi vel nisi.
                </p>
            </div>
        </div>
    );
}