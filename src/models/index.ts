import { User } from "../contexts/AuthContext"

interface Media {
    id: string
    postId: string
    position: number
    media_url: string
    createdAt: string
    updatedAt: string
}

export interface Post {
    id: string
    authorId: string
    caption: string
    createdAt: string
    updatedAt: string
}

export type PostWithMedia = Post & {medias: Media[]};

export type PostWithMediaAndAuthor = PostWithMedia & {author: User};

export interface UserWithPosts extends User {
    posts: Post[];
}

