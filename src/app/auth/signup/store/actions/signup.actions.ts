import { createAction, props } from '@ngrx/store';

import * as fromInterfaces from '@app/interfaces';

export const signUp = createAction(
  '[SignUp] register user Action',
  props<{
    fullname: string;
    username: string;
    password: string;
    email: string;
  }>()
);

export const signUpSuccess = createAction(
  '[SignUp] register user Success Action',
  props<fromInterfaces.SignUpResponse>()
);

export const signUpFail = createAction(
  '[SignUp] register user Fail Action',
  props<{ message: string }>()
);
