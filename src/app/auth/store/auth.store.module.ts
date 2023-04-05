import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import * as fromReducers from './reducers/auth.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('auth', fromReducers.AuthReducer),
  ],
  providers: []
})
export class AuthStoreModule { }
