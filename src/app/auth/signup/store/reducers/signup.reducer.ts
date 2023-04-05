import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromActions from '../actions/signup.actions';

export const SignUpReducer = createReducer(
  fromStore.initialState,
  on(fromActions.signUp, (state) => ({
    ...state,
  })),
  on(fromActions.signUpSuccess, (state) => ({
    ...state,
    authenticationMessage: null,
  })),
  on(fromActions.signUpFail, (state, { message }) => ({
    ...state,
    authenticationMessage: message,
  }))
);

const exportLoading = (state: fromStore.SignUpState) => state.isLoading;
const exportError = (state: fromStore.SignUpState) => state.error;
const selectSignUpState = createFeatureSelector<fromStore.SignUpState>('signUp');

export const getLoading = createSelector(selectSignUpState, exportLoading);
export const getError = createSelector(selectSignUpState, exportError);
