import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromActions from '../actions/auth.actions';

export const AuthReducer = createReducer(
  fromStore.initialState,
  on(fromActions.logOut, (state) => ({
    ...state,
    token: '',
    user: undefined,
  })),
  on(fromActions.logIn, (state, payload) => ({
    ...state,
    token: payload.token,
    user: payload.user,
  })),
);

const exportLoading = (state: fromStore.AuthState) => state.isLoading;
const exportError = (state: fromStore.AuthState) => state.error;
const exportUserLogged = (state: fromStore.AuthState) => state.user;
const exportLoggedIn = (state: fromStore.AuthState) => !!state.token;
const exportToken = (state: fromStore.AuthState) => state.token;
const selectAuthState = createFeatureSelector<fromStore.AuthState>('auth');

export const getLoading = createSelector(selectAuthState, exportLoading);
export const getError = createSelector(selectAuthState, exportError);
export const getLoggedIn = createSelector(selectAuthState, exportLoggedIn);
export const getUserLogged = createSelector(selectAuthState, exportUserLogged);
export const getToken = createSelector(selectAuthState, exportToken);
