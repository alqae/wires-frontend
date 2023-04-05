import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromReducers from './reducers/messages.reducer';
import * as fromEffects from './effects/messages.effects';
import * as fromServices from '../services';

@NgModule({
  imports: [
    StoreModule.forFeature('messages', fromReducers.MessagesReducer),
    EffectsModule.forFeature([fromEffects.MessagesEffects]),
  ],
  providers: [...fromServices.services]
})
export class MessagesStoreModule { }
