import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as fromReducerAuth from '@auth/store/reducers/auth.reducer';
import * as fromServicesShared from '@shared/services';
import * as fromInterfaces from '@app/interfaces';
import * as fromStoreAuth from '@auth/store';
import * as fromModels from '@app/models';

@Injectable()
export class SignInService {
  private token$: Observable<string | undefined>;
  private _token: string = '';

  constructor(
    private _http: HttpClient,
    private _utils: fromServicesShared.UtilsService,
    private _storeAuth: Store<fromStoreAuth.AuthState>,
    ) {
    this.token$ = this._storeAuth.pipe(select(fromReducerAuth.getToken));
    this.token$.subscribe((token) => {
      if (typeof token !== 'undefined') {
        this._token = token;
      }
    });
  }

  signIn(userToLogin: fromInterfaces.SignInInput) {
    return this._http.post<fromInterfaces.SignInResponse>('/auth/signin', userToLogin)
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }

  getProfile(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._http.get<fromModels.User>('/users/profile',  { headers })
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }

  getToken() {
    return this._token;
  }
}
