import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import * as fromModels from '@app/models';
import * as fromStoreAuth from '@auth/store';
import * as fromInterfaces from '@app/interfaces';

@Component({
  selector: 'w-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyMessagesComponent implements OnInit {
  @Input() showFilters: boolean = true;

  public filterMessagesForm: FormGroup;
  public messages$: Observable<fromModels.Message[] | undefined>;
  public isLoading$: Observable<boolean>;
  
  private userLogged$: Observable<fromModels.User | undefined>;
  private userLogged!: fromModels.User;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<fromStore.MessagesState>,
    private _storeAuth: Store<fromStoreAuth.AuthState>,
  ) {
    this.isLoading$ = this._store.select(fromStore.getLoading);
    this.userLogged$ = this._storeAuth.select(fromStoreAuth.getUserLogged);
    this.userLogged$.subscribe((user) => {
      if (user) {
        this.userLogged = user;
      }
    });
    this.messages$ = this._store.select(fromStore.getMyMessages);
    this.filterMessagesForm = this._formBuilder.group({
      date: ['']
    });
    this.filterMessagesForm.valueChanges.subscribe((value) => {
      const payload: fromInterfaces.FilterMessagesInput = {
        user: this.userLogged.id,
      };

      if (!value.date) return this.fetchMessages();
      if (value.date) payload.date = value.date;
      this._store.dispatch(fromStore.filterMessages(payload));
    });
  }

  ngOnInit() {
    this.fetchMessages();
  }

  fetchMessages() {
    this._store.dispatch(fromStore.loadMyMessages());
  }

  onSubmit() {
    if (this.filterMessagesForm.valid && this.filterMessagesForm.dirty) {
      this._store.dispatch(fromStore.filterMessages(this.filterMessagesForm.value));
    }
  }
}
