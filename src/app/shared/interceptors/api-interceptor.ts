import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  private _url: string;

  constructor() {
    this._url = environment.apiUrl;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = this._url;
    const urlFragment = req.url.split('/');

    if (urlFragment[1] === 'assets') {
      url = req.url;
    } else {
      url = url.concat(urlFragment.splice(urlFragment[0] == '' ? 1 : 0).join('/')); // to prevent double slash
    }
    console.log('url', url);
    const apiReq = req.clone({ url });
    return next.handle(apiReq);
  }
}