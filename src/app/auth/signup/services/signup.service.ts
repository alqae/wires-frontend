import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as fromServicesShared from '@shared/services';
import * as fromInterfaces from '@app/interfaces';

@Injectable()
export class SignUpService {
  constructor(
    private _http: HttpClient,
    private _utils: fromServicesShared.UtilsService
  ) { }

  signUp(userToRegister: fromInterfaces.SignUpInput) {
    return this._http.post<fromInterfaces.SignUpResponse>(`/auth/signup`, userToRegister)
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }
}
