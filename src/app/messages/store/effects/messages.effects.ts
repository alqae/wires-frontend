import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromActions from '../actions/messages.actions';
import * as fromServicesShared from '@shared/services';
import * as fromStoreShared from '@shared/store';
import * as fromServices from '../../services';

@Injectable()
export class MessagesEffects {
  filterMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.filterMessages),
      exhaustMap(({ search, date, user }) =>
        this._service.filterMessages({ search, date, user }).pipe(
          map((filteredMessages) => fromActions.filterMessagesSuccess({ filteredMessages })),
          catchError((message) => of(fromActions.filterMessagesFailure({ message })))
        )
      )
    )
  });

  getAllMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.loadAllMessages),
      exhaustMap(() =>
        this._service.getAllMessages().pipe(
          map((allMessages) => fromActions.loadAllMessagesSuccess({ allMessages })),
          catchError((message) => of(fromActions.loadAllMessagesFailure({ message })))
        )
      )
    )
  });

  getMyMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.loadMyMessages),
      exhaustMap(() =>
        this._service.getMyMessages().pipe(
          map((myMessages) => fromActions.loadMyMessagesSuccess({ myMessages })),
          catchError((message) => of(fromActions.loadMyMessagesFailure({ message })))
        )
      )
    )
  });

  createMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.createMessage),
      exhaustMap(({ title, text }) =>
        this._service.crateMessage({ title, text }).pipe(
          map(() => fromActions.loadMyMessages()),
          catchError((error) => of(fromActions.createMessageFailure(error)))
        )
      )
    )
  });

  commentMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.commentMessage),
      exhaustMap((commentToCreate) =>
        this._service.commentMessage(commentToCreate).pipe(
          map(() => fromActions.loadAllMessages()),
          catchError((error) => of(fromActions.createMessageFailure(error)))
        )
      )
    )
  });

  constructor(
    private actions$: Actions,
    private _service: fromServices.MessagesService,
  ) {}
}
