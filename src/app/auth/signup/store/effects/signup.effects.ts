import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { of, pipe } from 'rxjs';

import * as fromActions from '../actions/signup.actions';
import * as fromServicesShared from '@shared/services';
import * as fromStoreShared from '@shared/store';
import * as fromServices from '../../services';
import { Store } from '@ngrx/store';

@Injectable()
export class SignUpEffects {
  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.signUp),
      exhaustMap(({ email, fullname, password, username }) =>
        this._service.signUp({ email, fullname, password, username }).pipe(
          map((response) => fromActions.signUpSuccess(response)),
          catchError((message) => of(fromActions.signUpFail({ message })))
        )
      )
    )
  });

  signUpSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.signUpSuccess),
      pipe(tap(() => this._store.dispatch(new fromStoreShared.Go({ path: ['/auth/signin'] }))))
    )
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private _service: fromServices.SignUpService,
    private _utils: fromServicesShared.UtilsService,
    private _store: Store<fromStoreShared.SharedState>
  ) {}
}
