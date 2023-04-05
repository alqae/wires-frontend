import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Injectable } from '@angular/core';

import * as fromServicesShared from '@shared/services';
import * as fromInterfaces from '@app/interfaces';
import * as fromModels from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private _http: HttpClient,
    private _utils: fromServicesShared.UtilsService,
  ) { }

  filterMessages(query: fromInterfaces.FilterMessagesInput): Observable<fromModels.Message[]> {
    return this._http.post<fromModels.Message[]>('/messages/find', query)
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }

  getAllMessages(): Observable<fromModels.Message[]> {
    return this._http.get<fromModels.Message[]>('/messages')
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }

  getMyMessages(): Observable<fromModels.Message[]> {
    return this._http.get<fromModels.Message[]>('/messages/me')
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }

  getMessage(id: string): Observable<fromModels.Message> {
    return this._http.get<fromModels.Message>(`/messages/${id}`)
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }

  crateMessage(message: fromInterfaces.CreateMessageInput) {
    return this._http.post<fromInterfaces.CreateMessageResponse>('/messages', message)
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }

  commentMessage({ comment, messageId }: fromInterfaces.CommentMessageInput) {
    return this._http.patch<fromModels.Message>(`/messages/comment/${messageId}`, { comment })
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }
}
