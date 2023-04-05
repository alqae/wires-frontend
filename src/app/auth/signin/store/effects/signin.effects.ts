import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of, pipe } from 'rxjs';

import * as fromActions from '../actions/signin.actions';
import * as fromStoreShared from '@shared/store';
import * as fromServices from '../../services';
import * as fromStoreAuth from '@auth/store';

@Injectable()
export class SignInEffects {
  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.signIn),
      exhaustMap(({ username, password }) =>
        this._service.signIn({ username, password }).pipe(
          map((response) => fromActions.signInSuccess(response)),
          catchError((error) => of(fromActions.signInFail(error)))
        )
      )
    )
  });

  signInSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.signInSuccess),
      exhaustMap(({ access_token }) => {
        return this._service.getProfile(access_token).pipe(
          map((user) => {
            this._storeAuth.dispatch(fromStoreAuth.logIn({ user, token: access_token  }));
            this._storeShared.dispatch(new fromStoreShared.Go({ path: ['/'] }));
          }),
          catchError((error) => of(fromActions.signInFail(error)))
        )
      }),
    )
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private _service: fromServices.SignInService,
    private _storeAuth: Store<fromStoreAuth.AuthState>,
    private _storeShared: Store<fromStoreAuth.AuthState>
  ) {}
}
