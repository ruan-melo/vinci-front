
interface AccessProps {
    children: React.ReactNode;
}

export const Access = ({children} : AccessProps) => {
    return (
        <main className="md:grid  md:grid-cols-[1.2fr_2fr] md:grid-rows-1  h-full">
            <section className = "bg-white pt-10 md:pt-20 md:min-w-[350px] h-full px-4">
                {children}
                <div className='mt-4 md:hidden '>
                    <p className = 'text-center text-sm md:text-md  text-gray-600'>Share the best moments with your friends and <span className = 'font-bold'>just them</span></p>
                </div>
            </section>
            <section className="hidden md:flex bg-green-800  flex-col gap-3 align-center pt-20 p-4 ">
                <img className = "box mx-auto " src={'/undraw_social_interaction_re_dyjh.svg'}/>
                <p className = 'text-center text-lg text-white'>Share the best moments with your friends and <span className = 'font-bold'>just them</span></p>
            </section>

           
        </main>
    )
}