import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedStoreModule } from './store';

import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import * as fromInterceptors from './interceptors';

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    RouterModule,
    SharedStoreModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: fromInterceptors.JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: fromInterceptors.LoggingHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: fromInterceptors.APIInterceptor, multi: true },
    ...fromServices.services,
    ...fromGuards.guards,
  ]
})
export class SharedModule { }
