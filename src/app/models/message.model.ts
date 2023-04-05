import { User } from './user.model';
import { Comment } from './comment.model';

export interface Message {
  id: string
  title: string
  text: string
  user?: User
  comments?: Comment[]
  createdAt: string
  updatedAt: string
}

