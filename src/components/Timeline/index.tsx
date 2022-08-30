import { Post, PostProps } from "./Post"
 

const posts: PostProps[] = [
    {
        title: "#Cria",
        date: "2020-01-01",
        image: "/eu.png",
        liked: true,

    },
    {
        title: "#Cria",
        date: "2020-01-01",
        image: "/eu.png",
        liked: false,

    }

]

export const Timeline = () => {
    return(
        <div className= 'flex flex-col gap-4 md:bg-white mx-auto w-full max-w-[450px] sm:mt-4 shadow-md'>
            {posts.map((post, index) => (
                <Post key={post.title + index} {...post} />
            ))}  
        </div>
        
    )
}