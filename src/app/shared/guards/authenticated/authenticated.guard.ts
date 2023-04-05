import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as fromStoreAuth from '@auth/store';
import * as fromStoreShared from '../../store';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private _storeShared: Store<fromStoreShared.SharedState>,
    private _storeAuth: Store<fromStoreAuth.AuthState>
  ) { }

  canActivate(): Observable<boolean> {
    return this._storeAuth.pipe(
      select(fromStoreAuth.getLoggedIn),
      map((loggedIn) => {
        if (!loggedIn) {
          this._storeShared.dispatch(new fromStoreShared.Go({
            path: ['/auth/signin']
          }));

          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}

@Injectable()
export class LoggedOutGuard implements CanActivate {
  constructor(
    private _storeShared: Store<fromStoreShared.SharedState>,
    private _storeAuth: Store<fromStoreAuth.AuthState>
  ) { }

  canActivate(): Observable<boolean> {
    return this._storeAuth.pipe(
      select(fromStoreAuth.getLoggedIn),
      map(loggedIn => {
        if (loggedIn) {
          this._storeShared.dispatch(new fromStoreShared.Go({
            path: ['/messages']
          }));
          
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
