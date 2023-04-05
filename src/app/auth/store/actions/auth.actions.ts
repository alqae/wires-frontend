import { createAction, props } from '@ngrx/store';

import * as fromModels from '@app/models';

export const logIn = createAction( '[Shared] Log In', props<{ user: fromModels.User, token: string }>());
export const logOut = createAction('[Shared] Clear Token');
