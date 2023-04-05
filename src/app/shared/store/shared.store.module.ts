import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { localStorageSync } from 'ngrx-store-localstorage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { CustomRouterStateSerializer } from './reducers/router.reducer';
import { RouterEffects } from './effects/router.effects';
import { environment } from '@environments/environment';
import { SharedState, SharedReducers } from './store';

import * as fromStoreMessages from '@messages/store';
import * as fromStoreSingUp from '@signup/store';
import * as fromStoreSingIn from '@signin/store';
import * as fromStoreAuth from '@auth/store';

export const StoreEffects = [
  RouterEffects,
];

export function logger(reducer: ActionReducer<SharedState>): ActionReducer<SharedState> {
  return storeLogger()(reducer);
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [
    'auth',
  ], rehydrate: true, storage: sessionStorage })(reducer);
}

export function clearState(reducer: any) {
  return function (state: any, action: any) {
    // if (action.type === fromStoreLogin.ActionTypes.Logout) {
    //   state = undefined;
    // }

    return reducer(state, action);
  };
}

const metaReducers: MetaReducer<SharedState>[] =
  !environment.production
  ? [logger, storeFreeze, localStorageSyncReducer]
  : [localStorageSyncReducer];

metaReducers.push(clearState);

@NgModule({
  imports: [
    CommonModule,
    environment.production ? [] : StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(SharedReducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'wires',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot(StoreEffects),
    fromStoreSingUp.SignUpStoreModule,
    fromStoreSingIn.SignInStoreModule,
    fromStoreAuth.AuthStoreModule,
    fromStoreMessages.MessagesStoreModule,
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
})
export class SharedStoreModule { }
