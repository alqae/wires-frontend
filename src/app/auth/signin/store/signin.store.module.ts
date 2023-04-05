import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromReducers from './reducers/signin.reducer';
import * as fromEffects from './effects/signin.effects';
import * as fromServices from '../services';

@NgModule({
  imports: [
    StoreModule.forFeature('signin', fromReducers.SignInReducer),
    EffectsModule.forFeature([fromEffects.SignInEffects]),
  ],
  providers: [...fromServices.services]
})
export class SignInStoreModule { }
