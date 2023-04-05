import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromActions from '../actions/signin.actions';

export const SignInReducer = createReducer(
  fromStore.initialState,
  on(fromActions.signIn, (state) => ({
    ...state,
  })),
  on(fromActions.signInSuccess, (state) => ({
    ...state,
    authenticationMessage: null,
  })),
  on(fromActions.signInFail, (state, { message }) => ({
    ...state,
    authenticationMessage: message,
  }))
);

const exportLoading = (state: fromStore.SignInState) => state.isLoading;
const exportError = (state: fromStore.SignInState) => state.error;
const selectSignInState = createFeatureSelector<fromStore.SignInState>('signIn');

export const getLoading = createSelector(selectSignInState, exportLoading);
export const getError = createSelector(selectSignInState, exportError);
