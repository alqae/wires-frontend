import { createAction, props } from '@ngrx/store';

import * as fromInterfaces from '@app/interfaces';
import * as fromModels from '@app/models';

export const filterMessages = createAction(
  '[Messages] filter messages',
  props<fromInterfaces.FilterMessagesInput>()
);

export const filterMessagesSuccess = createAction(
  '[Messages] filter messages success',
  props<{ filteredMessages: fromModels.Message[] }>()
);

export const filterMessagesFailure = createAction(
  '[Messages] filter messages failure',
  props<{ message: string }>()
);

export const loadAllMessages = createAction(
  '[Messages] load all messages'
);

export const loadAllMessagesSuccess = createAction(
  '[Messages] load all messages success',
  props<{ allMessages: fromModels.Message[] }>()
);

export const loadAllMessagesFailure = createAction(
  '[Messages] load all messages failure',
  props<{ message: string }>()
);

export const loadMyMessages = createAction(
  '[Messages] load my messages'
);

export const loadMyMessagesSuccess = createAction(
  '[Messages] load my messages success',
  props<{ myMessages: fromModels.Message[] }>()
);

export const loadMyMessagesFailure = createAction(
  '[Messages] load my messages failure',
  props<{ message: string }>()
);

export const createMessage = createAction(
  '[Messages] create message',
  props<fromInterfaces.CreateMessageInput>()
);

export const createMessageSuccess = createAction(
  '[Messages] create message success',
  props<fromInterfaces.CreateMessageResponse>()
);

export const createMessageFailure = createAction(
  '[Messages] create message failure',
  props<{ message: string }>()
);

export const commentMessage = createAction(
  '[Messages] comment message',
  props<fromInterfaces.CommentMessageInput>()
);

export const commentMessageSuccess = createAction(
  '[Messages] comment message success',
  props<fromModels.Message>()
);
