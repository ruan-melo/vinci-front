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

export type PostWithMediaAndComments = PostWithMedia & {comments: Comment[]}



export type PostTimeline =  PostWithMediaAndAuthor & {comments_count: number, liked: boolean, likes_count: number};

export interface UserWithPosts extends User {
    posts: Post[];
}


export type Comment = {
    id: string
    postId: string
    authorId: string
    text: string
}

export type CommentWithAuthor = Comment & {author: User};



export type Reaction = {
    postId: string
    userId: string
}

export type ReactionWithUser = Reaction & {user: User}; 
