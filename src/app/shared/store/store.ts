import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { RouterStateUrl } from './reducers/router.reducer';

export interface SharedState {
  routerReducer?: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const SharedReducers: ActionReducerMap<SharedState> = {
 routerReducer: fromRouter.routerReducer,
};
