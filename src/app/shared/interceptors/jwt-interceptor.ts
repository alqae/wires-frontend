import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
} from '@angular/common/http';

import * as fromServicesSignin from '@signin/services';
import * as fromStoreAuth from '@auth/store';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private token$: Observable<any>;
  private _token: string = '';

  /**
   * Método ejecutado con cada petición Http
   * @param req HttpRequest
   * @param next HttpHandler
   * @return Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>>
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<
    HttpSentEvent |
    HttpHeaderResponse |
    HttpProgressEvent |
    HttpResponse<any> |
    HttpUserEvent<any>
  > {
    // build the headers you want
    let headers: any = {
      'Content-Type': 'application/json',
    };

    if (!req.url.includes('login')  && this._token) {
      const prefix = 'Bearer ';
      headers['Authorization'] = prefix + this._token;
    }

    // clone the request
    const clone = req.clone({ setHeaders: headers });

    // pass it to the next interceptor
    return next.handle(clone);
  }

  constructor(
    private _storeAuth: Store<fromStoreAuth.AuthState>,
    private _serviceSignIn: fromServicesSignin.SignInService,
  ) {
    this.token$ = this._storeAuth.pipe(select(fromStoreAuth.getToken));
    this.token$.subscribe(() => {
      this._token = this._serviceSignIn.getToken();
    });
  }
}
