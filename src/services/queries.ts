import { gql } from '@apollo/client'

export const POST_LIKES = gql`
  query GetPostLikes($id: ID!) {
    post(id: $id) {
      likes {
        user {
          id
          name
          avatar
          profile_name
        }
      }
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $text: String!) {
    comment(postId: $postId, text: $text) {
      id
      text
      author {
        id
        name
        avatar
        profile_name
      }
    }
  }
`

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    notifications {
      id
      timestamp
      read
      follower {
        id
        name
        avatar
        profile_name
      }
    }
  }
`

export const MARK_ALL_NOTIFICATIONS_AS_READ = gql`
  mutation MarkAllNotificationsAsRead {
    readAllNotifications {
      id
    }
  }
`

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      caption
      medias {
        id
        media_url
        position
      }
      author {
        id
        name
        profile_name
        avatar
      }
      liked
      likesCount
      commentsCount
      comments {
        id
        text
        author {
          id
          name
          profile_name
          avatar
        }
      }
    }
  }
`

export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export const POST_COMMENTS = gql`
  query GetPostComments($postId: ID!) {
    comments(postId: $postId) {
      id
      text
      author {
        id
        name
        avatar
        profile_name
      }
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation ($commentId: ID!) {
    deleteComment(commentId: $commentId)
  }
`

export const LIKE_POST = gql`
  mutation ($postId: ID!) {
    likePost(postId: $postId) {
      id
    }
  }
`

export const REMOVE_LIKE = gql`
  mutation ($postId: ID!) {
    unlikePost(postId: $postId) {
      id
    }
  }
`

export const GET_LOGGED_USER_INFO = gql`
  query GetLoggedUserInfo {
    profile {
      id
      name
      email
      profile_name
      avatar
      createdAt
      updatedAt
    }
  }
`

export const FOLLOW_USER = gql`
  mutation ($profile_name: String!) {
    follow(profile_name: $profile_name)
  }
`

export const UNFOLLOW_USER = gql`
  mutation ($profile_name: String!) {
    unfollow(profile_name: $profile_name)
  }
`

export const GET_USER_PROFILE = gql`
  query GetUserProfile($profile_name: String!) {
    profile(profile_name: $profile_name) {
      id
      avatar
      name
      profile_name
      posts {
        id
        caption
        medias {
          id
          media_url
          position
        }
      }
      followsCount
      followersCount
      followed
    }
  }
`

export const SEARCH_USER = gql`
  query SearchUser($search: String!) {
    searchUser(search: $search) {
      id
      name
      profile_name
      avatar
    }
  }
`

export const EDIT_PROFILE = gql`
  mutation ($name: String, $profile_name: String) {
    editProfile(name: $name, profile_name: $profile_name) {
      id
      name
      email
      profile_name
      avatar
      createdAt
      updatedAt
    }
  }
`

export const EDIT_PASSWORD = gql`
  mutation ($currentPassword: String!, $password: String!) {
    editPassword(currentPassword: $currentPassword, password: $password) {
      id
      name
      email
      profile_name
    }
  }
`

export const GET_TIMELINE = gql`
  query GetTimeline {
    timeline {
      id
      caption
      commentsCount
      likesCount
      liked
      medias {
        id
        media_url
        position
      }

      author {
        avatar
        name
        profile_name
      }
    }
  }
`
