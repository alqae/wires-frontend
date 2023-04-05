import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromActions from '../actions/messages.actions';

export const MessagesReducer = createReducer(
  fromStore.initialState,
  // Load all messages
  on(fromActions.loadAllMessages, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(fromActions.loadAllMessagesSuccess, (state, { allMessages }) => ({
    ...state,
    allMessages,
    isLoading: false,
  })),
  on(fromActions.loadAllMessagesFailure, (state, { message: error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  // Load my messages
  on(fromActions.loadMyMessages, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(fromActions.loadMyMessagesSuccess, (state, { myMessages }) => ({
    ...state,
    myMessages,
    isLoading: false,
  })),
  on(fromActions.loadMyMessagesFailure, (state, { message: error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  // Create message
  on(fromActions.createMessage, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(fromActions.createMessageSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(fromActions.createMessageFailure, (state, { message: error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  // Filter messages
  on(fromActions.filterMessages, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(fromActions.filterMessagesSuccess, (state, { filteredMessages }) => ({
    ...state,
    allMessages: filteredMessages,
    myMessages: filteredMessages,
    isLoading: false,
  })),
  on(fromActions.filterMessagesFailure, (state, { message: error }) => ({
    ...state,
    error,
    isLoading: false,
    allMessages: [],
    myMessages: [],
  })),
  // Comment message
  on(fromActions.commentMessage, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(fromActions.commentMessageSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
);

const exportLoading = (state: fromStore.MessagesState) => state.isLoading;
const exportError = (state: fromStore.MessagesState) => state.error;
const exportAllMessages = (state: fromStore.MessagesState) => state.allMessages;
const exportMyMessages = (state: fromStore.MessagesState) => state.myMessages;
const selectMessagesState = createFeatureSelector<fromStore.MessagesState>('messages');

export const getLoading = createSelector(selectMessagesState, exportLoading);
export const getError = createSelector(selectMessagesState, exportError);
export const getAllMessages = createSelector(selectMessagesState, exportAllMessages);
export const getMyMessages = createSelector(selectMessagesState, exportMyMessages);
