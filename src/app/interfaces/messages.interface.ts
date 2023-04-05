import * as fromModels from '../models';

export interface CreateMessageInput {
  title: string;
  text: string;
}

export interface CreateMessageResponse extends fromModels.Message {}

export interface FilterMessagesInput {
  search?: string;
  date?: Date;
  user?: string;
}

export interface CommentMessageInput {
  comment: string;
  messageId: string;
}
