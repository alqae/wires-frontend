import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as RouterActions from '@shared/store/actions/router.actions';

@Injectable()
export class RouterEffects {
  navigate$ = createEffect(() => this.actions$.pipe(
    ofType(RouterActions.GO),
    map((action: RouterActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras}) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  ), { dispatch: false });

  navigateForward$ = createEffect(() => this.actions$.pipe(
    ofType(RouterActions.FORWARD),
    map((action: RouterActions.Forward) => action),
    tap(() => this.location.forward())
  ), { dispatch: false });

  navigateBack$ = createEffect(() => this.actions$.pipe(
    ofType(RouterActions.BACK),
    map((action: RouterActions.Back) => action),
    tap(() => this.location.forward())
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
  ) { }
}
