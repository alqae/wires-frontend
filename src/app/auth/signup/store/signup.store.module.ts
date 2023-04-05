import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromReducers from './reducers/signup.reducer';
import * as fromEffects from './effects/signup.effects';
import * as fromServices from '../services';

@NgModule({
  imports: [
    StoreModule.forFeature('signUp', fromReducers.SignUpReducer),
    EffectsModule.forFeature([fromEffects.SignUpEffects]),
  ],
  providers: [...fromServices.services]
})
export class SignUpStoreModule { }
