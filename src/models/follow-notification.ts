import { User } from './user'

export class FollowNotification {
  id?: string

  timestamp?: string

  read?: boolean

  follower?: User
}
