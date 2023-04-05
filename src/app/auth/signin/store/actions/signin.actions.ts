import { createAction, props } from '@ngrx/store';

import * as fromInterfaces from '@app/interfaces';

export const signIn = createAction(
  '[SignIn] log user Action',
  props<{
    fullname: string;
    username: string;
    password: string;
    email: string;
  }>()
);

export const signInSuccess = createAction(
  '[SignIn] log user Success Action',
  props<fromInterfaces.SignInResponse>()
);

export const signInFail = createAction(
  '[SignIn] log user Fail Action',
  props<{ message: string }>()
);
