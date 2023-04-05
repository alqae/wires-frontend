import { User } from "./user.model"

export interface Comment {
  user: string | User
  comment: string
}