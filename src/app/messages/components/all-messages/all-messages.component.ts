import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromInterfaces from '@app/interfaces';
import * as fromModels from '@app/models';
import * as fromStore from '../../store';

@Component({
  selector: 'w-all-messages',
  templateUrl: './all-messages.component.html',
  styleUrls: ['./all-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllMessagesComponent implements OnInit {
  public filterMessagesForm: FormGroup;
  public messages$: Observable<fromModels.Message[] | undefined>;
  public isLoading$: Observable<boolean>;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<fromStore.MessagesState>,
  ) {
    this.isLoading$ = this._store.select(fromStore.getLoading);
    this.messages$ = this._store.select(fromStore.getAllMessages);
    this.filterMessagesForm = this._formBuilder.group({
      search: [''],
      date: [''],
    });

    this.filterMessagesForm.valueChanges.subscribe((value) => {
      const payload: fromInterfaces.FilterMessagesInput = {};
      if (!value.search && !value.date) return this.fetchMessages();
      if (value.search) payload.search = value.search;
      if (value.date) payload.date = value.date;
      this._store.dispatch(fromStore.filterMessages(payload));
    });
  }

  ngOnInit() {
    this.fetchMessages();
  }

  fetchMessages() {
    this._store.dispatch(fromStore.loadAllMessages());
  }

  onSubmit() {
    if (this.filterMessagesForm.valid && this.filterMessagesForm.dirty) {
      this._store.dispatch(fromStore.filterMessages(this.filterMessagesForm.value));
    }
  }
}
